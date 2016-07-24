'use strict';

const fetch = require('node-fetch');
const { baseUrl } = require('./boot');

function parseResponse(res) {
  if (res.headers.get('Content-Type').indexOf('application/json') === 0) {
    return res.json().then((body) => {
      return [res, body];
    });
  }

  return res.text().then((body) => {
    return [res, body];
  });
}

module.exports = {
  get(url, opts = {}) {
    const fullUrl = baseUrl + url;

    const headers = Object.assign({
      Accept: 'application/json'
    }, opts.headers);

    const options = Object.assign({}, opts, {
      method: 'get',
      headers
    });

    return fetch(fullUrl, options).then(parseResponse);
  },

  post(url, opts = {}) {
    const fullUrl = baseUrl + url;

    const headers = Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, opts.headers);

    let body = null;

    if (opts.body) {
      body = JSON.stringify(opts.body);
    }

    const options = Object.assign({}, opts, {
      method: 'post',
      headers,
      body
    });

    return fetch(fullUrl, options).then(parseResponse);
  },

  put(url, opts = {}) {
    const fullUrl = baseUrl + url;

    const headers = Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }, opts.headers);

    let body = null;

    if (opts.body) {
      body = JSON.stringify(opts.body);
    }

    const options = Object.assign({}, opts, {
      method: 'put',
      headers,
      body
    });

    return fetch(fullUrl, options).then(parseResponse);
  },

  del(url, opts = {}) {
    const fullUrl = baseUrl + url;

    const headers = Object.assign({
      Accept: 'application/json'
    }, opts.headers);

    const options = Object.assign({}, opts, {
      method: 'delete',
      headers
    });

    return fetch(fullUrl, options).then(parseResponse);
  }
};
