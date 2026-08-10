

export function getAgeInYears(dateString: string): Promise<string> {
  const targetDate = new Date(dateString);
  const currentDate = new Date();

  // Validate the input date string
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
  }

  let years = currentDate.getFullYear() - targetDate.getFullYear();
  const monthDiff = currentDate.getMonth() - targetDate.getMonth();

  // Adjust years if the target month/day hasn't occurred yet in the current year
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < targetDate.getDate())
  ) {
    years--;
  }

  return `${years} yrs`;
}