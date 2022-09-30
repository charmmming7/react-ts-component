import React from 'react';
import style from './index.module.scss';

export interface TabPanelProps {
  /** 탭 패널 인덱스 */
  index: number;
  /** 탭 id */
  tabsId: string;
  /** 탭 패널 컨텐츠 */
  children?: React.ReactNode;
}

const TabPanel = ({ index, tabsId, children }: TabPanelProps) => {
  return (
    <div
      className={style.tab_panel}
      role="tabpanel"
      id={`${tabsId}-panel-${index}`}
      aria-labelledby={`${tabsId}-tab-${index}`}
    >
      {children}
    </div>
  );
};

export default TabPanel;
