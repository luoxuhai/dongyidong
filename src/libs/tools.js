export const transitionTime = num => {
  let minute = 0;
  let second = 0;
  if (num === 0) {
    minute = '00';
    second = '00';
  } else {
    minute = Math.floor(num / 60).toString();
    second = (num - minute * 60).toString();
    if (minute.length < 2) {
      minute = `0${minute}`;
      if (minute.lenght <= 0) {
        minute = `00`;
      }
    }
    if (second.length < 2) {
      second = `0${second}`;
    }
  }
  return `${minute}:${second}`;
};

export const getCountDown = (time, success) => {
  const interval = setInterval(() => {
    if (time >= 0) success(time--);
    else clearInterval(interval);
  }, 1000);
};
