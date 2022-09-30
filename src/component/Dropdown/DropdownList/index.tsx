import React from 'react';
import classnames from 'classnames';
import { DropdownListProps } from '../interface';
import style from './index.module.scss';

const DropdownList = ({
  ItemOptions,
  selectedIndex,
  onClick
}: DropdownListProps) => {
  return (
    <>
      {ItemOptions.map((text: string, index: number) => {
        const isSelected = index === selectedIndex;
        return (
          <button
            className={classnames(style.dropdown_item)}
            onClick={() => onClick(index)}
            aria-selected={isSelected}
            role="option"
            key={`dropdown-${index}`}
          >
            {text}
          </button>
        );
      })}
    </>
  );
};

export default DropdownList;
