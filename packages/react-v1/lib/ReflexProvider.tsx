import React from 'react';
import {useSystem} from '@reflexio/core-v1';
import {StoreContext} from './context';

export const ReflexProvider = (props) => {
  const system = useSystem();

  return (
    <StoreContext.Provider value={{store: props.store, system}}>
      {props.children}
    </StoreContext.Provider>
  );
};
