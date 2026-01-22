export const getApplicationCode = (): { ifrs16Code: string } => {
    const ifrs16Code = import.meta.env.VITE_APP_IFRS16_CODE;

    return { ifrs16Code };
}