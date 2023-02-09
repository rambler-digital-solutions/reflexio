import { Bite, Slice } from '../../../../dist/lib';
import { TriggerPhaseWrapper } from '@seijs/redux-hang-on/lib/types';
import { effectiveBite, EffectiveState, EffectiveTrigger, effectiveInitialState } from 'src/_redux/effectiveBite';
import { ILetter } from './interfaces/Letter.interface';
import { IState, ITriggers } from 'src/_redux/types';
import { createLetter, loadLetters, updateLetter } from 'src/_api';
import { deleteLetterReducer } from './reducers/deleteLetter.reducer';
import { updateLetterReducer } from './reducers/updateLetter.reducer';
import { saveLetterReducer } from './reducers/saveLetter.reducer';

export interface ILettersState {
    lettersList: EffectiveState<null, Array<ILetter>, Error>
    saveLetter: EffectiveState<ILetter, {id:number}, Error>
    updateLetter: EffectiveState<{id: number, newLetter: ILetter}, boolean, Error>
    deleteLetter: EffectiveState<{id: number}, boolean, Error>
}

export interface ILettersTriggers {
    lettersList: EffectiveTrigger<null, ILetter, Error>
    saveLetter: EffectiveTrigger<ILetter, number, Error>
    updateLetter: EffectiveTrigger<{id: number, newLetter: ILetter}, boolean, Error>
    deleteLetter: EffectiveTrigger<{id: number}, boolean, Error>
}

export const lettersInitialState: ILettersState = {
    lettersList: effectiveInitialState(),
    saveLetter: effectiveInitialState(),
    updateLetter: effectiveInitialState(),
    deleteLetter: effectiveInitialState()
};

const lettersListBite = effectiveBite<ILettersTriggers, ITriggers, ILettersState, IState, 'lettersList'>(
    loadLetters, 'lettersList');

const saveLetterBite = effectiveBite<ILettersTriggers, ITriggers, ILettersState, IState, 'saveLetter'>(
    createLetter, 'saveLetter', {
        doneReducer: saveLetterReducer
  });
    
const updateLetterBite = effectiveBite<ILettersTriggers, ITriggers, ILettersState, IState, 'updateLetter'>(
    updateLetter, 'updateLetter', {
        'doneReducer': updateLetterReducer
    });
   
const deleteLetterBite = effectiveBite<ILettersTriggers, ITriggers, ILettersState, IState, 'deleteLetter'>(
    loadLetters, 'deleteLetter', {
        'doneReducer': deleteLetterReducer
    });
   

export const lettersSlice = Slice<ILettersTriggers, ITriggers, ILettersState, IState>(
  'letters',
    {
     'lettersList': lettersListBite,
     'updateLetter': updateLetterBite,
     'deleteLetter': deleteLetterBite,
     'saveLetter': saveLetterBite
    },
  lettersInitialState
);
