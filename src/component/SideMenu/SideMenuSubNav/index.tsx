import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';

interface SideMenuSubNavProps {
  /** 커스텀 클래스 */
  className?: string;
  /** 2depth 메뉴 리스트 */
  children?: React.ReactNode;
  /** 현재 메뉴 선택 여부 */
  isActive?: boolean;
  /** 전체 메뉴 닫힘 여부 */
  isOpen?: boolean;
}

const SideMenuSubNav = ({
  className,
  children,
  isActive = false,
  isOpen = false
}: SideMenuSubNavProps) => {

  const subNavRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number>(0);

  const setSunNavHeight = (isOpen: boolean, isActive: boolean) => {
    if (subNavRef.current) {
      if (isOpen) {
        setHeight(isActive ? subNavRef.current.scrollHeight : 0);
      } else {
        setTimeout(function () {
          setHeight(0);
        }, 300)
      }
    }
  };

  useEffect(() => {
    setSunNavHeight(isOpen, isActive);
  });

  return (
    <ul
      className={classnames(
        style.side_sub_nav_list,
        className
      )}
      aria-hidden={!isActive}
      style={{ height: `${height}px` }}
      ref={subNavRef}
    >
      {children}
    </ul>
  );
};

export default SideMenuSubNav;
