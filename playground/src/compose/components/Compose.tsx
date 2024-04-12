import * as React from 'react';
import {useReflector, useTrigger} from '@reflexio/react-v1';
import type {IState, ITriggers} from '../../_redux/types';
import {PopupComposeContent} from './PopupComposeContent';
import './Compose.less';

export const Compose = () => {
  const {subject, body} = useReflector<ITriggers, IState, IState['compose']>(
    (state: IState) => state.compose,
    ['setContent'],
  );
  const trigger = useTrigger<ITriggers>();

  React.useEffect(() => {
    trigger('openPopup', 'init', <PopupComposeContent />);
  }, []);

  return (
    <div className="popupwindow">
      <div className="root">
        <div className="composeWrap">
          <div className="subject">
            <input
              defaultValue={subject}
              name="Subject"
              className="textInput"
              onChange={(e) =>
                trigger('setContent', 'syncForm', {
                  input: 'subject',
                  text: e.target.value,
                })
              }
            />
          </div>
          <textarea
            defaultValue={body}
            name="Body"
            onChange={(e) =>
              trigger('setContent', 'syncForm', {
                input: 'body',
                text: e.target.value,
              })
            }
            className="body"
          />
        </div>
        <div className="composeButtonsGroup">
          <button
            className="composeButtonsGroupItm"
            onClick={() => trigger('submitLetter', 'init', null)}>
            Сохранить
          </button>
          <button
            className="composeButtonsGroupItm"
            onClick={() => trigger('setContent', 'closeWindow', null)}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
