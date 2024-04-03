/* eslint-disable @typescript-eslint/no-empty-function */
import {IState, ITriggers} from 'src/_redux/types';
import {
  InitArgsType,
  ScriptOptsType,
  WatchArgsType,
} from '../../../../core-v1/lib/types';
import {Script} from '../../../../core-v1/lib/Script';

export class PreventCloseScript extends Script<
  ITriggers,
  IState,
  'preventClose',
  'init',
  {someData: string}
> {
  private body: string = '';
  private subject: string = '';
  private passCb: () => void;

  constructor(
    public opts: ScriptOptsType<
      ITriggers,
      IState,
      'preventClose',
      {someData: string}
    >,
  ) {
    super();
  }

  init(args: InitArgsType<ITriggers, 'preventClose', 'init'>): void {
    console.log('prevent close init');
    console.log(this.opts.injected);
  }

  private handleCheck(args) {
    this.passCb = args.passCb;

    if (
      typeof args.subject === 'undefined' &&
      typeof args.body === 'undefined'
    ) {
      this.opts.trigger('preventClose', 'checkResp', true);
    } else if (args.subject !== this.subject || args.body !== this.body) {
      console.log('COMPARE');
      console.log(args.subject);
      console.log(args.body);
      console.log(this.body);
      console.log(this.subject);
      this.opts.trigger('preventClose', 'checkResp', false);
    } else {
      this.opts.trigger('preventClose', 'checkResp', true);
    }
  }
  private handleClear() {
    if (this.passCb) {
      this.passCb();
    }
  }
  private handleSet(args) {
    this.body = args.payload.body;
    this.subject = args.payload.subject;
  }

  public watch(args: WatchArgsType<ITriggers, 'preventClose'>) {
    console.log('preventClose event');

    const checkReqEvent = this.opts.catchStatus('checkReq', args);

    console.log(args.trigger);
    console.log(args.status);
    console.log(args.source);
    console.log(args);

    if (checkReqEvent.isCatched) {
      console.log('CHECK REQ CATCH');
      this.handleCheck(checkReqEvent.payload);
    }

    const clearEvent = this.opts.catchStatus('clear', args);

    if (clearEvent.isCatched) {
      this.handleClear();
    }

    const setEvent = this.opts.catchStatus('set', args);

    if (setEvent.isCatched) {
      this.handleSet(setEvent.payload);
    }
  }
}
