// Utility functions

// Calculate age automatically
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Initialize age display
export function initAgeDisplay() {
  const ageValue = document.getElementById('age-value');
  if (ageValue) {
    const birthDate = new Date(2005, 1, 26); // Mes 1 = Febrero (0-indexed)
    ageValue.textContent = calculateAge(birthDate).toString();
  }
} 