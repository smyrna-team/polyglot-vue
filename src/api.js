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
      "id": 1,
      "name": "Word list 1",
      "lang": {
        "source": "en",
        "target": "tr"
      },
      "list": [
        {
          "id": 1,
          "name": "water",
          "translation": "su"
        },
        {
          "id": 2,
          "name": "earth",
          "translation": "toprak"
        },
        {
          "id": 3,
          "name": "air",
          "translation": "hava"
        },
        {
          "id": 4,
          "name": "fire",
          "translation": "ateş"
        },
        {
          "id": 5,
          "name": "sun",
          "translation": "güneş"
        },
        {
          "id": 6,
          "name": "moon",
          "translation": "ay"
        },
        {
          "id": 7,
          "name": "star",
          "translation": "yıldız"
        },
        {
          "id": 8,
          "name": "mountain",
          "translation": "dağ"
        },
        {
          "id": 9,
          "name": "valley",
          "translation": "vadi"
        },
        {
          "id": 10,
          "name": "river",
          "translation": "nehir"
        },
        {
          "id": 11,
          "name": "ocean",
          "translation": "okyanus"
        },
        {
          "id": 12,
          "name": "forest",
          "translation": "orman"
        },
        {
          "id": 13,
          "name": "flower",
          "translation": "çiçek"
        },
        {
          "id": 14,
          "name": "bird",
          "translation": "kuş"
        },
        {
          "id": 15,
          "name": "fish",
          "translation": "balık"
        },
        {
          "id": 16,
          "name": "dog",
          "translation": "köpek"
        },
        {
          "id": 17,
          "name": "cat",
          "translation": "kedi"
        },
        {
          "id": 18,
          "name": "horse",
          "translation": "at"
        },
        {
          "id": 19,
          "name": "book",
          "translation": "kitap"
        },
        {
          "id": 20,
          "name": "pen",
          "translation": "kalem"
        },
        {
          "id": 21,
          "name": "computer",
          "translation": "bilgisayar"
        },
        {
          "id": 22,
          "name": "music",
          "translation": "müzik"
        },
        {
          "id": 23,
          "name": "love",
          "translation": "aşk"
        },
        {
          "id": 24,
          "name": "ice cream",
          "translation": "dondurma"
        },
        {
          "id": 25,
          "name": "god",
          "translation": "tanrı"
        }
      ]
    },
    {
      "id": 2,
      "name": "Word list 2",
      "lang": {
        "source": "en",
        "target": "tr"
      },
      "list": [
        {
          "id": 26,
          "name": "fire",
          "translation": "ateş"
        },
        {
          "id": 27,
          "name": "wood",
          "translation": "odun"
        },
        {
          "id": 28,
          "name": "rain",
          "translation": "yağmur"
        },
        {
          "id": 29,
          "name": "wind",
          "translation": "rüzgar"
        },
        {
          "id": 30,
          "name": "storm",
          "translation": "fırtına"
        },
        {
          "id": 31,
          "name": "lightning",
          "translation": "yıldırım"
        },
        {
          "id": 32,
          "name": "tree",
          "translation": "ağaç"
        },
        {
          "id": 33,
          "name": "flower",
          "translation": "çiçek"
        },
        {
          "id": 34,
          "name": "butterfly",
          "translation": "kelebek"
        },
        {
          "id": 35,
          "name": "bird",
          "translation": "kuş"
        },
        {
          "id": 36,
          "name": "fish",
          "translation": "balık"
        },
        {
          "id": 37,
          "name": "dog",
          "translation": "köpek"
        },
        {
          "id": 38,
          "name": "cat",
          "translation": "kedi"
        },
        {
          "id": 39,
          "name": "horse",
          "translation": "at"
        },
        {
          "id": 40,
          "name": "friend",
          "translation": "arkadaş"
        },
        {
          "id": 41,
          "name": "family",
          "translation": "aile"
        },
        {
          "id": 42,
          "name": "home",
          "translation": "ev"
        },
        {
          "id": 43,
          "name": "school",
          "translation": "okul"
        },
        {
          "id": 44,
          "name": "sun",
          "translation": "güneş"
        },
        {
          "id": 45,
          "name": "moon",
          "translation": "ay"
        },
        {
          "id": 46,
          "name": "star",
          "translation": "yıldız"
        },
        {
          "id": 47,
          "name": "music",
          "translation": "müzik"
        },
        {
          "id": 48,
          "name": "book",
          "translation": "kitap"
        },
        {
          "id": 49,
          "name": "pen",
          "translation": "kalem"
        },
        {
          "id": 50,
          "name": "memory",
          "translation": "bellek"
        },
      ]
    },
    {
      "id": 3,
      "name": "Word list 3",
      "lang": {
        "source": "en",
        "target": "jp"
      },
      "list": [
        {
          "id": 51,
          "name": "water",
          "translation": "みず"
        },
        {
          "id": 52,
          "name": "hello",
          "translation": "こんにちは"
        },
        {
          "id": 53,
          "name": "thank you",
          "translation": "ありがとう"
        },
        {
          "id": 54,
          "name": "I",
          "translation": "私"
        }
      ]
    }
  ]
}

export async function getWordLists (lang = { source: 'en', target: 'tr' }) {
  const filteredWordLists = { wordLists }
  filteredWordLists.wordLists = wordLists.wordLists.filter((wordList) => wordList.lang.source === lang.source && wordList.lang.target === lang.target)
  return mock ? filteredWordLists : await request('word-list?source=' + lang.source + '&target=' + lang.target)
}

export async function insertWordList(wordList) {
  const id = wordLists.wordLists.length
  wordList.id = id
  wordLists.wordLists.push(wordList)
  return mock ? { id: id } : await request('word-list/add', 'post', wordList)
}
