<script setup>
 import { ref } from 'vue'
 import { getWordLists } from '../api'
 const wordLists = ref([])
 const isLoading = ref(true)

 async function resolve() {
   wordLists.value = await getWordLists(true)
   isLoading.value = false
 }
 resolve()
</script>

<template>
  <main>
    <h1>Word Lists</h1>
    <h3 v-if='isLoading'>Loading</h3>
    <ol v-else>
      <li v-for="wordList in wordLists" v-bind:key="wordList.id">
        <ul>
          <li v-for="word in wordList.list" v-bind:key="word.id">
            {{ word.name + ': ' + word.translation }}
          </li>
        </ul>
      </li>
    </ol>
  </main>
</template>
