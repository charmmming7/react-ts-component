import React from 'react';
import classnames from 'classnames';
import style from './index.module.scss';

export interface TabProps {
  /** 탭 버튼 클래스명 */
  className?: string;
  /** 탭 버튼 id */
  tabId: string;
  /** 연결된 탭 패널 id */
  panelId: string;
  /** 탭 버튼 인덱스 */
  index: number;
  /** 탭 버튼 레이블 */
  label: string;
  /** 탭 버튼 선택 여부 */
  isSelected: boolean;
  /** 탭 버튼 클릭 함수 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tab = ({
  className,
  tabId,
  panelId,
  index,
  label,
  isSelected = false,
  onClick
}: TabProps) => {
  return (
    <li
      className={classnames(style.tab_item, className)}
      role="presentation"
      key={`${tabId}-${index}`}
    >
      <button
        className={style.tab_link}
        role="tab"
        id={tabId}
        aria-selected={isSelected}
        aria-controls={`${panelId}`}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
};

export default Tab;
