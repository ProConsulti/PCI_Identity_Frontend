export type RegistrationStep = 'company' | 'user' | 'lease';

export interface StepConfig {
    id: RegistrationStep;
    label: string;
    description: string;
    path: string;
}