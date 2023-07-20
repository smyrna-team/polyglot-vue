<script setup>
 import { ref } from 'vue'
 import { useRoute } from 'vue-router'

 import { getWordLists, insertWordList } from '../api'

 import WordList from '../components/WordList.vue'

 const route = useRoute()

 const wordLists = ref({})
 const isLoading = ref(true)
 const selectedLists = ref([])

 const questionss = ref([])
 const question = ref(0) // index
 const isStarted = ref(false)

 async function resolve() {
     wordLists.value = await getWordLists({ source: route.query.source, target: route.query.target })
     isLoading.value = false
 }
 resolve()

 function start(){

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

 function stop() {
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
        <h1>Home</h1>
        <h2 v-if="isLoading">Loading</h2>
        <section v-else>
            <h2>Word Lists</h2>
            <template v-if="isStarted">
                <h3>{{ questionss[question].name }}</h3>
                <div class="btn-group-vertical" role="group" aria-label="Options">
                    <template v-for="option in questionss[question].options" v-bind:key="option.id">
                        <input name="option" :id="'option' + option.id" type="radio" class="btn-check" />

                        <label :for="'option' + option.id" class="btn btn-outline-primary">{{ option.name }}</label>
                    </template>
                    <button @click="stop" class="btn btn-danger">X</button>
                </div>
            </template>
            <template v-else>
                <div class="btn-group-vertical" role="group" aria-label="Word Lists">
                    <template v-for="wordList in wordLists.wordLists" v-bind:key="wordList.id">
                        <input :id="'wordList' + wordList.id" v-model="selectedLists" :value="wordList" type="checkbox" class="btn-check" />
                        <label :for="'wordList' + wordList.id" class="btn btn-outline-primary">
                            <WordList :name="wordList.name" :listLength="wordList.list.length" />
                        </label>
                    </template>
                    <button @click="start" class="btn btn-success">></button>
                </div>
            </template>
        </section>
    </main>
</template>
