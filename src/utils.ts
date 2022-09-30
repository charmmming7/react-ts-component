import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';

export const createDate = (date: string | Date | number) => {
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return date instanceof Date ? date : new Date(date);
};

/**
 * 날짜를 표시합니다.
 * @param dateString
 * @returns yyyy.MM.dd
 */
export const getDateString = (dateString: string) => {
  const date = createDate(dateString);
  return format(date, 'yyyy.MM.dd');
};

/**
 * 날짜와 시간을 표시합니다.
 * @param dateString
 * @returns yyyy.MM.dd hh:mm
 */
export const getDateTimeString = (dateString: string) => {
  const date = createDate(dateString);
  return format(date, 'yyyy.MM.dd hh:mm');
};

/**
 * 모바일 디바이스 여부를 반환합니다.
 * @returns {true|false} 모바일 디바이스 일 경우 true 반환
 */
export const checkMobileDevice = () => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile);
  }, []);

  return { isMobile };
};
