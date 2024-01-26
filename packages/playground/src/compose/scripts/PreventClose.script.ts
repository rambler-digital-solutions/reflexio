/* eslint-disable @typescript-eslint/no-empty-function */
import { IState, ITriggers } from 'src/_redux/types';
import { Script } from '../../../../reflexio-on-redux/lib/interfaces/IScript';
import {
  ScriptAbstractInitArgsType,
  ScriptAbstractUpdateArgsType,
  ScriptAbstractOptsType,
} from '@reflexio/reflexio-on-redux/lib/types';

export class PreventCloseScript extends Script<
  ITriggers,
  IState,
  'preventClose',
  {}
> {
  private body: string = '';
  private subject: string = '';
  private passCb: () => void;

  constructor(
    public opts: ScriptAbstractOptsType<ITriggers, IState, 'preventClose'>
  ) {
    super();
  }

  init(
    args: ScriptAbstractInitArgsType<ITriggers, 'preventClose', 'init'>
  ): void {}

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

  public update(args: ScriptAbstractUpdateArgsType<ITriggers, 'preventClose'>) {
    const checkReqEvent = this.opts.catchStatus('checkReq');
    if (checkReqEvent.isCatched) {
      this.handleCheck(checkReqEvent.payload);
    }

    const clearEvent = this.opts.catchStatus('clear');
    if (clearEvent.isCatched) {
      this.handleClear();
    }

    const setEvent = this.opts.catchStatus('set');
    if (setEvent.isCatched) {
      this.handleSet(setEvent.payload);
    }
  }
}
