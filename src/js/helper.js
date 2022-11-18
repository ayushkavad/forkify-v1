import { async } from 'regenerator-runtime';
import { TIME_SECOND } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIME_SECOND)]);

    const data = await response.json();

    if (!response.ok)
      throw new Error(`${data.message} status ${response.status}`);

    return data;
  } catch (error) {
    throw arr;
  }
};
