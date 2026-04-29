import * as React from 'react'

const MOBILE_BREAKPOINT = 768

const MOBILE_MQL = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

const subscribe = (onStoreChange: () => void) => {
  const mql = window.matchMedia(MOBILE_MQL)
  mql.addEventListener('change', onStoreChange)
  return () => mql.removeEventListener('change', onStoreChange)
}

const getSnapshot = () => window.innerWidth < MOBILE_BREAKPOINT

const getServerSnapshot = () => false

export const useIsMobile = () => {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
