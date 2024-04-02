/* eslint-disable no-unused-vars */
import { WatchArgsType } from '../../../../v1-core/lib/types';
import { IState, ITriggers } from 'src/_redux/types';
import { useSystem } from '../../../../v1-core/lib';
import { InitArgsType, ScriptOptsType } from '../../../../v1-core/lib/types';
import { Script } from '../../../../v1-core/lib/Script';
import { PopupComposeContent } from '../components/PopupComposeContent';
import { IComposeTriggers } from '../compose.config';

/*
 ** This script is responsible for opening
 ** and closing window, managing form content.
 */
export class SetContentScript extends Script<
  ITriggers,
  IState,
  'setContent',
  'init',
  {}
> {
  constructor(
    public opts: ScriptOptsType<ITriggers, IState, 'setContent', null>
  ) {
    super();
  }

  private forms: { [key: string]: { subject: string; body: string } } = {};

  private system;

  public init(args: InitArgsType<IComposeTriggers, 'setContent', 'init'>) {
    console.log('CONTENT INIT');
    this.system = useSystem();
    this.opts.bind('openFromList', 'handleOpenFromList');
  }

  // clear local saved data , then state will be changed by reducer
  private async handleCloseWindow(args) {
    if (!args.payload || !args.payload.noCheck) {
      args.hangOn();

      const id = this.opts.getCurrentState().compose.openedComposeId;
      const resp = await this.opts.hook(
        'preventClose',
        'checkReq',
        'checkResp',
        {
          subject: this.forms[id] && this.forms[id].subject,
          body: this.forms[id] && this.forms[id].body,
          passCb: () => {
            this.opts.trigger('openPopup', 'close', null);
            this.opts.trigger('setContent', 'closeWindow', {
              ...args.payload,
              noCheck: true,
            });
          },
        }
      );
      if (!resp) {
        this.opts.trigger('openPopup', 'open', null);
      } else {
        this.opts.trigger('setContent', 'closeWindow', {
          ...args.payload,
          noCheck: true,
        });
      }
    }
  }

  // when window is getting opened we need this to restore saved state
  private handleOpenFromList(args) {
    console.log('OPEN FROM LIST');
    this.opts.trigger('setFormState', '', {
      body: args.payload.body,
      subject: args.payload.subject,
    });
    this.opts.trigger('preventClose', 'set', {
      body: args.payload.body,
      subject: args.payload.subject,
    });
    this.opts.trigger('setContent', 'openWindow', { id: '-1' });
  }

  // if id = -1 => means we open brand new window
  // if id = null => means we hide currently opened window
  private handleOpenWindow(args) {
    this.opts.trigger('preventClose', 'init', null);
    if (args.payload.id) {
      const savedData = this.forms[args.payload.id];
      if (savedData) {
        this.opts.trigger('setFormState', '', {
          body: savedData.body,
          subject: savedData.subject,
        });
      }
    } else {
      const { openedComposeId, subject, body } =
        this.opts.getCurrentState().compose;
      if (openedComposeId) {
        const savedData = this.forms[openedComposeId];
        this.opts.trigger('setContent', 'changeItem', {
          subject: (savedData && savedData.subject) || subject,
          id: openedComposeId,
        });
        if (!savedData) {
          this.opts.trigger('setContent', 'syncForm', {
            input: 'body',
            text: body,
          });
          this.opts.trigger('setContent', 'syncForm', {
            input: 'subject',
            text: subject,
          });
        }
        this.opts.trigger('setFormState', '', {
          body: '',
          subject: '',
        });
      }
    }
  }

  //save form input into class property
  private handleSyncForm(args) {
    const currentId = this.opts.getCurrentState().compose.openedComposeId;
    if (currentId) {
      if (!this.forms[currentId]) {
        this.forms[currentId] = {} as any;
      }
      if (args.payload.input === 'subject') {
        this.forms[currentId].subject = args.payload.text;
      }
      if (args.payload.input === 'body') {
        this.forms[currentId].body = args.payload.text;
      }
    }
  }

  public handleCommitFormContent(args) {
    const currentId = this.opts.getCurrentState().compose.openedComposeId;
    if (currentId) {
      const savedData = this.forms[currentId];
      if (savedData) {
        this.opts.trigger('setFormState', '', {
          body: savedData.body,
          subject: savedData.subject,
        });
      }
    }
  }

  public watch(args) {
    //console.log(this.opts.getCurrentState())
    console.log(args.status);
    console.log(args.payload);
    // console.log(this.system)
    if (args.status === 'syncForm') {
      this.handleSyncForm(args as any);
    }
    if (args.status === 'openWindow') {
      this.handleOpenWindow(args as any);
    }
    if (args.status === 'closeWindow') {
      this.handleCloseWindow(args as any);
    }
    if (args.status === 'commitFormContent') {
      this.handleCommitFormContent(args);
    }
    // if(args.status === 'openFromList') {
    //     this.handleOpenFromList(args as any)
    // }
  }
}
