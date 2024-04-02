/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { useReflector } from '@reflexio/react-v1/lib/useReflector';
import { useTrigger } from '@reflexio/react-v1/lib/useTrigger';
import { IState, ITriggers } from 'src/_redux/types';
import { ComposeGrid } from 'src/compose/components/ComposeGrid';
import './styles.less';

export const LettersList = () => {
  const trigger = useTrigger<ITriggers>();

  // const { letters, isLoading } = useSelector((state: IState) => ({
  //   letters: state.letters.lettersList.data,
  //   isLoading: state.letters.lettersList.loading,
  // }));

  const { letters, isLoading } = useReflector<
    ITriggers,
    IState,
    { letters: IState['letters']['lettersList']['data']; isLoading: boolean }
  >(
    (state: IState) => ({
      letters: state.letters.lettersList.data,
      isLoading: state.letters.lettersList.loading,
    }),
    ['lettersList'],
    (payload) => {
      console.log(payload);

      return true;
    }
  );

  React.useEffect(() => {
    trigger('lettersList', 'init', null);
  }, []);

  return (
    <div className='lettersListContainer'>
      <button
        className='lettersListButton'
        onClick={() => trigger('setContent', 'openWindow', { id: '-1' })}
      >
        Create new
      </button>
      <div>
        <ComposeGrid />
      </div>
      {isLoading ? <div className='lettersList'>Loading ...</div> : null}
      <div className='lettersList'>
        {letters && letters.length
          ? letters.map((l) => (
              <div
                className='lettersListItem'
                key={l.uid}
                onClick={() =>
                  trigger('setContent', 'openFromList', {
                    body: l.body,
                    subject: l.subject,
                  })
                }
              >
              {l.subject}{' '}
            </div>
            ))
          : null}
      </div>
    </div>
  );
};
