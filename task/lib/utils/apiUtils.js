/**
 * Utility functions for handling API responses safely
 */

/**
 * Safely parse JSON response, handling cases where HTML is returned instead
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} - Parsed JSON or error object
 */
export const safeJsonParse = async (response) => {
  try {
    const text = await response.text();
    
    // Check if the response is HTML (common when getting error pages)
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      console.error('Received HTML instead of JSON:', text.substring(0, 200) + '...');
      return {
        error: 'Server returned HTML instead of JSON. This usually indicates a server error or incorrect endpoint.',
        status: response.status,
        statusText: response.statusText
      };
    }
    
    // Try to parse as JSON
    if (text.trim() === '') {
      return {
        error: 'Empty response received',
        status: response.status,
        statusText: response.statusText
      };
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parsing error:', error);
    return {
      error: `Failed to parse response: ${error.message}`,
      status: response.status,
      statusText: response.statusText
    };
  }
};

/**
 * Enhanced fetch wrapper with better error handling
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - API response or error
 */
export const safeFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await safeJsonParse(response);
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error(`API Error for ${url}:`, error);
    return { 
      success: false, 
      error: error.message || 'Network error occurred',
      status: error.status || 500
    };
  }
};

/**
 * Check if a response contains valid JSON
 * @param {string} text - Response text
 * @returns {boolean} - Whether the text is valid JSON
 */
export const isValidJson = (text) => {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

/**
 * Handle API errors consistently across the application
 * @param {Error|Object} error - Error object or API error response
 * @param {string} context - Context where the error occurred
 * @returns {string} - User-friendly error message
 */
export const handleApiError = (error, context = 'API call') => {
  console.error(`${context} error:`, error);
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.error) {
    return error.error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};
