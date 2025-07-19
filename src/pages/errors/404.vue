<template>
  <div class="w-full min-h-svh max-h-svh h-full flex flex-col justify-center items-center text-2xl text-black">
    <h1 class="text-9xl text-black">4<span class="text-emerald-600">0</span>4</h1>
    <p class="mt-5 text-xl">Страница не найдена</p>
    <RouterLink class="hover:bg-emerald-600 hover:text-white transition-all duraction-300 flex items-center px-5 py-2 text-2xl rounded-2xl border-1 border-emerald-600 mt-15" :to="{ name: 'MainPage' }">
      <span>На главную</span>
    </RouterLink>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
</script>