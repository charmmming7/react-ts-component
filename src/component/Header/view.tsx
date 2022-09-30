import React from 'react';
import { HeaderProps, Header } from './index';

const SampleHeader = ({
  openType,
  position,
  menuList,
  classNamePc,
  classNameMo = 'header_mo'
}: HeaderProps) => {
  return (
    <Header
      openType={openType}
      position={position}
      menuList={menuList}
      classNamePc={classNamePc}
      classNameMo={classNameMo}
    />
  );
};

export default SampleHeader;
