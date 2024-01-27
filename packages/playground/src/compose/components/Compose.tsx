import * as React from 'react';
import { useSelector } from 'react-redux';
import { IState, ITriggers } from '../../_redux/types';
import { useTrigger } from 'src/_redux/useTrigger';
import { ComposeWrapper } from './ComposeWrapper';
import './Compose.less';
import { PopupComposeContent } from './PopupComposeContent';
import { useReflector } from '../../../../v1-react/lib/useReflector';

export const Compose = () => {
  const { subject, to, from, body } = useReflector(
    (state: IState) => state.compose,
    ['setContent']
  );
  const trigger = useTrigger();

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
