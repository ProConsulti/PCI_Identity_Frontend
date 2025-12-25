export type LeaseFrequency = 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually';

export interface LeaseCreateRequest {
    leaseId: string;
    leaseName: string;
    rental: number;
    commencementDate: string;
    endDate: string;
    annuity: string;
    ibr: number;
    frequency: LeaseFrequency;
    assetType: string;
    companyID: string;
    currencyID: string;
    grv: number;
    idc: number;
    increment: number;
    incrementalFrequency: string;
    isActive: boolean;
    lastModifiedDate: string;
    userID: string;
    userName: string;
    isLeaseModified: boolean;
    parentLeaseId?: string;
}