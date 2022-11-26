// create function to parse timestamp to date and time dd/mm/yyyy hh:mm:ss
// create function parse string to integer

export const parseTimestamp = (timestamp) => {
  const date = new Date(parseInt(timestamp) * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year} ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const convertToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

export const transform = (d, h) => {
  var data = 0;
  const hour = parseInt(h);
  switch (d) {
    case "l":
      data += 0;
      break;
    case "m":
      data += 86400;
      break;
    case "mc":
      data += 86400 * 2;
      break;
    case "j":
      data += 86400 * 3;
      break;
    case "v":
      data += 86400 * 4;
      break;
    case "s":
      data += 86400 * 5;
      break;
    case "d":
      data += 86400 * 6;
      break;
    default:
      break;
  }
  data += hour * 3600;
  return data;
};
export const convertDateToPayload = (day, arr) => {
  const date = [];
  const duration = [];
  if (day === "all") {
    for (let i = 0; i < 7; i++) {
      var letter = "";
      switch (i) {
        case 0:
          letter = "l";
          break;
        case 1:
          letter = "m";
          break;
        case 2:
          letter = "mc";
          break;
        case 3:
          letter = "j";
          break;
        case 4:
          letter = "v";
          break;
        case 5:
          letter = "s";
          break;
        case 6:
          letter = "d";
          break;
        default:
          break;
      }
      arr.forEach((e) => {
        date.push(transform(letter, e.h));
        duration.push(parseInt(e.m) * 60);
      });
    }
  } else {
    arr.forEach((e) => {
      date.push(transform(day, e.h));
      duration.push(parseInt(e.m) * 60);
    });
  }

  return [date, duration];
};

export const checkQrCode = (qrCode) => {
  try {
    const data = JSON.parse(qrCode);
    if (data._id && data.irrig != null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
