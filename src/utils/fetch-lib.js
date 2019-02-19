import { isEmpty } from 'lodash';

export const handleFetchData = (url, fetchMethod = 'GET', fetchBody, fetchHeader, fetchMode = 'cors') => {
  if (isEmpty(fetchHeader)) {
    fetchHeader = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    };
  }

  if (fetchMethod === 'GET') {
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then(
        (result) => {
          return result;
        },
        (error) => {
          return error;
        },
      );
  }

  return fetch(url, {
    method: fetchMethod,
    body: fetchBody,
    mode: fetchMode,
    headers: fetchHeader,
  })
    .then((response) => {
      return response.json();
    })
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      },
    );
};