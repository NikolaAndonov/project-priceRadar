/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * - At least 8 characters
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 */
export const isStrongPassword = (password: string): boolean => {
  if (password.length < 8) return false;
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Get password strength feedback
 */
export const getPasswordStrength = (password: string): {
  score: number; // 0-4 (0 = no password, 1 = weak, 2 = fair, 3 = good, 4 = strong)
  feedback: string;
} => {
  if (!password) {
    return { score: 0, feedback: '' };
  }

  let score = 0;
  const feedback: string[] = [];

  // Length check
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters long');
  } else {
    score += 1;
  }

  // Complexity checks
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Add to score based on complexity
  if (hasLowercase) score += 0.5;
  if (hasUppercase) score += 0.5;
  if (hasNumbers) score += 1;
  if (hasSpecialChars) score += 1;

  // Additional length bonus
  if (password.length >= 12) score += 0.5;
  if (password.length >= 16) score += 0.5;

  // Common patterns check
  const commonPatterns = [
    'password', '123456', 'qwerty', 'admin', 'welcome',
    'letmein', 'monkey', 'abc123', 'football', 'iloveyou'
  ];

  const lowercasePassword = password.toLowerCase();
  if (commonPatterns.some(pattern => lowercasePassword.includes(pattern))) {
    score -= 1;
    feedback.push('Avoid common words or patterns');
  }

  // Sequential characters check
  const sequentialChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let hasSequential = false;

  for (let i = 0; i < sequentialChars.length - 2; i++) {
    const fragment = sequentialChars.substring(i, i + 3);
    if (lowercasePassword.includes(fragment)) {
      hasSequential = true;
      break;
    }
  }

  if (hasSequential) {
    score -= 0.5;
    feedback.push('Avoid sequential characters');
  }

  // Repeated characters check
  const repeatedChars = /(.)\1{2,}/;
  if (repeatedChars.test(password)) {
    score -= 0.5;
    feedback.push('Avoid repeated characters');
  }

  // Ensure score is within bounds
  score = Math.max(1, Math.min(Math.round(score), 4));

  // Generate feedback based on missing criteria
  if (!hasLowercase) feedback.push('Add lowercase letters');
  if (!hasUppercase) feedback.push('Add uppercase letters');
  if (!hasNumbers) feedback.push('Add numbers');
  if (!hasSpecialChars) feedback.push('Add special characters');

  // Final feedback
  let finalFeedback = '';
  if (score <= 1) {
    finalFeedback = 'Weak password. ' + feedback.join('. ');
  } else if (score === 2) {
    finalFeedback = 'Fair password. ' + feedback.join('. ');
  } else if (score === 3) {
    finalFeedback = 'Good password. ' + (feedback.length ? feedback.join('. ') : '');
  } else {
    finalFeedback = 'Strong password!';
  }

  return { score, feedback: finalFeedback };
};

/**
 * Validate if a string is not empty
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate if a number is within range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validate form fields
 * @param fields - Object with field values
 * @param validations - Object with validation functions for each field
 * @returns Object with error messages for invalid fields
 */
export const validateForm = (
  fields: Record<string, any>,
  validations: Record<string, (value: any) => boolean | string>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(validations).forEach(field => {
    const value = fields[field];
    const validation = validations[field];
    const result = validation(value);
    
    if (typeof result === 'string') {
      errors[field] = result;
    } else if (result === false) {
      errors[field] = `Invalid ${field}`;
    }
  });
  
  return errors;
};

/**
 * Validate login form
 * @param email - User's email
 * @param password - User's password
 * @returns Object with error messages for invalid fields
 */
export const validateLoginForm = (email: string, password: string): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return errors;
};

/**
 * Validate register form
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param email - User's email
 * @param password - User's password
 * @returns Object with error messages for invalid fields
 */
export const validateRegisterForm = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!firstName) {
    errors.firstName = 'First name is required';
  } else if (firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  } else if (lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else {
    const passwordStrength = getPasswordStrength(password);
    if (passwordStrength.score < 2) {
      errors.password = 'Password is too weak. ' + passwordStrength.feedback;
    }
  }

  return errors;
};

/**
 * Validate product search query
 * @param query - Search query
 * @returns Error message if query is invalid, otherwise an empty string
 */
export const validateProductSearch = (query: string): string => {
  if (!query || query.trim().length === 0) {
    return 'Search query cannot be empty';
  }
  
  if (query.length < 2) {
    return 'Search query must be at least 2 characters';
  }
  
  return '';
};

/**
 * Validate price alert
 * @param price - Price to be validated
 * @returns Error message if price is invalid, otherwise an empty string
 */
export const validatePriceAlert = (price: number): string => {
  if (price <= 0) {
    return 'Price must be greater than 0';
  }
  
  return '';
}; 