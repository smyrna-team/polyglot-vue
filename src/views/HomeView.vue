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
                <div class="btn-group-vertical" role="group" aria-label="Options">
                    <label v-for="option in questionss[question].options" v-bind:key="option.id" class="btn btn-outline-primary">
                        <input type="radio" class="btn-check" />
                        {{ option.name }}
                    </label>
                    <button @click="stopQuiz" class="btn btn-danger">X</button>

                </div>
            </div>
            <div v-else>
                <div class="btn-group-vertical" role="group" aria-label="Word Lists">
                    <label v-for="wordList in wordLists.wordLists" v-bind:key="wordList.id" class="btn btn-outline-primary">
                        <input v-model="selectedLists" :value="wordList" type="checkbox" class="btn-check" />
                        <WordList :name="wordList.name" :listLength="wordList.list.length" />
                    </label>
                    <button @click="startQuiz" class="btn btn-success">></button>
                </div>
            </div>
        </section>
    </main>
</template>
