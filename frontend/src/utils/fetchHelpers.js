import 'cross-fetch/polyfill';

import { API_URL } from '../../config/config';

function jsonHeaders(token) {
  const options = {
    'Content-Type': 'application/json'
  };

  if (token) {
    options.Authorization = `Bearer ${token}`;
  }
  return new Headers(options);
}

export function get(url, token, params = {}) {
  const urlObject = new URL(`${API_URL}${url}`);
  if (params) {
    Object.keys(params).forEach(key => urlObject.searchParams.append(key, params[key]));
  }
  return fetch(urlObject, {
    method: 'GET',
    headers: jsonHeaders(token)
  })
    .then(res => res.json());
}

export function post(url, body, token) {
  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: jsonHeaders(token)
  })
    .then(res => res.json());
}
