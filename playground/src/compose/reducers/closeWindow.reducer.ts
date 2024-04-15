import type {IComposeState} from '../compose.config';

export const closeWindowReducer = (state: IComposeState, _payload) => {
  const id = state.openedComposeId;
  const newComposesArray = state.composeItems.filter((c) => c.id !== id);

  state.composeItems = [...newComposesArray];
  state.openedComposeId = null;
  state.subject = '';
  state.body = '';
};
