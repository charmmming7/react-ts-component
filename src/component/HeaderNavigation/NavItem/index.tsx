import React, { useState } from 'react';
import { Link } from '@reach/router';
import classnames from 'classnames';
import style from './index.module.scss';

export interface NavItemProps {
  /** 메뉴 깊이 */
  depth?: number;
  /** 메뉴 타입 (internal: 내부링크, external: 외부링크) */
  type?: string;
  /** 메뉴 텍스트 */
  text: string;
  /** 메뉴 링크 */
  to: string;
  /** 현재 메뉴 선택 여부 */
  isActive?: boolean;
  /** 커스텀 클래스 */
  className?: string;
  /** 2depth 메뉴 리스트 */
  children?: React.ReactNode;
}

const NavItem = ({
  depth = 1,
  type = 'internal',
  text = '',
  to = '#/',
  isActive = false,
  className = '',
  children
}: NavItemProps) => {
  const [isHoverActive, setIsHoverActive] = useState(false);

  const setNavClass = (depth: number) => {
    switch (depth) {
      case 1:
        return style.nav_item;
      case 2:
        return style.sub_nav_item;
    }
  };

  const setLinkClass = (depth: number) => {
    switch (depth) {
      case 1:
        return style.nav_link;
      case 2:
        return style.sub_nav_link;
    }
  };

  const setActiveClass = (isActive: boolean, isHoverActive: boolean) => {
    if (!isActive && !isHoverActive) {
      return '';
    } else {
      return 'is_active';
    }
  };

  const checkOpenType = (
    e: React.MouseEvent<HTMLLIElement> | React.FocusEvent<HTMLLIElement>
  ) => {
    const target = e.currentTarget;
    const nav = target.parentElement?.parentElement as HTMLElement;
    const isOnlySelected = nav.classList.contains('only_selected');
    return isOnlySelected;
  };

  const setActiveItem = (
    e: React.MouseEvent<HTMLLIElement> | React.FocusEvent<HTMLLIElement>
  ) => {
    if (e.currentTarget) {
      setIsHoverActive(true);
      if (checkOpenType(e)) {
        const target = e.currentTarget as HTMLElement;
        if (target.lastElementChild) {
          const subNav = target.lastElementChild as HTMLElement;
          subNav.classList.add('is_active');
        }
      }
    }
  };

  const setInActiveItem = (
    e: React.MouseEvent<HTMLLIElement> | React.FocusEvent<HTMLLIElement>
  ) => {
    if (e.currentTarget) {
      setIsHoverActive(false);
      if (checkOpenType(e)) {
        const target = e.currentTarget as HTMLElement;
        if (target.lastElementChild) {
          const subNav = target.lastElementChild as HTMLElement;
          subNav.classList.remove('is_active');
        }
      }
    }
  };

  return (
    <li
      className={classnames(
        setNavClass(depth),
        setActiveClass(isActive, isHoverActive),
        className
      )}
      onMouseEnter={setActiveItem}
      onMouseLeave={setInActiveItem}
      onFocus={setActiveItem}
      onBlur={setInActiveItem}
    >
      {type === 'external' ? (
        <a
          href={to}
          className={classnames(setLinkClass(depth))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <Link to="/#" className={setLinkClass(depth)}>
          {text}
        </Link>
      )}
      {children}
    </li>
  );
};

export default NavItem;
