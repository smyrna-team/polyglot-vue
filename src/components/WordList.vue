<script setup>
 defineProps({
     listLength: Number,
     name: String
 })
</script>

<template>
    {{ name + ' - ' + listLength + ' Words' }}
</template>
