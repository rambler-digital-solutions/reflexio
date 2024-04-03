import React from 'react';
import ReactDOMServer, {
  // type RenderToPipeableStreamOptions,
  type PipeableStream,
} from 'react-dom/server';
import {App} from './core/app';

//import { createSsr, IInitState } from './i-ssr';

interface IState {
  [key: string]: unknown;
}

// interface IServerRenderResultString {
//   html: string;
//   state: IState;
// }

interface IServerRenderResultStream {
  stream: PipeableStream;
  state: IState;
}

// interface IServerRenderOptions<T> {
//   cachedState?: IInitState;

// }

export const serverRender = {
  stream: async <
    _T extends () => void,
  >(): Promise<IServerRenderResultStream> => {
    // opts?: IServerRenderOptions<T>,
    if (typeof ReactDOMServer.renderToPipeableStream === 'undefined') {
      throw new Error('Streaming is available only on React 18 or more');
    }

    const app = App.getApp();
    //const SSR = createSsr(opts?.cachedState);

    const renderStream = (App: React.Element): PipeableStream =>
      ReactDOMServer.renderToPipeableStream(<App />);

    const renderNested = async (): Promise<PipeableStream> => {
      ReactDOMServer.renderToString(<App />);

      const ready = app.isReady;

      if (ready) {
        return renderStream(App);
      }

      if (!ready) {
        await app.effectCollection.runEffects();

        return await renderNested();
      }

      return renderStream(App);
    };

    const stream = await renderNested();

    return {
      state: app.getState(), // app.getState()
      stream,
    };
  },
};
