import React from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import { PaginationLinkProps } from '../index';

const PaginationLink = ({
  type = 'number',
  page,
  href,
  isCurrent = false,
  isDisabled = false,
  className
}: PaginationLinkProps) => {
  const isCurrentClass = 'is_current';

  const linkLabel = (type: string) => {
    switch (type) {
      case 'number':
        return `${page} 페이지로 가기`;
      case 'prev':
        return '이전 페이지로 가기';
      case 'next':
        return '다음 페이지로 가기';
      case 'first':
        return '첫 페이지로 가기';
      case 'last':
        return '마지막 페이지로 가기';
    }
  };

  return (
    <li
      className={classnames(
        style.pagination_item,
        style['pagination_item_' + type],
        isCurrent && style[isCurrentClass],
        className
      )}
    >
      <a href={href} aria-label={linkLabel(type)} aria-disabled={isDisabled}>
        {page}
      </a>
    </li>
  );
};

export default PaginationLink;
