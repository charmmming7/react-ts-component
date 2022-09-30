import React, { useState } from 'react';
import classnames from 'classnames';
import SideMenuItem from './SideMenuItem';
import SideMenuSubNav from './SideMenuSubNav';
import { SideMenuNav } from './SideMenuNav';
import Logo from '../Logo';
import IconHamburger from 'asset/images/svg/icon_hamburger.svg';
import IconLogo from 'asset/images/svg/logo_react.svg';
import style from './index.module.scss';

export interface SideMenuItemProps {
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
  subMenu?: Array<SideMenuSubNavProps>;
}

export interface SideMenuSubNavProps {
  /** 2depth 메뉴명 */
  name: string;
  /** 2depth 메뉴 링크 */
  to: string;
  /** 현재 메뉴 선택 여부 */
  isActive?: boolean;
}

export interface SideMenuNavProps {
  /** 사이드 메뉴 레이어 오픈 방향 (left|right) */
  position: string;
  /** 메뉴 리스트 배열 */
  menuList: Array<SideMenuItemProps>;
  /** 사이드 메뉴 레이어 오픈 여부 */
  isOpen: boolean;
  /** 메뉴 닫기버튼 클릭 함수 */
  handleCloseClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface SideNavProps {
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
  subMenu?: Array<SideMenuSubNavProps>;
}

export interface SideMenuProps {
  /** 사이드 메뉴 레이어 오픈 방향 (left|right) */
  position: string;
  /** 메뉴 리스트 배열 */
  menuList: Array<SideNavProps>;
  /** 커스텀 클래스 */
  className?: string;
}

const SideMenu = ({
  position = 'left',
  menuList,
  className
}: SideMenuProps) => {
  const isOpenClass = 'is_open';
  const [isOpen, setIsOpen] = useState(false);
  const menuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget) {
      setIsOpen(true);
    }
  };

  const menuClose = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <header
        className={classnames(
          style.side_menu,
          isOpen ? style[isOpenClass] : '',
          className
        )}
      >
        {/* 로고 */}
        <Logo to="/" text="Hivelab" logoWidth={36} logoHeight={36}>
          <IconLogo />
        </Logo>

        {/* 햄버거 버튼 */}
        <button
          type="button"
          className={style.btn_hamburger}
          onClick={menuOpen}
          aria-label="전체메뉴 열기"
        >
          <IconHamburger />
        </button>

        {/* 메뉴 네비게이션 */}
        <SideMenuNav
          position={position}
          menuList={menuList}
          isOpen={isOpen}
          handleCloseClick={menuClose}
        />

        {/* 딤 레이어 */}
        <div
          className={style.side_menu_dim}
          onClick={menuClose}
          aria-hidden="true"
        />
      </header>
    </>
  );
};

export { SideMenuItem, SideMenuSubNav, SideMenuNav, SideMenu };
