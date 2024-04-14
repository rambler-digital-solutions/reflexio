import {TaskQueue} from './TaskQueue';
import type {SystemConfig} from './types';

interface ProcessorOpts {
  propagate: boolean;
}

export class System {
  static instance: System;

  static useSystem() {
    this.instance ??= new System();

    return this.instance;
  }

  public config: SystemConfig = {
    env: 'prod',
  };

  public taksQueue: TaskQueue;

  constructor() {
    this.taksQueue = new TaskQueue();
  }

  public setConfig(conf: SystemConfig) {
    this.config = conf;
  }

  public afterHandlers: Array<any> = [];

  public context: {[triggerer: string]: any} = {};

  private waits: {[triggerer: string]: any} = {};

  private processors: {[triggerer: string]: any} = {};

  private triggerWithoutUid = (name) => name.split(':')[0];

  private triggerUid = (name) => {
    const arr = name.split(':');

    return arr.length > 1 ? arr[1] : null;
  };

  public addWait = (
    trigger: string,
    {resolve, reject, args},
    timeout = 5000,
  ) => {
    const timeOutId = setTimeout(() => {
      if (this.waits[trigger]) {
        this.waits[trigger].reject(`${trigger} TIMEOUT`);
      }
    }, timeout);

    this.waits[trigger] = {resolve, reject, args, id: timeOutId};
  };

  public resolveWait(trigger: string, args) {
    if (this.waits[trigger]) {
      this.waits[trigger].resolve(args);
      clearTimeout(this.waits[trigger].id);
      delete this.waits[trigger];
    }
  }

  public findProcess(trigger: string) {
    return Object.keys(this.context)
      .filter((k) => this.triggerWithoutUid(k) === trigger)
      .map((c) => this.context[c]);
  }

  public upProcess(obj: any, trigger: string, uid?: string) {
    const processName = !uid ? trigger : `${trigger}:${uid}`;

    this.context[processName] = obj;
  }

  public downProcess(trigger: string) {
    Object.keys(this.context)
      .filter((k) => this.triggerWithoutUid(k) === trigger)
      .forEach((c) => delete this.context[c]);
  }

  public findProcessByUid(uid: string) {
    return Object.keys(this.context)
      .filter((k) => this.triggerUid(k) === uid)
      .map((c) => this.context[c]);
  }

  public registerProcessor(trigger: string, opts: ProcessorOpts) {
    this.processors[trigger] = opts;
  }
  public getProcessorInfo(trigger: string): ProcessorOpts | null {
    return this.processors[trigger];
  }
}

export const useSystem = (): System => System.useSystem();
