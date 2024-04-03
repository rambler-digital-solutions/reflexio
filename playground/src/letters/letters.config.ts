import {
  effectiveBite,
  EffectiveState,
  EffectiveTrigger,
  effectiveInitialState,
} from 'src/_redux/effectiveBite';
import {IState, ITriggers} from 'src/_redux/types';
import {createLetter, loadLetters, updateLetter} from 'src/_api';
import {Bite, Slice} from '../../../core-v1/lib';
import {BiteStatusWrap} from '../../../core-v1/lib/types';
import {ILetter} from './interfaces/Letter.interface';
import {deleteLetterReducer} from './reducers/deleteLetter.reducer';
import {updateLetterReducer} from './reducers/updateLetter.reducer';
import {saveLetterReducer} from './reducers/saveLetter.reducer';

export interface ILettersState {
  lettersList: EffectiveState<null, Array<ILetter>, Error>;
  saveLetter: EffectiveState<ILetter, {id: number}, Error>;
  updateLetter: EffectiveState<
    {id: number; newLetter: ILetter},
    boolean,
    Error
  >;
  deleteLetter: EffectiveState<{id: number}, boolean, Error>;
}

export interface ILettersTriggers {
  lettersList: EffectiveTrigger<null, ILetter, Error>;
  saveLetter: EffectiveTrigger<ILetter, number, Error>;
  updateLetter: EffectiveTrigger<
    {id: number; newLetter: ILetter},
    boolean,
    Error
  >;
  deleteLetter: EffectiveTrigger<{id: number}, boolean, Error>;
}

export const lettersInitialState: ILettersState = {
  lettersList: effectiveInitialState(),
  saveLetter: effectiveInitialState(),
  updateLetter: effectiveInitialState(),
  deleteLetter: effectiveInitialState(),
};

const lettersListBite = effectiveBite<
  ILettersTriggers,
  ILettersState,
  'lettersList',
  ITriggers
>(loadLetters, 'lettersList');

const saveLetterBite = effectiveBite<
  ILettersTriggers,
  ILettersState,
  'saveLetter',
  ITriggers
>(createLetter, 'saveLetter', {
  doneReducer: saveLetterReducer,
});

const updateLetterBite = effectiveBite<
  ILettersTriggers,
  ILettersState,
  'updateLetter',
  ITriggers
>(updateLetter, 'updateLetter', {
  doneReducer: updateLetterReducer,
});

const deleteLetterBite = effectiveBite<
  ILettersTriggers,
  ILettersState,
  'deleteLetter',
  ITriggers
>(loadLetters, 'deleteLetter', {
  doneReducer: deleteLetterReducer,
});

export const lettersSlice = Slice<
  ILettersTriggers,
  ILettersState,
  ITriggers,
  IState
>(
  'letters',
  {
    lettersList: lettersListBite,
    updateLetter: updateLetterBite,
    deleteLetter: deleteLetterBite,
    saveLetter: saveLetterBite,
  },
  lettersInitialState,
);
