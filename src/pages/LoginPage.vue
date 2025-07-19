<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <RouterLink :to="{ name: 'MainPage' }" class="hover:*:fill-emerald-600">
        <LogoWithText class="mx-auto h-30 w-auto transition-all duration-300" />
      </RouterLink>
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Войдите в свой аккаунт</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Электронная почта</label>
          <div class="mt-2">
            <input v-model="email" type="email" name="email" id="email" autocomplete="email" :class="`${!validationErrors.email?.message ? 'outline-gray-300' : 'outline-red-500'} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6`" />
          </div>
          <span v-if="validationErrors.email" class="text-red-500 text-sm">{{ validationErrors.email?.message }}</span>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Пароль</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-emerald-600 hover:text-emerald-700">Забыли пароль?</a>
            </div>
          </div>
          <div class="mt-2">
            <input v-model="password" type="password" name="password" id="password" autocomplete="current-password" :class="`${!validationErrors.password?.message ? 'outline-gray-300' : 'outline-red-500'} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-sm/6`" />
          </div>
          <span v-if="validationErrors.password" class="text-red-500 text-sm">{{ validationErrors.password?.message }}</span>
        </div>

        <div>
          <button v-on:click="login" class="transition-all duration-300 cursor-pointer flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-700">Войти</button>
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
  import validation from '@/lib/validation'
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const store = useStore()
  const router = useRouter()

  const email = ref("")
  const password = ref("")
  const validationErrors = ref({
    email: {},
    password: {}
  })
  
  watch(email, () => validationErrors.value.email = {})
  watch(password, () => validationErrors.value.password = {})

  const redirect = (path) => {
    router.push(path)
  }

  const redirectAuthenticatedUser = () => {
    const userIsAuthenticated = store.getters['user/isAuthenticated']

    if (userIsAuthenticated) {
      redirect("/dashboard")
    }
  }
  redirectAuthenticatedUser()


  const validateLoginData = () => {
    const { isValid, errors } = validation(email.value, password.value)
    
    if (!isValid) {
      validationErrors.value.email = !errors?.email ? {} : errors?.email.error
      validationErrors.value.password = !errors?.password ? {} : errors?.password.error

      return false
    }

    return true
  }

  const login = async (e) => {
    e.preventDefault()

    if (validateLoginData()) {
      await store.dispatch("user/login", {
        email: email.value, 
        password: password.value
      })
      redirect(router.currentRoute.value.query.redirect || "/dashboard")
    }
  }

  const localSaveMode = () => {
    store.dispatch("user/localLogin")

    redirect(router.currentRoute.value.query.redirect || "/dashboard")
  }
</script>