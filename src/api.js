const domain = 'api/v1/'

function path(file) {
  return domain + file
}

async function request(file, method = 'get', value) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (value !== undefined) {
    options.body = JSON.stringify(value);
  }
  const response = await fetch(path(file), options);
  return response.json()

  if (response.ok) {
    return response.json()
  } else {
    console.log(response.statusText)
    return {}
  }
}

export async function getLangs(mock = false) {
  return mock ? {
    langs: [
      {
        id: 1,
        name: 'en'
      },
      {
        id: 2,
        name: 'tr'
      }
    ]
  } : await request('lang')
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
  ] : await request(lang.source + '/' + lang.target + '/' + 'word-list')
}