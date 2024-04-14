import type {Store} from 'redux';
import type {System} from '@reflexio/core-v1';
import {createContext} from 'react';

interface StoreContextValue {
  store: Store;
  system: System;
}

export const StoreContext = createContext<StoreContextValue>(
  {} as StoreContextValue,
);
