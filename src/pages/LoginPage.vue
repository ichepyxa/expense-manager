<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <RouterLink :to="{ name: 'MainPage' }" class="hover:*:fill-emerald-600">
        <LogoWithText class="mx-auto h-30 w-auto transition-all duration-300" />
      </RouterLink>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Войдите в свой аккаунт</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Электронная почта</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required="true" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Пароль</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-emerald-600 hover:text-emerald-700">Забыли пароль?</a>
            </div>
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required="true" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit" class="transition-all duration-300 cursor-pointer flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-700">Войти</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Вы не имеете аккаунта?
        {{ ' ' }}
        <a v-on:click="localSaveMode" class="cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700">Попробуйте режим с локальным сохранением данных</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LogoWithText from '@/components/LogoWithText.vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const store = useStore()
  const router = useRouter()

  const localSaveMode = () => {
    store.dispatch("user/localLogin")

    const redirect = router.currentRoute.value.query.redirect || "/dashboard"
    router.push(redirect)
  }
</script>