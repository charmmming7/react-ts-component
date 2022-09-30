import React, { useState, useRef, useEffect } from 'react';
import Tab from './Tab';
import TabPanel from './TabPanel';
import style from './index.module.scss';

export interface TabsProps {
  /** 탭 id */
  tabsId: string;
  /** 선택된 탭 인덱스 */
  initialIndex?: number;
  /** 탭 레이블 리스트 */
  tabLabelList: string[];
  /** children 컨텐츠 (탭 패널) */
  children: React.ReactNode[];
}

const Tabs = ({
  tabsId,
  initialIndex = 0,
  tabLabelList,
  children
}: TabsProps) => {
  const tabRef = useRef<HTMLUListElement>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);

  // 선택된 탭 인덱스
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  // useRef를 이용해 이전 상태값을 저장할 수 있는 변수 생성
  const prevIndexRef = useRef<number>(0);
  const prevIndex = prevIndexRef.current;

  // selectedIndex의 변경 감지. 변경되었으면 setTabIndex 실행
  if (initialIndex !== prevIndex && initialIndex !== selectedIndex) {
    setSelectedIndex(initialIndex);
  }

  // 탭바 위치, 넓이 저장 함수
  const setTabBarInfo = (left: number, width: number) => {
    tabBarRef.current
      ? (tabBarRef.current.style.transform = `translateX(${left}px)`)
      : null;
    tabBarRef.current ? (tabBarRef.current.style.width = `${width}px`) : null;
  };

  useEffect(() => {
    // 선택된 selectedIndex의 값을 이전 상태로 저장
    prevIndexRef.current = initialIndex;

    if (tabRef.current) {
      const childEl = tabRef.current.children[selectedIndex] as HTMLElement;
      const tabBarRefWidth = childEl.clientWidth;
      const tabBarRefLeft = childEl.offsetLeft;
      setTabBarInfo(tabBarRefLeft, tabBarRefWidth);
    }
  });

  return (
    <>
      <div className={style.tab}>
        <div className={style.tab_list}>
          <ul role="tablist" ref={tabRef}>
            {tabLabelList.map((item: string, index: number) => {
              const isSelected = index === selectedIndex;
              return (
                <Tab
                  tabId={`${tabsId}-tab-${index}`}
                  panelId={`${tabsId}-panel-${index}`}
                  index={index}
                  isSelected={isSelected}
                  label={item}
                  onClick={(e) => setSelectedIndex(index)}
                  key={`${tabsId}-tab-${index}`}
                />
              );
            })}
          </ul>
          <div className={style.tab_bar} ref={tabBarRef} />
        </div>
        {children.map((item: React.ReactNode, index: number) => {
          const isSelected = index === selectedIndex;
          if (isSelected) {
            return item;
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

export { Tabs, Tab, TabPanel };
