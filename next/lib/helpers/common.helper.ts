export const parseDayNumToDayStr = (param: string) => {
  const days = [
    { name: "Mon", value: "2" },
    { name: "Tue", value: "3" },
    { name: "Wed", value: "4" },
    { name: "Thu", value: "5" },
    { name: "Fri", value: "6" },
    { name: "Sat", value: "7" },
    { name: "Sun", value: "8" },
  ];
  return days.find((day) => day.value === param).name;
};

export const convertObjectNullToEmpty = (params: any) =>
  JSON.parse(JSON.stringify(params).replace(/\:null/gi, ':""'));

export const TIMEZONE_CODE: string = "Asia/Ho_Chi_Minh";
export const DELAY_TIME = 1500;
export const LENGTH_ITEM_PER_PAGE = 10;

export const parseJSON = (json: any) => {
  try {
    const obj = JSON.parse(json);
    return obj;
  } catch (e) {
    return {};
  }
};

export const parseArray = (array: any) => {
  if (Array.isArray(array) && array.every((item) => typeof item === "string")) {
    return array;
  }
  return [];
};

export const formatDate = "DD/MM/yyyy";

export const formatFullTime = "DD/MM/YYYY - hh:mm a";

export const formatFullDayTime = "ddd - DD/MM/YYYY - hh:mm a";
