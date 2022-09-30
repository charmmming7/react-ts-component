import React, { useRef, useState, useEffect } from 'react';
import classnames from 'classnames';
import { SelectedInfoProps, DropdownProps } from './interface';
import DropdownList from './DropdownList';
import IconArrow from '../../asset/images/svg/icon_arrow_right.svg';
import style from './index.module.scss';

const Dropdown = ({
  ItemOptions,
  placeholder = '선택하세요',
  initialIndex = -1,
  isDisabled = false,
  className
}: DropdownProps) => {
  const isOpenClass = 'is_open';
  const isDisablClass = 'is_disabled';

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [height, setHeight] = useState<number>(0);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfoProps>({
    text: placeholder,
    index: initialIndex
  });
  // 선택된 탭 인덱스
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);

  // useRef를 이용해 이전 상태값을 저장할 수 있는 변수 생성
  const prevIndexRef = useRef<number>(0);
  const prevIndex = prevIndexRef.current;

  // selectedIndex의 변경 감지. 변경되었으면 setTabIndex 실행
  if (initialIndex !== prevIndex && initialIndex !== selectedIndex) {
    setSelectedIndex(initialIndex);
  }

  const setDropdowBtnInfo = (index: number) => {
    const ElbtnText = dropdownRef.current?.firstChild
      ?.firstChild as HTMLElement;
    const target = dropdownRef.current?.lastChild?.childNodes[
      index
    ] as HTMLElement;
    const text = target.innerText;
    ElbtnText.innerText = target.innerText;
    setSelectedInfo({ text, index });
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as Element;
    const btn = dropdownRef.current?.firstChild as Element;
    if (dropdownRef.current && !dropdownRef.current.contains(target)) {
      // click outside
      setOpen(false);
    } else {
      // click inside
      if (!target.contains(btn) || target !== btn) {
        setOpen(false);
      }
    }
  };

  const setMenuHeight = (isOpen: boolean) => {
    if (dropdownRef.current) {
      const target = dropdownRef.current?.lastChild as HTMLElement;
      if (isOpen) {
        setHeight(target.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  };

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (selectedIndex !== -1) setDropdowBtnInfo(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    // 선택된 selectedIndex의 값을 이전 상태로 저장
    prevIndexRef.current = initialIndex;

    setMenuHeight(isOpen);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div
      className={classnames(
        style.dropdown,
        className,
        isOpen && style[isOpenClass],
        isDisabled && style[isDisablClass]
      )}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={style.btn}
        onClick={() => setOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-controls="dropdown_list"
        aria-expanded={isOpen}
        role="combobox"
      >
        {selectedInfo.text}
        <IconArrow className={style.ico_arrow} />
      </button>

      <div
        id="dropdown_list"
        className={classnames(style.dropdown_box, isOpen && style[isOpenClass])}
        role="listbox"
        tabIndex={-1}
        style={{ height: `${height}px` }}
      >
        <DropdownList
          ItemOptions={ItemOptions}
          selectedIndex={selectedIndex}
          onClick={(index) => setSelectedIndex(index)}
        />
      </div>
    </div>
  );
};

export { Dropdown, DropdownList };
