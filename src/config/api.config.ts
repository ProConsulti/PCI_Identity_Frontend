// API Configuration
const PCI_IDENTITY_SERVICE = import.meta.env.VITE_PCI_IDENTITY_SERVICE || 'https://localhost:7269';
const IFRS16_SERVICE = import.meta.env.VITE_IFRS16_SERVICE || 'https://localhost:7151';

export const API_CONFIG = {
    PCI_IDENTITY_SERVICE: PCI_IDENTITY_SERVICE,
    IFRS16_SERVICE: IFRS16_SERVICE,
    ENDPOINTS: {
        GENERATE_TOKEN: '/api/GenerateToken/token',
        REGISTER_COMPANY: '/api/Registration/company',
        REGISTER_USER: '/api/Registration',
        REGISTER_LEASE: '/api/Registration/lease',
        USER_EXIST: '/api/User/UserExist',
        GET_ALL_CURRENCIES: '/api/Currency/GetAllCurrencies',
    },
    LEASE_ENDPOINTS: {
        CREATE_DEMO_LEASE: '/api/LeaseFormData',
    },
    TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
