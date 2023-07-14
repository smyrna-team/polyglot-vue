const domain = 'http://localhost:8080/v1'

function path(lang, file) {
  const d = '/' // delimiter
  return domain + d + lang.source + d + lang.target + d + file
}

async function request(file, method = 'get', value) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(value)

  if (value !== undefined) {
    options.body = JSON.stringify(value);
  }
  const response = await fetch(path(file), options);

  if (response.ok) {
    const json = await response.json();
    console.log(json);
  } else {
    console.log(response.statusText);
  }
}

export async function getWotd(mock = false, lang = { source: 'en', target: 'tr' }) {
  return mock ? {
    id: 1,
    lang: lang,
    name: 'water',
    translation: 'su'
  } : await request('wotd')
}

export async function getWordLists(mock = false, lang = { source: 'en', target: 'tr' }) {
  return mock ? [{
    id: 1,
    lang: lang,
    list: [
      {
        id: 1,
        name: 'water',
        translation: 'su'
      },
      {
        id: 2,
        name: 'earth',
        translation: 'toprak'
      }
    ]
  }, {
    id: 1,
    lang: lang,
    list: [
      {
        id: 1,
        name: 'fire',
        translation: 'od'
      },
      {
        id: 2,
        name: 'wood',
        translation: 'odun'
      }
    ]
  }] : await request('word-list')
}
