import getApiBaseUrl from "./domain.config";

interface ApiBaseUrl {
    identityService: string;
    ifrsService: string;
}

const { identityService, ifrsService }: ApiBaseUrl = getApiBaseUrl();
export const API_CONFIG = {
    PCI_IDENTITY_SERVICE: `${identityService}/api`,
    IFRS16_SERVICE: `${ifrsService}/api`,
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
