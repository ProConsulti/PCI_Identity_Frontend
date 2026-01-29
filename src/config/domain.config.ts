const getApiBaseUrl = () => {
    const hostname = window.location.hostname;

    // Comment out the below if block to disable local development URLs
    // if (hostname === 'localhost') {
    //     return {
    //         ifrsService: import.meta.env.VITE_IFRS16_SERVICE_LOCAL,
    //         identityService: import.meta.env.VITE_PCI_IDENTITY_SERVICE_LOCAL,
    //     };
    // }

    if (hostname.includes('ifrs16.ifrs.ca') || hostname.includes('ifrspci.ifrs.ca')) {
        return {
            ifrsService: import.meta.env.VITE_IFRS16_SERVICE,
            identityService: import.meta.env.VITE_PCI_IDENTITY_SERVICE,
        };
    }

    if (hostname.includes('ifrs16-tool.ifrs.ca') || hostname.includes('ifrs16pci-tool.ifrs.ca')) {
        return {
            ifrsService: import.meta.env.VITE_IFRS16_SERVICE_PROD,
            identityService: import.meta.env.VITE_PCI_IDENTITY_SERVICE_PROD,
        };
    }

    // Default to production URLs
    return {
        ifrsService: import.meta.env.VITE_IFRS16_SERVICE,
        identityService: import.meta.env.VITE_PCI_IDENTITY_SERVICE,
    };
};

export default getApiBaseUrl;
