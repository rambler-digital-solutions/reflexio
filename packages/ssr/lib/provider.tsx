import React from 'react';
import {App} from './core/app';

export const SsrContext = React.createContext();

export const SsrProvide = (props: {children: any}) => {
  const app = App.getApp();

  return (
    <SsrContext.Provider value={app}>{props.children}</SsrContext.Provider>
  );
};
