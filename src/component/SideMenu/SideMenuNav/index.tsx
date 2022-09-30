import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import SideMenuItem from '../SideMenuItem';
import SideMenuSubNav from '../SideMenuSubNav';
import {
  SideMenuItemProps,
  SideMenuSubNavProps,
  SideMenuNavProps
} from '../index';
import Logo from '../../Logo';
import IconLogo from 'asset/images/svg/logo_react.svg';
import IconClose from 'asset/images/svg/icon_close.svg';
import style from './index.module.scss';

const SideMenuNav = ({
  position,
  menuList,
  isOpen,
  handleCloseClick
}: SideMenuNavProps) => {
  // 초기 선택된 메뉴 인덱스
  let initialIndex = 0;

  const isActiveClass = 'is_active';
  const isRightClass = 'is_right';
  const isOpenClass = 'is_open';
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);
  const [isExpanded, setIsExpanded] = useState<boolean>(isOpen);

  menuList.forEach(function (value: SideMenuItemProps, index: number) {
    if (value.isActive) initialIndex = index;
  });

  const handleClick = (
    isExpanded: boolean,
    index: number,
    e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>
  ) => {
    setSelectedIndex(index);
    setIsExpanded(!isExpanded);

    if (selectedIndex === index) {
      setIsExpanded(!isExpanded);
    } else {
      const hasActiveClass = e.currentTarget.parentElement?.classList.contains(
        isActiveClass
      );
      setIsExpanded(!hasActiveClass);
    }
  };

  useEffect(() => {
    if (!isOpen) setIsExpanded(false);
  });

  return (
    <nav
      className={classnames(
        style.side_nav,
        position === 'right' ? style[isRightClass] : '',
        isOpen ? style[isOpenClass] : ''
      )}
    >
      {/* nav 헤더 */}
      <div className={style.side_nav_header}>
        <Logo to="/" text="Hivelab" logoWidth={36} logoHeight={36}>
          <IconLogo />
        </Logo>
        <button
          type="button"
          className={style.btn_close}
          onClick={handleCloseClick}
        >
          <IconClose />
        </button>
      </div>

      {/* nav 리스트 */}
      <ul className={style.side_nav_list}>
        {menuList.map((item: SideMenuItemProps, index: number) => {
          const isSelectedItemOpen = selectedIndex === index && isExpanded;
          return (
            <SideMenuItem
              name={item.name}
              to={item.to}
              type={item.type}
              isActive={isSelectedItemOpen}
              key={'depth1-' + item.name}
              onClick={(e) => handleClick(isExpanded, index, e)}
            >
              {item.subMenu && (
                <SideMenuSubNav isActive={isSelectedItemOpen} isOpen={isOpen}>
                  {item.subMenu.map((item: SideMenuSubNavProps) => {
                    return (
                      <SideMenuItem
                        depth={2}
                        name={item.name}
                        to={item.to}
                        isActive={item.isActive}
                        key={'depth2-' + item.name}
                      />
                    );
                  })}
                </SideMenuSubNav>
              )}
            </SideMenuItem>
          );
        })}
      </ul>
    </nav>
  );
};

export { SideMenuNav };
