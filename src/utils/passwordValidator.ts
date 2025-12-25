export interface PasswordStrength {
    isStrong: boolean;
    errors: string[];
}

const PASSWORD_REQUIREMENTS = {
    minLength: 8,
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /\d/,
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

export const validatePassword = (password: string): PasswordStrength => {
    const errors: string[] = [];

    if (!password) {
        errors.push('Password is required');
        return { isStrong: false, errors };
    }

    if (password.length < PASSWORD_REQUIREMENTS.minLength) {
        errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
    }

    if (!PASSWORD_REQUIREMENTS.hasUppercase.test(password)) {
        errors.push('Password must contain at least one uppercase letter (A-Z)');
    }

    if (!PASSWORD_REQUIREMENTS.hasLowercase.test(password)) {
        errors.push('Password must contain at least one lowercase letter (a-z)');
    }

    if (!PASSWORD_REQUIREMENTS.hasNumber.test(password)) {
        errors.push('Password must contain at least one number (0-9)');
    }

    if (!PASSWORD_REQUIREMENTS.hasSpecialChar.test(password)) {
        errors.push('Password must contain at least one special character (!@#$%^&*)');
    }

    return {
        isStrong: errors.length === 0,
        errors,
    };
};
