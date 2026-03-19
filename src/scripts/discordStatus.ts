// Discord Lanyard API Integration
const DISCORD_USER_ID = '743643333447909449';

const STATUS_COLORS = {
  online: '#22c55e',   // verde
  idle: '#eab308',     // amarillo
  dnd: '#ef4444',      // rojo
  offline: '#6b7280'   // gris
};

const STATUS_TEXTS = {
  online: 'Conectado',
  idle: 'Ausente',
  dnd: 'No molestar',
  offline: 'Desconectado'
};

// Fetch Discord presence from Lanyard API
async function fetchDiscordPresence() {
  try {
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Discord presence:', error);
    return null;
  }
}

// Get current activity text
function getCurrentActivity(data: any) {
  if (data.data.listening_to_spotify && data.data.spotify) {
    return `🎵 ${data.data.spotify.song} - ${data.data.spotify.artist}`;
  }
  
  if (data.data.activities && data.data.activities.length > 0) {
    const activity = data.data.activities[0];
    if (activity.name === 'Custom Status' && activity.state) {
      return activity.state;
    }
    return activity.name;
  }
  
  return 'Sin actividad';
}

// Update Discord status display
function updateDiscordStatus(data: any) {
  const statusText = document.getElementById("discord-status-text");
  const discordCard = document.querySelector('[data-discord-card]') as HTMLElement;
  
  if (data && data.success) {
    const status = data.data.discord_status as keyof typeof STATUS_COLORS;
    
    if (statusText) statusText.textContent = STATUS_TEXTS[status];
    
    if (discordCard) {
      discordCard.classList.remove('bg-green-600', 'bg-yellow-600', 'bg-red-600', 'bg-gray-600');
      
      switch (status) {
        case 'online':
          discordCard.classList.add('bg-green-600');
          break;
        case 'idle':
          discordCard.classList.add('bg-yellow-600');
          break;
        case 'dnd':
          discordCard.classList.add('bg-red-600');
          break;
        case 'offline':
          discordCard.classList.add('bg-gray-600');
          break;
      }
    }
  } else {
    if (statusText) statusText.textContent = STATUS_TEXTS.offline;
    if (discordCard) {
      discordCard.classList.remove('bg-green-600', 'bg-yellow-600', 'bg-red-600', 'bg-gray-600');
      discordCard.classList.add('bg-gray-600');
    }
  }
}

export async function initDiscordStatus() {
  const data = await fetchDiscordPresence();
  updateDiscordStatus(data);
  
  setInterval(async () => {
    const data = await fetchDiscordPresence();
    updateDiscordStatus(data);
  }, 30000);
} 