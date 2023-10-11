let _instanceId = null;
let _neoletterSubscriptionFeatureEnabled = false;
let configIsSet = false;
let setConfigCallback = null;

export const setScrivitoFormWidgetConfig = (
  instanceId,
  neoletterSubscriptionFeatureEnabled
) => {
  _instanceId = instanceId;
  _neoletterSubscriptionFeatureEnabled = neoletterSubscriptionFeatureEnabled;

  configIsSet = true;
  if (setConfigCallback) {
    setConfigCallback();
  }
};

export const getScrivitoFormWidgetConfig = () => {
  return {
    instanceId: _instanceId,
    neoletterSubscriptionEnabled: _neoletterSubscriptionFeatureEnabled,
  };
};

export const onConfigSet = (callback) => {
  if (configIsSet) {
    callback();
  } else {
    setConfigCallback = callback;
  }
};
