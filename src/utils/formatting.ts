/**
 * Format a price with the Bulgarian currency symbol (лв.)
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: 'BGN',
    minimumFractionDigits: 2,
  }).format(price);
};

/**
 * Format a price without currency symbol
 */
export const formatPriceValue = (price: number): string => {
  return new Intl.NumberFormat('bg-BG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Format a date to a localized string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Format a date to a short format (e.g., "20 Nov")
 */
export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('bg-BG', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Format a date to show how long ago it was
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

/**
 * Format a percentage (e.g., 0.15 -> "15%")
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('bg-BG', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value / 100);
};

/**
 * Format a discount percentage with minus sign (e.g., 15 -> "-15%")
 */
export const formatDiscount = (discount: number): string => {
  return `-${discount}%`;
};

/**
 * Calculate and format price difference
 */
export const formatPriceDifference = (currentPrice: number, originalPrice: number): string => {
  const difference = originalPrice - currentPrice;
  const sign = difference > 0 ? '-' : '+';
  return `${sign} ${formatPrice(Math.abs(difference))}`;
};

/**
 * Format a unit price (e.g., "10.50 лв./kg")
 */
export const formatUnitPrice = (price: number, unit: string): string => {
  return `${formatPriceValue(price)} лв./${unit}`;
}; 