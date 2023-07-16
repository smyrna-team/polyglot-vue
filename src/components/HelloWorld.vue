<script setup>
 import { ref } from 'vue'
 import { useRoute } from 'vue-router'

 import { getWordLists } from '../api'

 const route = useRoute()

 const wordLists = ref({})
 const wotd = ref({})
 const isLoading = ref(true)

 async function resolve() {
     wordLists.value = await getWordLists(false, { source: route.sourceLang, target: route.targetLang })
     const wordList = wordLists.value.wordLists[Math.floor(Math.random() * wordLists.value.length)]
     wotd.value = wordList.list[Math.floor(Math.random() * wordList.list.length)]
     isLoading.value = false
 }
 resolve()

</script>

<template>
    <div class="greetings">
        <h1 class="green">Polyglot</h1>
        <h2>Word of the Day</h2>
        <h3 v-if="isLoading">Loading</h3>
        <h3 v-else>{{ wotd.name + ': ' + wotd.translation }}</h3>
    </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
