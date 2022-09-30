import React, { useRef, useState, useEffect } from 'react';
import style from './index.module.scss';

export interface AccordionPanelProps {
  /** 아코디언 id */
  accordionId: string;
  /** 아코디언 인덱스 */
  accordionIndex: number;
  /** 아코디언 패널 확장 여부 */
  isExpanded: boolean;
  /** 아코디언 패널 컨텐츠 */
  children: React.ReactNode;
}

const AccordionPanel = ({
  accordionId,
  accordionIndex,
  isExpanded = false,
  children
}: AccordionPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number>(0);

  const setPanelState = (isExpanded: boolean) => {
    if (panelRef.current) {
      setHeight(isExpanded ? panelRef.current.scrollHeight : 0);
    }
  };

  useEffect(() => {
    setPanelState(isExpanded);
  });

  return (
    <>
      <div
        ref={panelRef}
        className={style.accordion_panel}
        id={`${accordionId}-panel-${accordionIndex}`}
        aria-hidden={!isExpanded}
        style={{ height: `${height}px` }}
      >
        {children}
      </div>
    </>
  );
};

export default AccordionPanel;
