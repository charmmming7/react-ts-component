import React from 'react';
import { Link } from '@reach/router';
import classnames from 'classnames';
import { SideMenuItemProps } from '../index';
import IconArrow from 'asset/images/svg/icon_arrow_right.svg';
import style from './index.module.scss';

interface SideMenuItemTotalProps extends SideMenuItemProps {
  /** 2depth 메뉴 리스트 */
  children?: React.ReactNode;
  /** 메뉴 링크 클릭 함수 */
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>
  ) => void;
}

const SideMenuItem = ({
  depth = 1,
  type = 'internal',
  name = '',
  to = '#/',
  isActive = false,
  className = '',
  children,
  onClick
}: SideMenuItemTotalProps) => {
  const isActiveClass = 'is_active';

  const setNavClass = (depth: number) => {
    switch (depth) {
      case 1:
        return style.side_nav_item;
      case 2:
        return style.side_sub_nav_item;
    }
  };

  const setLinkClass = (depth: number) => {
    switch (depth) {
      case 1:
        return style.side_nav_link;
      case 2:
        return style.side_sub_nav_link;
    }
  };

  return (
    <li
      className={classnames(
        setNavClass(depth),
        className,
        isActive ? style[isActiveClass] : ''
      )}
    >
      {type === 'external' ? (
        <a
          href={to}
          className={classnames(setLinkClass(depth))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
          {children && <IconArrow className={style.ico_arrow} />}
        </a>
      ) : (
        <Link to="/#" className={setLinkClass(depth)} onClick={onClick}>
          {name}
          {children && <IconArrow className={style.ico_arrow} />}
        </Link>
      )}
      {children && children}
    </li>
  );
};

export default SideMenuItem;
