import React from 'react';
import { Link } from '@reach/router';
import style from './index.module.scss';
export interface LogoProps {
  /** 로고 텍스트 */
  text: string;
  /** 링크 URL */
  to: string;
  /** 로고 너비 */
  logoWidth?: number;
  /** 로고 높이 */
  logoHeight?: number;
  /** 로고 이미지 */
  children: React.ReactNode;
}

const Logo = ({ text, to, logoWidth, logoHeight, children }: LogoProps) => {
  const logoStyle = {
    '--width': `${logoWidth}px`,
    '--height': `${logoHeight}px`
  } as React.CSSProperties;

  return (
    <Link to={to} aria-label={text} className={style.logo} style={logoStyle}>
      {children}
    </Link>
  );
};

export default Logo;
