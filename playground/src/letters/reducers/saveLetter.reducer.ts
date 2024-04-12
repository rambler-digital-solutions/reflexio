import type {ILettersState} from '../letters.config';

export const saveLetterReducer = (
  state: ILettersState,
  payload: {id: number},
) => {
  const newLetter = state.saveLetter.input;

  if (!newLetter) {
    return;
  }

  newLetter.uid = payload.id;
  console.log(`saveLetterReducer ${payload.id}`);
  state.lettersList.data?.push(newLetter);
};
