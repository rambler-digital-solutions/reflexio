import * as React from 'react';
import { IState, ITriggers } from '../../_redux/types';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { ComposeWrapper } from './ComposeWrapper';
import './Compose.less';
import { PopupComposeContent } from './PopupComposeContent';

export const Compose = () => {
  const { subject, to, from, body } = useReflector<
    ITriggers,
    IState,
    IState['compose']
  >((state: IState) => state.compose, ['setContent']);
  const trigger = useTrigger<ITriggers>();

  React.useEffect(() => {
    trigger('openPopup', 'init', <PopupComposeContent />);
  }, []);

  return (
    <div className='popupwindow'>
      <div className='root'>
        <div className='composeWrap'>
          <div className='subject'>
            <input
              defaultValue={subject}
              name='Subject'
              className='textInput'
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
            name='Body'
            onChange={(e) =>
              trigger('setContent', 'syncForm', {
                input: 'body',
                text: e.target.value,
              })
            }
            className='body'
          />
        </div>
        <div className='composeButtonsGroup'>
          <button
            className='composeButtonsGroupItm'
            onClick={() => trigger('submitLetter', 'init', null)}
          >
            Сохранить
          </button>
          <button
            className='composeButtonsGroupItm'
            onClick={() => trigger('setContent', 'closeWindow', null)}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
