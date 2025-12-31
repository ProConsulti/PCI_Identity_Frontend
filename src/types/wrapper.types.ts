export type RegistrationStep = 'company' | 'user' | 'verify';

export interface StepConfig {
    id: RegistrationStep;
    label: string;
    description: string;
    path: string;
}