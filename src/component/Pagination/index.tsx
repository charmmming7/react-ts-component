import React, { useState, useRef, useEffect } from 'react';
import style from './index.module.scss';
import PaginationLink from './PaginationLink';

export interface PaginationLinkProps {
  /** 페이지네이션 버튼 타입 (number, prev, next, first, last) */
  type?: string;
  /** 페이지 넘버 */
  page?: number;
  /** 페이지 링크 */
  href?: string;
  /** 현재 페이지 여부 */
  isCurrent?: boolean;
  /** 페이지네이션 버튼 선택 불가 여부 */
  isDisabled?: boolean;
  /** 커스텀 클래스명*/
  className?: string;
}

export interface PaginationProps {
  /** 전체 페이지 */
  totalPage: number;
  /** 현재 선택된 페이지 */
  currentPage?: number;
}

const Pagination = ({ totalPage = 1, currentPage = 1 }: PaginationProps) => {
  if (currentPage > totalPage) currentPage = totalPage;
  if (currentPage < 1) currentPage = 1;
  if (totalPage < 1) totalPage = 1;

  const [current, setCurrent] = useState(currentPage); // 현재 페이지
  const currentPageList = []; // 화면에 보여질 페이지 그룹 리스트

  // useRef를 이용해 이전 상태값을 저장할 수 있는 변수 생성
  const prevIndexRef = useRef<number>(1);
  const prevIndex = prevIndexRef.current;

  // currentPage의 변경 감지
  if (currentPage !== prevIndex && currentPage !== current) {
    setCurrent(currentPage);
  }

  useEffect(() => {
    // 선택된 currentPage 값을 이전 상태로 저장
    prevIndexRef.current = currentPage;
  });

  const createHref = (page: number) => {
    let href;
    if (page !== current && page >= 1 && page <= totalPage) {
      const url = new URL(location.href);
      const searchParams = url.searchParams;
      searchParams.set('page', String(page));
      href = url.href;
    }
    return href;
  };

  const pageGroup = Math.ceil(current / 10); // 화면에 보여질 페이지 그룹
  let first = pageGroup; // 화면에 보여질 첫번째 페이지
  let last = pageGroup * 10;
  if (last > totalPage) last = totalPage;
  if (first > 1) first = (first - 1) * 10 + 1;

  for (let i = first; i <= last; i++) {
    const isCurrent = current === i;
    currentPageList.push(
      <PaginationLink
        page={i}
        isCurrent={isCurrent}
        isDisabled={isCurrent && true}
        href={createHref(i)}
        key={`pagination_${i}`}
      />
    );
  }

  const prevPager = (
    <PaginationLink
      type="prev"
      isDisabled={current === 1}
      href={createHref(current - 1)}
      key="pagination_prev"
    />
  );
  const nextPager = (
    <PaginationLink
      type="next"
      isDisabled={current === totalPage}
      href={createHref(current + 1)}
      key="pagination_next"
    />
  );
  const firstPager = (
    <PaginationLink
      type="first"
      isDisabled={current === 1}
      href={createHref(1)}
      key="pagination_first"
    />
  );
  const lastPager = (
    <PaginationLink
      type="last"
      isDisabled={current === totalPage}
      href={createHref(totalPage)}
      key="pagination_last"
    />
  );

  currentPageList.unshift(firstPager, prevPager);
  currentPageList.push(nextPager, lastPager);

  return (
    <nav
      className={style.pagination}
      role="navigation"
      aria-label="페이지 선택"
    >
      <ul className={style.pagination_list}>{currentPageList}</ul>
    </nav>
  );
};

export { Pagination, PaginationLink };
