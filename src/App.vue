<script setup>
    import { ref } from 'vue'
    import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
    import HelloWorld from './components/HelloWorld.vue'
    import { getLangs, insertLang } from './api'

    const route = useRoute()
    const router = useRouter()

    router.push({
    query:  {
    source: 'en',
    target: 'tr'
    }
    })

    const langs = ref({})
    const isLoading = ref(true)
    const langName = ref('')

    async function resolve() {
    langs.value = await getLangs()
    isLoading.value = false
    }
    resolve()

    function onLangChange() {
    const source = document.getElementById('source')
    const target = document.getElementById('target')

    if (source.options[source.selectedIndex].disabled || target.options[target.selectedIndex].disabled) {
    return
    }
    router.push({
    query:  {
    source: source.options[source.selectedIndex].value,
    target: target.options[target.selectedIndex].value
    }
    })
    }

    function insertLangOnClick() {
    insertLang({ name: langName.value })
    langName.value = ''
    }
</script>

<template>
    <header>
        <img alt="logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <HelloWorld msg="Polyglot" />

            <nav>
                <form onsubmit="event.preventDefault()">
                    <div class="row">
                        <div class="col">
                            <select @change="onLangChange" id="source" class="form-select" aria-label="Source">
                                <option disabled selected>Source</option>
                                <option v-for="lang in langs.langs" v-bind:key="lang.id">{{  lang.name }}</option>
                            </select>
                        </div>
                        <div class="col">
                            <select @change="onLangChange" id="target" class="form-select" aria-label="Target">
                                <option disabled selected>Target</option>
                                <option v-for="lang in langs.langs" v-bind:key="lang.id">{{  lang.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <input v-model="langName" placeholder="Code" class="form-control" />
                        </div>
                        <div class="col">
                            <button @click="insertLangOnClick" class="btn btn-success">+</button>
                        </div>
                    </div>
                </form>
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
