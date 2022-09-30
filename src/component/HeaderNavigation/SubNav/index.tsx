import React from 'react';
import classnames from 'classnames';
import style from './index.module.scss';

export interface SubNavProps {
  /** 커스텀 클래스 */
  className?: string;
  /** 2depth 메뉴 리스트 */
  children?: React.ReactNode;
}

const SubNav = ({ className, children }: SubNavProps) => {
  return (
    <ul className={classnames(style.sub_nav_list, className)}>{children}</ul>
  );
};

export default SubNav;
