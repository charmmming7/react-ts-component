import React, { useRef } from 'react';
import classnames from 'classnames';
import NavItem from './NavItem';
import SubNav from './SubNav';
import Logo from '../Logo';
import IconReactLogoSvg from 'asset/images/svg/logo_react.svg';
import style from './index.module.scss';

interface SubNavProps {
  /** 2depth 메뉴명 */
  name: string;
  /** 2depth 메뉴 링크 */
  to: string;
  /** 현재 메뉴 선택 여부 */
  isActive?: boolean;
}
export interface NavProps {
  /** 메뉴 깊이 */
  depth?: number;
  /** 메뉴 타입 (internal: 내부링크, external: 외부링크) */
  type?: string;
  /** 1depth 메뉴명 */
  name: string;
  /** 1depth 메뉴 링크 */
  to: string;
  /** 현재 메뉴 선택 여부 */
  isActive?: boolean;
  /** 커스텀 클래스 */
  className?: string;
  /** 2depth 메뉴 배열 */
  subMenu?: Array<SubNavProps>;
}
export interface HeaderNavigationProps {
  /** 하위 메뉴 오픈 방식 (all: 전체오픈, onlySelected: 선택된 메뉴만 오픈) */
  openType: string;
  /** 메뉴 리스트 배열 */
  menuList: Array<NavProps>;
  /** 커스텀 클래스 */
  className?: string;
}

const HeaderNavigation = ({
  openType = 'all',
  menuList,
  className
}: HeaderNavigationProps) => {
  const navRef = useRef<HTMLElement>(null);

  const setNavActive = () => {
    if (openType === 'all') {
      if (navRef.current) {
        navRef.current.style.height = `${navRef.current.scrollHeight}px`;
      }
    }
  };

  const setNavInActive = () => {
    if (openType === 'all') {
      if (navRef.current) {
        navRef.current.style.height = '';
      }
    }
  };

  return (
    <header className={classnames(style.header, className)}>
      <Logo to="/" text="Home" logoWidth={36} logoHeight={36}>
        <IconReactLogoSvg />
      </Logo>
      <nav
        className={classnames(
          style.nav,
          openType === 'onlySelected' ? 'only_selected' : ''
        )}
        ref={navRef}
        onMouseEnter={setNavActive}
        onMouseLeave={setNavInActive}
        onFocus={setNavActive}
        onBlur={setNavInActive}
      >
        <ul className={style.nav_list}>
          {menuList.map((item: NavProps) => {
            return (
              <NavItem
                text={item.name}
                to={item.to}
                type={item.type}
                isActive={item.isActive}
                key={item.name}
              >
                {item.subMenu && (
                  <SubNav
                    className={
                      openType === 'onlySelected' ? 'only_selected' : ''
                    }
                  >
                    {item.subMenu.map((item: SubNavProps) => {
                      return (
                        <NavItem
                          depth={2}
                          text={item.name}
                          to={item.to}
                          isActive={item.isActive}
                          key={item.name}
                        />
                      );
                    })}
                  </SubNav>
                )}
              </NavItem>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export { HeaderNavigation, NavItem, SubNav };
