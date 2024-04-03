import {IState, ITriggers} from 'src/_redux/types';
import {
  InitArgsType,
  ScriptOptsType,
  WatchArgsType,
} from '../../../../core-v1/lib/types';
import {Script} from '../../../../core-v1/lib/Script';
import {
  INotificationState,
  INotificationTriggers,
} from '../notification.config';

export class NotificationScrit extends Script<
  ITriggers,
  IState,
  'showNotification',
  'init',
  number
> {
  constructor(
    public opts: ScriptOptsType<ITriggers, IState, 'showNotification', number>,
  ) {
    super();
  }

  private timeout;

  public init(
    args: InitArgsType<INotificationTriggers, 'showNotification', 'init'>,
  ) {
    this.timeout = setTimeout(() => {
      this.opts.trigger('showNotification', 'close', null);
    }, 2000);
  }

  public watch(args: WatchArgsType<ITriggers, 'showNotification'>) {
    if (args.status === 'close') {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }
}
