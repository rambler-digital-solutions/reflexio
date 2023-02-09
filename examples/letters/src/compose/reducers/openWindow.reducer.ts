


export const openWindowReducer  = (state, payload) => {
    if (payload.id === '-1') {
      const id = `${Math.random()}`;
      const newComposeItem = {
        id,
        subject: '',
      };
      state.composeItems = [newComposeItem, ...state.composeItems];
      state.openedComposeId = id;
    } else {
      state.openedComposeId = payload.id;
    }
}