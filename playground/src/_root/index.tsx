import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from '../_redux';
import {ErrorBoundary} from '../_components';

import {LettersList} from '../letters/components/LettersList';
import {Notification} from '../notification/components/Notification';
import {Window} from '../popup/components/Window';
import {ReflexProvider} from '../../../react-v1/lib';

/*
 ** In MULD-4 we implement popup window
 ** and mechanism that open popup when close compose without saving
 ** Works with wrong behavior - need to be fixed
 **
 */

/*
 ** In MULD-5 fixed behavior of MULD-4
 **
 */

const Application = () => (
  <ErrorBoundary>
    <ReflexProvider store={store}>
      <Provider store={store}>
        <LettersList />
        <Notification />
        <Window />
      </Provider>
    </ReflexProvider>
  </ErrorBoundary>
);

ReactDOM.render(<Application />, document.getElementById('app'));
