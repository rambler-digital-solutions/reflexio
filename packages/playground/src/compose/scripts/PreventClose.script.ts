/* eslint-disable @typescript-eslint/no-empty-function */
import { IState, ITriggers } from 'src/_redux/types';
import {
  InitArgsType,
  ScriptOptsType,
  WatchArgsType,
} from '../../../../v1-core/lib/types';
import { Script } from '../../../../v1-core/lib/interfaces/IScript';
export class PreventCloseScript extends Script<
  ITriggers,
  IState,
  'preventClose',
  'init',
  {}
> {
  private body: string = '';
  private subject: string = '';
  private passCb: () => void;

  constructor(public opts: ScriptOptsType<ITriggers, IState, 'preventClose'>) {
    super();
  }

  init(args: InitArgsType<ITriggers, 'preventClose', 'init'>): void {
    console.log('prevent close init');
  }

  private handleCheck(args) {
    this.passCb = args.payload.passCb;
    if (
      typeof args.payload.subject === 'undefined' &&
      typeof args.payload.body === 'undefined'
    ) {
      this.opts.trigger('preventClose', 'checkResp', true);
    } else if (
      args.payload.subject !== this.subject ||
      args.payload.body !== this.body
    ) {
      console.log('COMPARE');
      console.log(args.payload.subject);
      console.log(args.payload.body);
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
    if (checkReqEvent.isCatched) {
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
