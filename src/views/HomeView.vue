<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'

  import { getWordLists } from '../api'

  import WordList from '../components/WordList.vue'

  const route = useRoute()

  const wordLists = ref({})
  const isLoading = ref(true)
  const selectedLists = ref([])

  async function resolve() {
    wordLists.value = await getWordLists(false, { source: route.query.sourceLang, target: route.query.targetLang })
    isLoading.value = false
  }
  resolve()

  function readyQuiz(){
    const selectedWords = []
    selectedLists.value.forEach(list => {
      selectedWords.push(...list.list)
    })

    // Shuffle the selectedWords array
    shuffle(selectedWords)

    // Create a quiz with each word as a question and 4 random translations as answers
    const quiz = []
    selectedWords.forEach(word => {
      const answers = []
      answers.push(word.translation)
      while (answers.length < 4) {
        const randomWord = selectedWords[Math.floor(Math.random() * selectedWords.length)]
        if (!answers.includes(randomWord.translation)) {
          answers.push(randomWord.translation)
        }
      }
      shuffle(answers)
      quiz.push({
        question: word.name,
        trueAnswer: word.translation,
        answers: answers
      })
      
    })
    console.log(quiz)
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
</script>

<template>
  <main>
    <h1>Word Lists</h1>
    <h3 v-if="isLoading">Loading</h3>
    <ul v-else>
      <li v-for="wordList in wordLists.wordLists" v-bind:key="wordList.id">
        <label>
            <input type="checkbox" v-model="selectedLists" :value="wordList" />
             {{ wordList.name }} ({{ wordList.list.length }})
          </label>
      </li>
    </ul>
    <button v-if="!isLoading" @click="readyQuiz">Ready to Quiz</button>
  </main>
</template>
