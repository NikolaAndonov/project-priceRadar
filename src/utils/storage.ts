/**
 * Get item from localStorage with proper type handling
 * @param key - Storage key
 * @returns Parsed item or null if not found
 */
export function getItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item from localStorage (${key}):`, error);
    return null;
  }
}

/**
 * Set item in localStorage with proper serialization
 * @param key - Storage key
 * @param value - Value to store
 */
export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage (${key}):`, error);
  }
}

/**
 * Remove item from localStorage
 * @param key - Storage key
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage (${key}):`, error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Check if localStorage is available
 * @returns True if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get multiple items from localStorage
 * @param keys - Array of storage keys
 * @returns Object with key-value pairs
 */
export function getItems<T>(keys: string[]): Record<string, T | null> {
  const result: Record<string, T | null> = {};
  
  for (const key of keys) {
    result[key] = getItem<T>(key);
  }
  
  return result;
}

/**
 * Set multiple items in localStorage
 * @param items - Object with key-value pairs
 */
export function setItems<T>(items: Record<string, T>): void {
  for (const [key, value] of Object.entries(items)) {
    setItem(key, value);
  }
} 