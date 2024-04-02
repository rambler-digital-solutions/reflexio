import {EffectCollection} from './effect-collection';

export class App {
  static instance: App;

  public isReady: boolean;

  private calledState: {};

  static getApp() {
    if (App.instance) {
      return App.instance;
    }

    return new App();
  }

  public setEffectCalledState = (id: string): void => {
    if (!App.instance.calledState[id]) {
      App.instance.calledState[id] = true;
    }
  };

  public getEffectCalledState = (id: string): boolean => {
    return Boolean(App.instance.calledState[id]);
  };

  public effectCollection = new EffectCollection();

  private state: any;

  public commitState(state: any) {
    this.isReady = true;
    this.state = state;
  }

  public getState() {
    return this.state;
  }
}
