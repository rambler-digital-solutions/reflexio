import {isClient} from '../utils';

export class SsrScript {
  constructor(private opts) {}

  private condition;

  public init() {
    const client = isClient();

    if (client) {
      //get state from window object
      //run sync sequence
    } else {
      const state = this.opts.getCurrentState();

      this.opts.customOpts.app.seState(state);
    }
  }

  public update(args) {
    // checkIsReady
    // if(checkIsReady) {
    //     App.commitState()
    // }
  }
}
