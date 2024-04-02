

export const isBackend = (): boolean => typeof window === 'undefined';

export const isClient = (): boolean => !isBackend();