import { ILettersState } from "../letters.config";



export const deleteLetterReducer = (state: ILettersState, payload:  {id: number}) => {
    state.lettersList.data = state.lettersList.data.filter( l => l.uid === payload.id)
}