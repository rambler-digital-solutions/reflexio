import {
  Script,
  type InitArgsType,
  type ScriptOptsType,
  type WatchArgsType,
} from '@reflexio/core-v1';
import type {IState, ITriggers} from '_redux/types';
import type {IComposeTriggers} from '../compose.config';

export class SubmitLetterScript extends Script<
  ITriggers,
  IState,
  'submitLetter',
  'init',
  null
> {
  public opts: ScriptOptsType<ITriggers, IState, 'submitLetter', null>;

  constructor(opts) {
    super();
    this.opts = opts;
  }

  public async init(
    _args: InitArgsType<IComposeTriggers, 'submitLetter', 'init'>,
  ) {
    const {openedComposeId} = this.opts.getCurrentState().compose;

    // save
    this.opts.trigger('setContent', 'commitFormContent', null); // сохранили данные из локал  в стейт

    const {subject, body} = this.opts.getCurrentState().compose; // читаем стейт

    // start
    this.opts.trigger('saveLetter', 'init', {
      body,
      subject,
      from: 'asapovk@gmail.com',
      to: '',
      uid: 123,
    }); // запускаем скрипт сохранения
    await this.opts.wait('saveLetter', 'done');

    //Here we can throw notification that savedId was just created. For example
    this.opts.trigger('setContent', 'closeWindow', {
      id: openedComposeId,
      noCheck: true,
    }); // дропаем окно
    this.opts.trigger('showNotification', 'init', 'Письмо успешно сохранено'); // кидаем нотификейшн
    // kill instance
    this.opts.drop(); // убиваем инстанс
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public watch(_args: WatchArgsType<IComposeTriggers, 'submitLetter'>) {}
}
