

export const changeItemReducer = (state, payload) => {
    const foundItem = state.composeItems.find((i) => i.id === payload.id);
    if (foundItem) {
      Object.assign(foundItem, payload);
    }
  }