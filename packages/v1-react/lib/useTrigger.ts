import { useContext } from "react";
import { StoreContext } from "./context";
import { DispatcherType } from "@reflexio/core-v1/lib/types";
import { getActionType } from "@reflexio/core-v1/lib/utils";
export const useTrigger = <Tr>(reactSource?:string) => {
    const ctx = useContext(StoreContext)
     const store = ctx.store;
    const trigger: DispatcherType<Tr> = (trigger, status, payload) => {
      const combynedType = getActionType(trigger as any, status as any);
      store.dispatch({ type: combynedType, payload, reactSource });
    };
  
    return trigger;
  };