export const calculateDuration = (start, end, isCurrent) => {
  const startDate = new Date(start);
  const endDate = isCurrent ? new Date() : new Date(end);
  
  // Validate dates
  if (isNaN(startDate.getTime())) return '0 months';
  if (!isCurrent && isNaN(endDate.getTime())) return '0 months';
  
  // Calculate total days first for more accurate calculation
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // Handle negative duration (future start date)
  if (daysDiff < 0) {
    return '0 days';
  }
  
  // If less than 1 day, show 1 day
  if (daysDiff < 1) {
    return '1 day';
  }
  
  // If less than 30 days, show in days
  if (daysDiff < 30) {
    return `${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
  }
  
  // Calculate months - simpler and more accurate method
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthDiff = endDate.getMonth() - startDate.getMonth();
  const dayDiff = endDate.getDate() - startDate.getDate();
  
  // Total months calculation
  let totalMonths = yearDiff * 12 + monthDiff;
  
  // If we haven't reached the start day yet in the current month, don't count this month
  // If we have passed the start day, count the full month
  if (dayDiff >= 0) {
    totalMonths += 1;
  }
  
  // Ensure minimum of 1 month if there's any duration >= 30 days
  if (totalMonths < 1 && daysDiff >= 30) {
    totalMonths = 1;
  }
  
  // If less than 12 months, show in months
  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
  }
  
  // Show in years and months
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  
  let duration = `${years} year${years !== 1 ? 's' : ''}`;
  if (remainingMonths > 0) {
    duration += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  return duration;
};

export const formatDate = (dateString) => {
  // Handle empty or invalid date - return empty string for current positions
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return '';
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });
};

export const getTotalExperience = (experiences) => {
  if (experiences.length === 0) return "0 months";
  
  let totalDays = 0;
  
  experiences.forEach(exp => {
    // If only month and year are provided, default to the 1st of that month
    const startDate = new Date(exp.startDate);
    // Set to 1st if the date seems to be only year-month
    if (startDate.getDate() !== 1 && (!exp.startDate.includes('-') || exp.startDate.split('-').length === 2)) {
      startDate.setDate(1);
    }
    
    const endDate = exp.current ? new Date() : new Date(exp.endDate);
    // Set to 1st if the date seems to be only year-month
    if (!exp.current && endDate.getDate() !== 1 && (!exp.endDate.includes('-') || exp.endDate.split('-').length === 2)) {
      endDate.setDate(1);
    }
    
    // Skip invalid dates
    if (isNaN(startDate.getTime())) return;
    if (!exp.current && isNaN(endDate.getTime())) return;
    
    // Calculate total days for this experience
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff > 0) {
      totalDays += daysDiff;
    }
  });

  if (totalDays === 0) return "0 days";
  
  // If less than 30 days, show in days only
  if (totalDays < 30) {
    return `${totalDays} day${totalDays !== 1 ? 's' : ''}`;
  }
  
  // Calculate years, months, and remaining days
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;
  
  let duration = '';
  
  if (years > 0) {
    duration += `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  if (months > 0) {
    if (duration) duration += ' ';
    duration += `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  if (days > 0) {
    if (duration) duration += ' ';
    duration += `${days} day${days !== 1 ? 's' : ''}`;
  }
  
  return duration || "0 days";
};