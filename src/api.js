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

const langs = {
  langs: [
    {
      id: 1,
      name: 'en'
    },
    {
      id: 2,
      name: 'gr'
    },
    {
      id: 3,
      name: 'it'
    },
    {
      id: 4,
      name: 'jp'
    },
    {
      id: 5,
      name: 'tr'
    }
  ]
}

export async function getLangs () {
  return mock ? langs : await request('lang')
}

export async function insertLang(lang) {
  const id = langs.langs.length
  lang.id = id
  langs.langs.push(lang)
  return mock ? { id: id } : await request('lang/add', 'post', lang)
}

const wordLists = {
  wordLists: [
    {
      id: 1,
      name: 'A1',
      lang: {
        source: 'en',
        target: 'tr'
      },
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
      lang: {
        source: 'en',
        target: 'tr'
      },
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

export async function getWordLists (lang = { source: 'en', target: 'tr' }) {
  const filteredWordLists = { wordLists }
  filteredWordLists.wordLists = wordLists.wordLists.filter((wordList) => wordList.lang.source === lang.source && wordList.lang.target === lang.target)
  console.log(filteredWordLists)
  return mock ? filteredWordLists : await request('word-list?source=' + lang.source + '&target=' + lang.target)
}

export async function insertWordList(wordList) {
  const id = wordLists.wordLists.length
  wordList.id = id
  wordLists.wordLists.push(wordList)
  return mock ? { id: id } : await request('word-list/add', 'post', wordList)
}
