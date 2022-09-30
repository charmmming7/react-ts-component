import React from 'react';
import { checkMobileDevice } from '../../utils';
import { SideMenu } from '../SideMenu';
import { HeaderNavigation, NavProps } from '../HeaderNavigation';
export interface HeaderProps {
  /** 사이드메뉴 레이어 오픈 방향 (left|right) */
  position: string;
  /** 헤더네비게이션 하위 메뉴 오픈 방식 (all[default]: 전체오픈, onlySelected: 선택된 메뉴만 오픈) */
  openType: string;
  /** 메뉴 리스트 */
  menuList: Array<NavProps>;
  /** PC 헤더 커스텀 클래스 */
  classNamePc?: string;
  /** MO 헤더 커스텀 클래스 */
  classNameMo?: string;
}

const Header = ({
  openType,
  position,
  menuList,
  classNamePc,
  classNameMo
}: HeaderProps) => {
  const { isMobile } = checkMobileDevice();
  return (
    <>
      {isMobile ? (
        <>
          {/* Mobile Header */}
          <SideMenu
            position={position}
            menuList={menuList}
            className={classNameMo}
          />
        </>
      ) : (
        <>
          {/* PC Header */}
          <HeaderNavigation
            openType={openType}
            menuList={menuList}
            className={classNamePc}
          />
        </>
      )}
    </>
  );
};

export { Header };
