import React from 'react';
import style from './index.module.scss';
import IconArrow from '../../../asset/images/svg/icon_arrow_down.svg';

export interface AccordionHeaderProps {
  /** 연결된 아코디언 패널 id */
  panelId: string;
  /** 아코디언 버튼 레이블 */
  label: string;
  /** 아코디언 버튼 확장 여부 */
  isExpanded: boolean;
  /** 아코디언 버튼 클릭 함수 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AccordionHeader = ({
  label,
  panelId,
  isExpanded = false,
  onClick
}: AccordionHeaderProps) => {
  return (
    <button
      type="button"
      className={style.accordion_header}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      onClick={onClick}
    >
      <IconArrow className={style.accordion_icon} />
      {label}
    </button>
  );
};

export default AccordionHeader;
