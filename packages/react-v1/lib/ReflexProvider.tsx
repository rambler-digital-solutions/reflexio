import React, {useMemo} from 'react';
import {useSystem} from '@reflexio/core-v1';
import {StoreContext} from './context';

interface ReflexProviderProps {
  store: any;
  children: React.ReactNode;
}

export function ReflexProvider({store, children}: ReflexProviderProps) {
  const system = useSystem();

  const contextValue = useMemo(() => ({store, system}), [store, system]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}
