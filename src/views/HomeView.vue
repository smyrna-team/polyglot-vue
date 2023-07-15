<script setup>
 import { ref } from 'vue'
 import { useRoute } from 'vue-router'

 import { getWordLists } from '../api'

 import WordList from '../components/WordList.vue'

 const route = useRoute()

 const wordLists = ref([])
 const isLoading = ref(true)

 async function resolve() {
   wordLists.value = await getWordLists(true, { source: route.sourceLang, target: route.targetLang })
   isLoading.value = false
 }
 resolve()
</script>

<template>
  <main>
    <h1>Word Lists</h1>
    <h3 v-if="isLoading">Loading</h3>
    <ul v-else>
      <li v-for="wordList in wordLists" v-bind:key="wordList.id">
          <WordList :name="wordList.name" :listLength="wordList.list.length" />
      </li>
    </ul>
  </main>
</template>
