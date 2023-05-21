import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { TIMEZONE_CODE } from "../lib/helpers/common.helper";

const HOURS_8 = 28800000;
const DAYS_1 = 86400000;

type Props = {
  resultAt: Date;
};

const CountDownTimer = ({ resultAt }: Props) => {
  const end = moment(resultAt).tz(TIMEZONE_CODE),
    now = moment().tz(TIMEZONE_CODE);
  const duration = end.diff(now);

  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const [lowDuring, setLowDuring] = useState(false);

  const getTimeRemain = () => {
    // console.log('duration',duration);
    const diffDuration = moment.duration(duration);
    setDays(diffDuration.days());
    setHours(diffDuration.hours());
    setMinutes(diffDuration.minutes());
    setSeconds(diffDuration.seconds());
    setLowDuring(duration < HOURS_8);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTimeRemain();
    }, 1000);
    return () => clearInterval(interval);
  }, [duration]);

  const renderTimer1 = () => {
    return (
      <div>
        {(days === null ||
          hours === null ||
          minutes === null ||
          seconds === null) && <>Loading...</>}
        {days > 0 && <>{days} days </>}
        {hours > 0 && <>{hours} hours </>}
        {days <= 0 && minutes > 0 && <>{minutes} minutes </>}
        {days <= 0 && hours <= 0 && minutes > 0 && <>{seconds} seconds </>}
        {hours} days {-minutes} hours
      </div>
    );
  };

  return renderTimer1();
};

export default CountDownTimer;
