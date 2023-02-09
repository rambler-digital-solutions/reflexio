import { IComposeState } from "../compose.config";



export const closeWindowRecucer =  (state: IComposeState, payload) => {

  const id = state.openedComposeId
    const newComposesArray = state.composeItems.filter(
      (c) => c.id !== id
    );
  state.composeItems = [...newComposesArray];
  state.openedComposeId = null;
  state.subject = ''
  state.body = ''
}
