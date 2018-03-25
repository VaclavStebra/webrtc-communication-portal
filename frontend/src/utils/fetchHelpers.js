import 'cross-fetch/polyfill';

import { API_URL } from '../../config/config';

function jsonHeaders() {
  return new Headers({
    'Content-Type': 'application/json'
  });
}

export function get(url) {
  return fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: jsonHeaders()
  })
    .then(res => res.json());
}

export function post(url, body) {
  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: jsonHeaders()
  })
    .then(res => res.json());
}
