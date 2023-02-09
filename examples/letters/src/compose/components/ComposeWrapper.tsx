import React, { Fragment, useEffect, useRef, useState } from 'react';
import  './ComposeGrid.less';

export const ComposeWrapper = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <div
    onClick={(e) => {
      if ((e.target as HTMLDivElement).dataset.wrapper) {
        onClick();
      }
    }}
    data-wrapper
    className={'popupWrapper'}
  >
    {children}
  </div>
);
