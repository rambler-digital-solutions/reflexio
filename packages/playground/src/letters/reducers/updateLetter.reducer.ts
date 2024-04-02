import { ILetter } from '../interfaces/Letter.interface';
import { ILettersState } from '../letters.config';

export const updateLetterReducer = (state: ILettersState, payload: any) => {
  const id = state.updateLetter.input.id;
  const foundId = state.lettersList.data.findIndex((l) => l.uid === id);
  const newLetter = state.updateLetter.input.newLetter;

  if (foundId !== -1) {
    state.lettersList.data[foundId] = newLetter;
  }
};
