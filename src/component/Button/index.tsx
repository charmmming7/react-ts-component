import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import IconSearch from 'asset/images/svg/icon_search.svg';
import IconTrash from 'asset/images/svg/icon_trash.svg';

export interface ButtonProps {
  /** 버튼 레이블 */
  label: string;
  /** 버튼 타입 */
  type: string;
  /** 비활성화 여부 */
  isDisabled?: boolean;
  /** block 스타일 제어 */
  isBlock?: boolean;
  /** 아이콘 유형 */
  iconType?: string;
  /** 클릭 이벤트 함수 */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function IconUI({
  iconType,
  className
}: {
  iconType: string;
  className?: string;
}) {
  return (
    <>
      {iconType === 'search' && <IconSearch className={className} />}
      {iconType === 'delete' && <IconTrash className={className} />}
    </>
  );
}

const Button = ({
  type = 'default',
  label,
  isDisabled = false,
  isBlock = false,
  iconType = 'none',
  onClick
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classnames(
        style.btn,
        type !== 'default' && style[`is_${type}`],
        isBlock && style[`is_block`]
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {iconType && iconType !== 'none' && <IconUI iconType={iconType} />}
      <span className={style.btn_label}>{label}</span>
    </button>
  );
};

export default Button;
