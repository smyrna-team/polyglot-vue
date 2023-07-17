<script setup>
 import { ref } from 'vue'
 import { useRoute } from 'vue-router'

 import { getWordLists } from '../api'

 import WordList from '../components/WordList.vue'

 const route = useRoute()

 const wordLists = ref({})
 const isLoading = ref(true)
 const selectedLists = ref([])

 const questionss = ref([])
 const question = ref(0) // index
 const isStarted = ref(false)

 async function resolve() {
   wordLists.value = await getWordLists({ source: route.query.sourceLang, target: route.query.targetLang })
   isLoading.value = false
 }
 resolve()

 function startQuiz(){
   if (selectedLists.value.length == 0) {
     alert('Select at least one word list')
     return
   }
   const selectedWords = []
   selectedLists.value.forEach(list => {
     selectedWords.push(...list.list)
   })
   // Shuffle the selectedWords array
   shuffle(selectedWords)
   // Create a question with each word as a question and 4 random translations as answers
   const questions = []
   selectedWords.forEach(word => {
     const options = []
     options.push({ id: options.length, name: word.translation })

     while (options.length < 4) {
       const randomWord = selectedWords[Math.floor(Math.random() * selectedWords.length)]

       if (!options.includes(randomWord.translation)) {
         options.push({ id: options.length, name: randomWord.translation })
       }
     }
     shuffle(options)
     questions.push({
       id: questions.length,
       name: word.name,
       answer: word.translation,
       options: options
     })
   })
   questionss.value = questions
   question.value = 0
   isStarted.value = true
 }

 function stopQuiz() {
   questionss.value = []
   question.value = 0
   isStarted.value = false
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
    <section v-else>
      <div v-if="isStarted">
        <h2>{{ questionss[question].name }}</h2>
        <p v-for="option in questionss[question].options" v-bind:key="option.id">
          <button>{{ option.name }}</button>
        </p>
        <button @click="stopQuiz" class="red-background">Stop Quiz</button>
      </div>
      <div v-else>
        <ul>
          <li v-for="wordList in wordLists.wordLists" v-bind:key="wordList.id">
            <label>
              <input type="checkbox" v-model="selectedLists" :value="wordList" />
              <WordList :name="wordList.name" :listLength="wordList.list.length" />
            </label>
          </li>
        </ul>
        <button @click="startQuiz" class="green-background">Start Quiz</button>
      </div>
    </section>
  </main>
</template>
