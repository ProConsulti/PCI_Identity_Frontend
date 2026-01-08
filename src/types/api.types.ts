// Company Types
export interface CompanyCreateRequest {
    name: string;
    companyID: number;
    registrationNumber: string;
    reportingCurrencyId: number;
    reportingCurrencyCode: string;
    financialYearEnd: string;
    leaseTypes: string;
    assetType: string;
    licenseKey?: string;
    licenseExpiry: string;
    allowedUsers: number;
    allowedLease: number;
}

export interface CompanyCreateResponse {
    success: boolean;
    message: string,
    data: {
        companyId: number,
        name: string
    }
}

// OTP Types
export interface SendOtpRequest {
    email: string;
}

export interface SendOtpResponse {
    success: boolean,
    message: string,
    data?: {
        email: string;
    }
}

export interface VerifyOtpRequest {
    email: string;
    otp: string;
}

// User Existence Check
export interface UserExistRequest {
    email: string;
}

// User Types
export interface UserCreateRequest {
    userID: number;
    username: string;
    passwordHash: string;
    phoneNumber: string;
    userAddress: string;
    email: string;
    companyID: string;
    role: string;
}

export interface UserCreateResponse {
    success: true,
    message: string,
    data: {
        userId: number,
        email: string
    }
}

// Lease Types
export interface LeaseCreateRequest {
    [key: string]: any;
}

export interface LeaseCreateResponse {
    id: string;
    createdAt: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Token Types
export interface TokenRequest {
    grant_type: string;
    client_id: string;
    client_secret: string;
    scope: string;
}

export interface TokenResponse {
    access_token: string;
}

// API Error
export interface ApiError {
    status: number;
    message: string;
    details?: any;
}

// Specific type for demo lease request
export interface DemoLeaseRequest {
    leaseId: number;
    leaseName: string;
    rental: number;
    commencementDate: string;
    endDate: string;
    annuity: string;
    ibr: number;
    frequency: string;
    assetType: string;
    companyId: string | number;
    currencyId: number;
    grv: number | null;
    idc: number | null;
    increment: number | null;
    incrementalFrequency: string;
    isActive: boolean;
    lastModifiedDate: string;
    userId: string;
    userName: string;
    isLeaseModified: boolean;
    parentLeaseId: number | null;
}

export interface LeaseSubmitRequest {
    LeaseData: DemoLeaseRequest
    LessorData: null
}
