<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/">
          <span class="sr-only">EMA</span>
          <LogoWithText class="h-20 sm:h-22 w-auto hover:fill-emerald-600 transition-all duration-300" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="cursor-pointer -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:*:stroke-emerald-600 transition-all duration-300" @click="mobileMenuOpen = true">
          <span class="sr-only">Открыть меню</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm/6 font-semibold text-gray-900 hover:bg-emerald-600 hover:shadow-lg hover:text-white px-5 py-3 transition-all duration-300 rounded-xl">{{ item.name }}</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <RouterLink v-if="isAuthenticated" :to="{ name: 'DashboardPage' }" class="text-sm/6 font-semibold text-gray-900 hover:bg-emerald-600 hover:shadow-lg hover:text-white px-5 py-3 transition-all duration-300 rounded-xl">Войти <span aria-hidden="true">&rarr;</span></RouterLink>
        <RouterLink v-if="!isAuthenticated" :to="{ name: 'LoginPage' }" class="text-sm/6 font-semibold text-gray-900 hover:bg-emerald-600 hover:shadow-lg hover:text-white px-5 py-3 transition-all duration-300 rounded-xl">Войти <span aria-hidden="true">&rarr;</span></RouterLink>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="/">
            <span class="sr-only">EMA</span>
            <LogoWithText class="h-20 sm:h-22 w-auto hover:fill-emerald-600 transition-all duration-300" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700 hover:*:stroke-emerald-600 transition-all duration-300 cursor-pointer" @click="mobileMenuOpen = false">
            <span class="sr-only">Закрыть меню</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-xl px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-emerald-600 hover:shadow-lg hover:text-white transition-all duration-300">{{ item.name }}</a>
            </div>
            <div class="py-6">
              <RouterLink v-if="isAuthenticated" :to="{ name: 'DashboardPage' }" class="-mx-3 block rounded-xl px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-emerald-600 hover:shadow-lg hover:text-white transition-all duration-300">Войти</RouterLink>
              <RouterLink v-if="!isAuthenticated" :to="{ name: 'LoginPage' }" class="-mx-3 block rounded-xl px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-emerald-600 hover:shadow-lg hover:text-white transition-all duration-300">Войти</RouterLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
  import { Dialog, DialogPanel } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { RouterLink } from 'vue-router'
  import { ref } from 'vue'
  import LogoWithText from './LogoWithText.vue'
  import { useStore } from 'vuex'

  const store = useStore()
  
  const isAuthenticated = store.getters["user/isAuthenticated"]

  const mobileMenuOpen = ref(false)

  const navigation = [
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Тарифы', href: '#' },
    { name: 'Отзывы', href: '#' },
    { name: 'Контакты', href: '#' },
  ]
</script>