import * as React from 'react'
import { useSelector } from 'react-redux';
import { IState } from 'src/_redux/types';
import { useTrigger } from 'src/_redux/useTrigger';
import { Compose } from './Compose';
import  './ComposeGrid.less'; 
import { ComposeWrapper } from './ComposeWrapper';

const ComposePanel = ({
    composeItems,
    onOpen,
    onDrop,
  }: {
    composeItems: Array<{
      id: string;
      subject: string | null;
    }>;
    onOpen: (id: string) => void;
    onDrop: (id: string) => void;
  }) => {
  

    return (
      <div className={'composeButtonGrid'} >
        {composeItems.map((ci, i) => (
          <div key={ci.id} className={'composeButtonGridButtonWrap'}>
            <button
              className='btn'
              onClick={() => onOpen(ci.id)} // openWindow
            >
              <span className={'btnText'}>{ci.subject || '(Без темы)'}</span>
            </button>
          </div>
        ))}
      </div>
    );
  };


export const ComposeGrid = () => {

  const { items, opened } = useSelector(
    (state: IState ) => ({
        items: state.compose.composeItems,
        opened: state.compose.openedComposeId,
  }))
  const trigger = useTrigger();


    //composeItems  from redux
    // openedComposeId from redux

    if (!opened) {
  
      return (
        <ComposePanel
          composeItems={items}
          onOpen={(id,) => trigger('setContent', 'openWindow', {id})}
          onDrop={(id) => trigger('setContent', 'closeWindow', {id})}
        />
      );
    }

    
   return (
            <ComposeWrapper onClick={()=> trigger('setContent', 'openWindow', {id: null})}>
            {items
            .filter((a) => a.id === opened)
            .map((c) => <Compose/>)
            }
            </ComposeWrapper>
   )
}