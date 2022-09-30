import React, { useState, useRef, useEffect, ReactNodeArray } from 'react';
import classnames from 'classnames';
import AccordionHeader from './AccordionHeader';
import AccordionPanel from './AccordionPanel';
import style from './index.module.scss';

export interface AccordionProps {
  /** 아코디언 id */
  accordionId: string;
  /** 아코디언 버튼 클래스명 */
  className?: string;
  /** 확장할 아코디언 인덱스 */
  initialIndex?: number;
  /** 전체 아코디언 확장 여부 */
  isAllExpanded?: boolean;
  /** children 컨텐츠 (아코디언 패널) */
  children?: React.ReactNode;
}

export interface AccordionItemProps {
  /** 아코디언 id */
  accordionId?: string;
  /** 아코디언 아이템 인덱스 */
  accordionIndex?: number;
  /** 아코디언 버튼 레이블 */
  headerLabel: string;
  /** 아코디언 아이템 확장 여부 */
  isExpanded?: boolean;
  /** children 컨텐츠 (아코디언 패널) */
  children?: React.ReactNode;
  /** 아코디언 버튼 클릭 함수 */
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccordionItem = ({
  accordionId = '',
  accordionIndex = 0,
  headerLabel,
  isExpanded = false,
  handleClick,
  children
}: AccordionItemProps) => {
  return (
    <>
      <div className="accordion_item">
        <AccordionHeader
          panelId={`${accordionId}-panel-${accordionIndex}`}
          label={headerLabel}
          isExpanded={isExpanded}
          onClick={handleClick}
        />
        <AccordionPanel
          accordionId={accordionId}
          isExpanded={isExpanded}
          accordionIndex={accordionIndex}
        >
          {children}
        </AccordionPanel>
      </div>
    </>
  );
};

const AccordionList = ({
  accordionId,
  className,
  initialIndex = -1,
  isAllExpanded = false,
  children
}: AccordionProps) => {
  let isOpen = isAllExpanded;

  const items = (children as ReactNodeArray).filter(
    (item: any) => item.type.name === 'AccordionItem'
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);

  // useRef를 이용해 이전 상태값을 저장할 수 있는 변수 생성
  const prevIndexRef = useRef<number>(0);
  const prevIndex = prevIndexRef.current;

  // selectedIndex의 변경 감지. 변경되었으면 setTabIndex 실행
  if (initialIndex !== prevIndex && initialIndex !== selectedIndex) {
    setSelectedIndex(initialIndex);
  }

  useEffect(() => {
    // 선택된 selectedIndex의 값을 이전 상태로 저장
    prevIndexRef.current = initialIndex;
  });

  return (
    <>
      <div className={classnames(style.accordion, className)}>
        {items.map((props: any, index: number) => {
          if (isAllExpanded) {
            isOpen = true;
          } else {
            isOpen = selectedIndex === index;
          }

          const [isExpanded, setIsExpanded] = useState<boolean>(isOpen);

          // 아코디언 버튼 클릭 시 실행되는 클릭 이벤트
          const changeItem = (isExpanded: boolean, index: number) => {
            setSelectedIndex(index);
            setIsExpanded(!isExpanded);
          };

          const prop = props.props;
          return (
            <AccordionItem
              accordionId={accordionId}
              accordionIndex={index}
              isExpanded={isExpanded}
              headerLabel={prop.headerLabel}
              handleClick={() => changeItem(isExpanded, index)}
              children={prop.children}
              key={`${accordionId}-${index}`}
            />
          );
        })}
      </div>
    </>
  );
};

export { AccordionList, AccordionHeader, AccordionPanel, AccordionItem };
