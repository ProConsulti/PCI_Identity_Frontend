export interface EmailValidation {
    isValid: boolean;
    error: string | null;
}

// Regex pattern for allowed email domains (.com, .uk, .pk)
export const emailRegex = /^[^\s@]+@[^\s@]+\.(com|uk|pk)$/; 

export const validateEmail = (email: string): EmailValidation => {
    if (!email) {
        return {
            isValid: false,
            error: 'Email is required',
        };
    }

    if (email.trim().length === 0) {
        return {
            isValid: false,
            error: 'Email cannot be empty',
        };
    }

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            error: 'Email must end with .com, .uk, or .pk domain',
        };
    }

    return {
        isValid: true,
        error: null,
    };
};
