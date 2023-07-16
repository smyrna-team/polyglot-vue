<script setup>
 import { ref } from 'vue'
 import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
 import HelloWorld from './components/HelloWorld.vue'
 import { getLangs } from './api'

 const route = useRoute()
 const router = useRouter()

 const langs = ref({})
 const isLoading = ref(true)

 async function resolve() {
   langs.value = await getLangs()
     console.log(langs.value)
   isLoading.value = false
 }
 resolve()

 function onLangChange() {
   const sourceLang = document.getElementById('sourceLang')
   const targetLang = document.getElementById('targetLang')
   router.push({
     query:  {
       sourceLang: sourceLang.options[sourceLang.selectedIndex].value,
       targetLang: targetLang.options[targetLang.selectedIndex].value
     }
   })
 }
 </script>

<template>
  <header>
    <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="Polyglot" />

      <nav>
        <select id="sourceLang" @change="onLangChange">
          <option v-for="lang in langs.langs" v-bind:key="lang.id">{{  lang.name }}</option>
        </select>
<select id="targetLang" @change="onLangChange">
          <option v-for="lang in langs.langs" v-bind:key="lang.id">{{  lang.name }}</option>
        </select>
        <RouterLink :to="{ path: '/', query: route.query }">Home</RouterLink>
        <RouterLink :to="{ path: '/about', query: route.query }">About</RouterLink>
        <RouterLink :to="{ path: '/login', query: route.query }">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
