export const calculateDuration = (start, end, isCurrent) => {
  const startDate = new Date(start);
  const endDate = isCurrent ? new Date() : new Date(end);
  
  // Validate dates
  if (isNaN(startDate.getTime())) return '0 months';
  if (!isCurrent && isNaN(endDate.getTime())) return '0 months';
  
  // Calculate total days first for more accurate calculation
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
  // If less than 1 day, show 1 day
  if (daysDiff < 1) {
    return '1 day';
  }
  
  // If less than 30 days, show in days
  if (daysDiff < 30) {
    return `${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
  }
  
  // Calculate months more accurately
  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
               (endDate.getMonth() - startDate.getMonth());
  
  // Add 1 month if we've passed the start day in the end month
  if (endDate.getDate() >= startDate.getDate()) {
    months += 1;
  }
  
  // Ensure minimum of 1 month if there's any duration
  if (months < 1 && daysDiff >= 1) {
    months = 1;
  }
  
  // If less than 12 months, show in months
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  // Show in years and months
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
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
  
  let totalMonths = 0;
  experiences.forEach(exp => {
    const startDate = new Date(exp.startDate);
    const endDate = exp.current ? new Date() : new Date(exp.endDate);
    
    // Skip invalid dates
    if (isNaN(startDate.getTime())) return;
    if (!exp.current && isNaN(endDate.getTime())) return;
    
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                 (endDate.getMonth() - startDate.getMonth());
    
    // Add 1 month if we've passed the start day
    if (endDate.getDate() >= startDate.getDate()) {
      months += 1;
    }
    
    // Ensure minimum of 1 month
    if (months < 1) {
      months = 1;
    }
    
    totalMonths += months;
  });

  if (totalMonths === 0) return "0 months";
  
  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
  }
  
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  
  let duration = `${years} year${years !== 1 ? 's' : ''}`;
  if (remainingMonths > 0) {
    duration += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  return duration;
};