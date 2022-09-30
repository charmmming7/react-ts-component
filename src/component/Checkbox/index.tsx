/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import style from './index.module.scss';

export interface CheckboxProps {
  /** 체크박스 id */
  id: string;
  /** 체크박스 name */
  name?: string;
  /** 외부 레이블과 연결할 id */
  externalLabelId?: string;
  /** 체크박스 레이블 */
  label?: string;
  /** 비활성화 여부 */
  isDisabled?: boolean;
  /** 컴포넌트 내부 레이블 유무 */
  hasLabel: boolean;
}

const Checkbox = ({
  hasLabel = true,
  id,
  name,
  externalLabelId,
  label,
  isDisabled = false
}: CheckboxProps) => {
  return (
    <span className={style.checkbox}>
      {hasLabel ? (
        <>
          {/* Default Type */}
          <input
            type="checkbox"
            id={id}
            name={name}
            disabled={isDisabled}
            className={style.checkbox_input}
          />
          <label htmlFor={id} className={style.checkbox_label}>
            {label}
          </label>
        </>
      ) : (
        <>
          {/* External Label Type (외부 레이블 연결) */}
          <input
            type="checkbox"
            id={id}
            name={name}
            disabled={isDisabled}
            className={style.checkbox_input}
            aria-labelledby={externalLabelId}
          />
          <label htmlFor={id} className={style.checkbox_label} />
        </>
      )}
    </span>
  );
};

export default Checkbox;
