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

export async function getLangs(mock = false) {
  return mock ? [
    {
      id: 1,
      name: 'en'
    },
    {
      id: 2,
      name: 'tr'
    }
  ] : await request('lang')
}

export async function getWordLists(mock = false, lang = { source: 'en', target: 'tr' }) {
  return mock ? [
    {
      id: 1,
      name: 'A1',
      lang: lang,
      list: [
        {
          name: 'water',
          translation: 'su'
        },
        {
          name: 'earth',
          translation: 'toprak'
        }
      ]
    },
    {
      id: 2,
      name: 'A2',
      lang: lang,
      list: [
        {
          name: 'fire',
          translation: 'od'
        },
        {
          name: 'wood',
          translation: 'odun'
        }
      ]
    }
  ] : await request('word-list')
}
