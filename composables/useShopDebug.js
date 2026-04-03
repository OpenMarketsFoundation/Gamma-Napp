export const useShopDebug = () => {
  const debugState = useState('shop-debug-state', () => ({
    merchantNpub: '',
    merchantPubkey: '',
    identitySource: '',
    relaySource: '',
    merchantOutbox: [],
    merchantInbox: [],
    paymentListenRelays: [],
    orderPublishRelays: [],
    lastPage: '',
    details: {}
  }))

  const setShopDebug = (payload) => {
    debugState.value = {
      ...debugState.value,
      ...payload,
      details: {
        ...(debugState.value.details || {}),
        ...(payload.details || {})
      }
    }
  }

  return {
    debugState,
    setShopDebug
  }
}
