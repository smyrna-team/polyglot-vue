const domain = '/api/v1/'

function path (file) {
  return domain + file
}

async function request (file, method = 'get', value) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (value !== undefined) {
    options.body = JSON.stringify(value)
  }
  const response = await fetch(path(file), options)
  return response.ok ? response.json() : {}
}

const mock = import.meta.env.VITE_MOCK

export async function getLangs () {
  return mock
    ? {
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
      }
    : await request('lang')
}

export async function getWordLists (lang = { source: 'en', target: 'tr' }) {
  return mock
    ? {
        wordLists: [
          {
            id: 1,
            name: 'A1',
            lang,
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
          },
          {
            id: 2,
            name: 'A2',
            lang,
            list: [
              {
                id: 3,
                name: 'fire',
                translation: 'od'
              },
              {
                id: 4,
                name: 'wood',
                translation: 'odun'
              }
            ]
          }
        ]
      }
    : await request(lang.source + '/' + lang.target + '/' + 'word-list')
}
