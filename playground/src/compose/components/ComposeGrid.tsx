import * as React from 'react';

import {useReflector, useTrigger} from '@reflexio/react-v1';
import type {IState, ITriggers} from '../../_redux/types';
import {Compose} from './Compose';
import {ComposeWrapper} from './ComposeWrapper';
import './ComposeGrid.less';

const ComposePanel = ({
  composeItems,
  onOpen,
  // onDrop,
}: {
  composeItems: Array<{
    id: string;
    subject: string | null;
  }>;
  onOpen: (id: string) => void;
  onDrop: (id: string) => void;
}) => (
  <div className={'composeButtonGrid'}>
    {composeItems.map((ci) => (
      <div key={ci.id} className={'composeButtonGridButtonWrap'}>
        <button
          className="btn"
          onClick={() => onOpen(ci.id)} // openWindow
        >
          <span className={'btnText'}>{ci.subject || '(Без темы)'}</span>
        </button>
      </div>
    ))}
  </div>
);

export const ComposeGrid = () => {
  const {items, opened} = useReflector<
    ITriggers,
    IState,
    {items: IState['compose']['composeItems']; opened: string}
  >(
    (state) => ({
      items: state.compose.composeItems,
      opened: state.compose.openedComposeId,
    }),
    ['setContent'],
  );
  const trigger = useTrigger<ITriggers>();

  //composeItems  from redux
  // openedComposeId from redux

  if (!opened) {
    return (
      <ComposePanel
        composeItems={items}
        onOpen={(id) => trigger('setContent', 'openWindow', {id})}
        onDrop={(id) => trigger('setContent', 'closeWindow', {id})}
      />
    );
  }

  return (
    <ComposeWrapper
      onClick={() => trigger('setContent', 'openWindow', {id: null})}>
      {items
        .filter((a) => a.id === opened)
        .map((c, i) => (
          <Compose key={i} />
        ))}
    </ComposeWrapper>
  );
};
