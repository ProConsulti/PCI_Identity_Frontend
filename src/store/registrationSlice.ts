import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface RegistrationState {
    companyID: number | null;
    userEmail: string | null;
    currencyID: number | null;
}

const initialState: RegistrationState = {
    companyID: null,
    userEmail: null,
    currencyID: null,
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setCompanyData: (state: RegistrationState, action: PayloadAction<{ companyID: number; userEmail: string; currencyID: number }>) => {
            state.companyID = action.payload.companyID;
            state.userEmail = action.payload.userEmail;
            state.currencyID = action.payload.currencyID;
        },
        clearRegistrationData: (state: RegistrationState) => {
            state.companyID = null;
            state.userEmail = null;
            state.currencyID = null;
        },
    },
});

export const { setCompanyData, clearRegistrationData } = registrationSlice.actions;
export default registrationSlice.reducer;
