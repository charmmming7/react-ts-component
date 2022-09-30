export interface SelectedInfoProps {
  /** 선택된 드롭다운 메뉴의 텍스트  */
  text: string;
  /** 선택된 드롭다운 메뉴의 인덱스  */
  index: number;
}

export interface DropdownListProps {
  /** 드롭다운 메뉴 리스트 */
  ItemOptions: string[];
  /** 선택된 드롭다운 메뉴의 인덱스  */
  selectedIndex: number;
  /** 드롭다운 메뉴 열림 여부 */
  isOpen?: boolean;
  /** 드롭다운 메뉴 클릭함수 */
  onClick: (index: number) => void;
}

export interface DropdownProps {
  /** 드롭다운 메뉴 리스트 */
  ItemOptions: string[];
  /** 드롭다운 선택 전 기본 텍스트 */
  placeholder?: string;
  /** 선택된 드롭다운 메뉴의 인덱스  */
  initialIndex?: number;
  /** 비활성 상태 여부 */
  isDisabled?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
}
