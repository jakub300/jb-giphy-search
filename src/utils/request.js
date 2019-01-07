import fetch from 'unfetch';

export default function request(url, params = {}, options = {}) {
  const paramsString = Object.entries(params)
    .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    .join('&');

  return fetch(`${url}${paramsString ? '?' : ''}${paramsString}`, options).then(res =>
    res.ok ? res : Promise.reject(res),
  );
}

export function requestJson(...args) {
  let response;

  return request(...args)
    .then(r => {
      response = r;
      return r.json();
    })
    .then(data => ({ response, data }));
}
