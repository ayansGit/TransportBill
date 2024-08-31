import {useCallback, useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {getDateTimeForSeconds} from '../utils';
import {getTrackingTime, setTrackingTime} from '../../../utils/tracking';

export const useTimer = () => {
  //   const [timeCount, setTimeCount] = useState(0);
  let timeCount = 0;
  const [time, setTime] = useState(getDateTimeForSeconds(0));
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now() - timeCount * 1000;
    intervalRef.current = setInterval(() => {
      let timeInSecond = Math.floor((Date.now() - startTimeRef.current) / 1000);
      timeCount = timeInSecond;
      //   setTimeCount(timeInSecond);
      setTime(getDateTimeForSeconds(timeInSecond));
      setTrackingTime(getDateTimeForSeconds(timeInSecond));
    }, 1000);
    setRunning(true);
  }, [startTimeRef, intervalRef]);

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    // setTimeCount(0);
    timeCount = 0;
    setTime(getDateTimeForSeconds(0));
    setTrackingTime(getDateTimeForSeconds(0));
    setRunning(false);
  }, [intervalRef]);

  const getTime = async () => {
    return await getTrackingTime();
  };

  return {
    time,
    running,
    startTimer,
    stopTimer,
    getTime,
  };
};
