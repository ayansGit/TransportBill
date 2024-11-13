import {useCallback, useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {getDateTimeForSeconds} from '../utils';
import {getTrackingTime, setTrackingTime} from '../../../utils/tracking';
import BackgroundJob from 'react-native-background-actions';

export const useTimer = () => {
  //   const [timeCount, setTimeCount] = useState(0);
  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));
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

  const startBackgroundTimer = async (timeDifference = 0) => {
    const timeDiff = timeDifference === NaN ? 0: timeDifference;
    startTimeRef.current = Date.now() - (timeCount + timeDiff) * 1000;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundJob.isRunning(); i++) {
        let timeInSecond = Math.floor(
          (Date.now() - startTimeRef.current) / 1000,
        );
        timeCount = timeInSecond;
        const dateTimeForSecond = getDateTimeForSeconds(timeInSecond);
        setTime(dateTimeForSecond);
        setTrackingTime(dateTimeForSecond);
        await sleep(1000);
      }
    });
  };

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
    startBackgroundTimer,
    stopTimer,
    getTime,
  };
};
