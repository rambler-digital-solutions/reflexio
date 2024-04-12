import type {ILettersState} from '../letters.config';

export const updateLetterReducer = (state: ILettersState, _payload: any) => {
  const id = state.updateLetter.input?.id;
  const foundId = state.lettersList.data?.findIndex((l) => l.uid === id);
  const newLetter = state.updateLetter.input?.newLetter;

  if (state.lettersList.data && newLetter && foundId && foundId !== -1) {
    state.lettersList.data[foundId] = newLetter;
  }
};
