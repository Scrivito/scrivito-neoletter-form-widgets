let tenant = null;
let neoletterSubscriptionFeatureEnabled = null;

export const setScrivitoFormWidgetConfig = (
  scrivitoTenant,
  neoletterFormSubmissionFeatureEnabled
) => {
  tenant = scrivitoTenant;
  neoletterSubscriptionFeatureEnabled = neoletterFormSubmissionFeatureEnabled;
};

export const getScrivitoFormWidgetConfig = () => {
  return {
    tenant: tenant,
    neoletterSubmissionEnabled: neoletterSubscriptionFeatureEnabled,
  };
};
