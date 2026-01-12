// API Configuration
const PCI_IDENTITY_SERVICE = import.meta.env.VITE_PCI_IDENTITY_SERVICE || 'https://localhost:7269/api';
const IFRS16_SERVICE = import.meta.env.VITE_IFRS16_SERVICE || 'https://localhost:7151/api';

export const API_CONFIG = {
    PCI_IDENTITY_SERVICE: PCI_IDENTITY_SERVICE,
    IFRS16_SERVICE: IFRS16_SERVICE,
    ENDPOINTS: {
        GENERATE_TOKEN: '/GenerateToken/token',
        SEND_OTP: '/Registration/send-otp',
        VERIFY_OTP: '/Registration/verify-otp',
        REGISTER_COMPANY: '/Registration/company',
        REGISTER_USER: '/Registration',
        REGISTER_LEASE: '/Registration/lease',
        USER_EXIST: '/User/UserExist',
        GET_ALL_CURRENCIES: '/Currency/GetAllCurrencies',
        FORGOT_PASSWORD: '/User/ForgotPassword',
    },
    LEASE_ENDPOINTS: {
        CREATE_DEMO_LEASE: '/LeaseFormData',
    },
    TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
