import { reactive } from 'vue'

class Api {
  #host
  #port
  #lang
  #mock

  constructor(host, port, lang={ source: 'en', target: 'tr' }, mock = false) {
    this.#host = host
    this.#port = port
    this.#lang = lang
    this.#mock = mock
  }

  get host() {
    return this.#host
  }

  get port() {
    return this.#port
  }

  get lang() {
    return this.#lang
  }

  set lang(value) {
    this.#lang = value
  }

  get mock() {
    return this.#mock
  }

  set mock(value) {
    this.#mock = value
  }

  #path(resource = '') {
    const d = '/' // delimiter
    return this.host + ':' + this.port + d + this.lang.source + d + this.lang.target + d + resource
  }

  #log(message) {
    console.log(message)
  }

  async #request(resource, value, method = 'get') {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (method === 'post') {
      options.body = JSON.stringify(value);
    }
    const response = await fetch(this.#path(resource), options);

    if (response.ok) {
      const json = await response.json();
      this.#log(json);
    } else {
      this.#log(response.statusText);
    }
  }

  get wordOfTheDay() {
    const mock = {
      id: 1,
      lang: this.lang,
      name: 'water',
      translation: 'su'
    }

    return this.mock ? mock : this.#request('wotd')
  }

  get wordList() {
    const mock = {
      id: 1,
      lang: this.lang,
      list: {
        water: 'su',
        earth: 'toprak'
      }
    }

    return this.mock ? mock : this.#request('word-list')
  }
}

const api = new Api('localhost', 8080)
api.mock = true
export default reactive(api)
