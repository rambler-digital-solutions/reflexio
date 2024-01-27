import { ILetter } from 'src/letters/interfaces/Letter.interface';
import { IState, ITriggers } from '../_redux/types';
import { Bite, Slice } from '../../../v1-core/lib';
import { BiteStatusWrap } from '../../../v1-core/lib/types';
import { changeItemReducer } from './reducers/changeItem.reducer';
import { closeWindowRecucer } from './reducers/closeWindow.reducer';
import { openWindowReducer } from './reducers/openWindow.reducer';
import { PreventCloseScript } from './scripts/PreventClose.script';
import { SetContentScript } from './scripts/SetContent.script';
import { SubmitLetterScript } from './scripts/SubmitLetter.script';

export interface IComposeState {
  openedComposeId: string | null;
  composeItems: Array<{
    id: string;
    subject: string;
  }>;
  body: string;
  subject: string;
  from: string;
  to: string;
}

const composeInitialState: IComposeState = {
  openedComposeId: null,
  composeItems: [],
  body: '',
  subject: '',
  from: '',
  to: '',
};

export interface IComposeTriggers {
  setContent: BiteStatusWrap<{
    init: null;
    changeItem: { id: string; subject?: string };
    openFromList: { subject: string; body: string };
    openWindow: { id: string | null };
    closeWindow: { id: string; noCheck?: boolean };
    submit: { id: string };
    commitFormContent: null;
    syncForm: {
      text: string;
      input: 'subject' | 'body';
    };
    done: null;
  }>;
  submitLetter: BiteStatusWrap<{
    init: null;
    save: null;
    done: null;
  }>;
  preventClose: BiteStatusWrap<{
    init: null;
    set: { subject: string; body: string };
    clear: null;
    checkReq: { body: string; subject: string; passCb?: () => void };
    checkResp: boolean;
  }>;
  setFormState: Partial<IComposeState>;
}

const setContentBite = Bite<
  IComposeTriggers,
  IComposeState,
  'setContent',
  ITriggers
>(
  {
    init: null,
    changeItem: changeItemReducer,
    openFromList: null,
    openWindow: openWindowReducer,
    closeWindow: closeWindowRecucer,
    commitFormContent: null,
    submit: closeWindowRecucer,
    syncForm: null, // вытащить из хранилища форму и положить ее в стор
    done: null,
  },
  {
    watchScope: ['setContent', 'preventClose'],
    script: SetContentScript,
    instance: 'stable',
    initOn: 'init',
  }
);

const submitLetterBite = Bite<
  IComposeTriggers,
  IComposeState,
  'submitLetter',
  ITriggers
>(
  {
    init: null,
    save: null,
    done: null,
  },
  {
    watchScope: ['submitLetter'],
    script: SubmitLetterScript,
    instance: 'stable',
    initOn: 'init',
  }
);

const setFormStateBite = Bite<
  IComposeTriggers,
  IComposeState,
  'setFormState',
  ITriggers
>((state, payload) => {
  Object.assign(state, payload);
}, null);

const preventCloseBite = Bite<
  IComposeTriggers,
  IComposeState,
  'preventClose',
  ITriggers
>(
  {
    init: null,
    checkReq: null,
    checkResp: null,
    set: null,
    clear: null,
  },
  {
    watchScope: ['preventClose'],
    script: PreventCloseScript,
    instance: 'stable',
    initOn: 'init',
  }
);

export const composeSlice = Slice<IComposeTriggers, IComposeState, ITriggers>(
  'compose',
  {
    setContent: setContentBite,
    submitLetter: submitLetterBite,
    setFormState: setFormStateBite,
    preventClose: preventCloseBite,
  },
  composeInitialState
);
