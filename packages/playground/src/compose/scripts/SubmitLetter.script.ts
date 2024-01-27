/* eslint-disable @typescript-eslint/no-empty-function */
import {
  InitArgsType,
  ScriptOptsType,
  WatchArgsType,
} from '../../../../core-v1/lib/types';
import { IState, ITriggers } from 'src/_redux/types';
import { IComposeTriggers } from '../compose.config';
import { Script } from '../../../../core-v1/lib/interfaces/IScript';

export class SubmitLetterScript extends Script<
  ITriggers,
  IState,
  'submitLetter',
  'init',
  {}
> {
  constructor(public opts: ScriptOptsType<ITriggers, IState, 'submitLetter'>) {
    super();
  }

  public async init(
    args: InitArgsType<IComposeTriggers, 'submitLetter', 'init'>
  ) {
    const { openedComposeId } = this.opts.getCurrentState().compose;
    // save
    this.opts.trigger('setContent', 'commitFormContent', null); // сохранили данные из локал  в стейт
    const { subject, body } = this.opts.getCurrentState().compose; // читаем стейт
    // start
    this.opts.trigger('saveLetter', 'init', {
      body: body,
      subject: subject,
      from: 'asapovk@gmail.com',
      to: '',
      uid: 123,
    }); // запускаем скрипт сохранения
    const savedId = await this.opts.wait('saveLetter', 'done');
    //Here we can throw notification that savedId was just created. For example
    this.opts.trigger('setContent', 'closeWindow', {
      id: openedComposeId,
      noCheck: true,
    }); // дропаем окно
    this.opts.trigger('showNotification', 'init', 'Письмо успешно сохранено'); // кидаем нотификейшн
    // kill instance
    this.opts.drop(); // убиваем инстанс
  }

  public watch(args: WatchArgsType<IComposeTriggers, 'submitLetter'>) {}
}
