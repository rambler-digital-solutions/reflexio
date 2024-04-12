import type {MakeReducerType} from '../types';

export const getNullReducersNames = <AC, StoreType>(
  reducers: MakeReducerType<AC, StoreType>,
): Array<string> =>
  Object.entries(reducers).reduce((acc: string[], [cur, reducer]) => {
    if (reducer == null) {
      return [...acc, cur];
    } else if (Object.keys(reducer).length) {
      const subArr = Object.entries(reducer)
        .filter(([, value]) => value == null)
        .map(([key]) => `${cur}/${key}`);

      return [...acc, ...subArr];
    }

    return acc;
  }, []);

export const getTriggerAndStatus = (
  actionType: string,
): {trigger: string; status?: string} => {
  const [trigger, status] = actionType.split('/');

  return {trigger, status};
};

export const getActionType = (trigger: string, status?: string): string =>
  trigger + (status ? `/${status}` : '');
