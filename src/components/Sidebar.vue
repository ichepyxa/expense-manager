<template>
  <div class="w-full lg:block border-b-1 border-gray-100 shadow lg:border-0 lg:shadow-none z-40">
    <div class="w-2xs hidden lg:flex flex-col fixed border-r-1 border-gray-100 h-screen">
      <div class="flex px-6 overflow-y-auto flex-col grow">
        <div class="flex shrink-0 items-center h-20">
          <Logo class="w-auto h-20" />
        </div>
        <nav class="flex flex-col flex-1">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li class="mt-5">
              <ul role="list" class="-mx-2 *:not-last:my-1">
                <li v-for="item in navigation">
                  <a :href="item.href" :class="`flex items-center transition-all duraction-300 gap-x-3 rounded-md p-2 font-semibold text-sm ${item.active ? 'bg-emerald-600 text-white' : 'hover:bg-gray-200'}`">
                    <HomeIcon v-if="item.icon == 'dashboard'" class="size-6" />
                    <ArrowsRightLeftIcon v-if="item.icon == 'operations'" class="size-6" />
                    <BanknotesIcon v-if="item.icon == 'accumulation'" class="size-6" />
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="mt-auto -mx-2 flex flex-col gap-y-2 mb-2">
              <a href="/" class="flex items-center p-2 gap-x-3 transition-all duration-300 text-black font-semibold text-sm rounded-md hover:bg-emerald-600 hover:text-white">
                <ArrowRightEndOnRectangleIcon class="size-6" />
                Выйти
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="flex lg:hidden">
      <button type="button" class="cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:*:stroke-emerald-600 transition-all duration-300" @click="mobileMenuOpen = true">
        <span class="sr-only">Открыть меню</span>
        <Bars3Icon class="size-6" aria-hidden="true" />
      </button>
    </div>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="/">
            <span class="sr-only">EMA</span>
            <LogoWithText class="h-20 sm:h-22 w-auto hover:fill-emerald-600 transition-all duration-300" />
          </a>
          <button type="button" class="cursor-pointer -m-2.5 rounded-md p-2.5 text-gray-700 hover:*:stroke-emerald-600 transition-all duration-300" @click="mobileMenuOpen = false">
            <span class="sr-only">Закрыть меню</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href" :class="`-mx-3 flex items-center transition-all duraction-300 gap-x-3 rounded-xl px-3 py-2 text-base/7 font-semibold text-gray-900 ${item.active ? 'bg-emerald-600 text-white' : 'hover:bg-gray-200 '}`">
                <HomeIcon v-if="item.icon == 'dashboard'" class="size-6" />
                <ArrowsRightLeftIcon v-if="item.icon == 'operations'" class="size-6" />
                <BanknotesIcon v-if="item.icon == 'accumulation'" class="size-6" />  
                <span>{{ item.name }}</span>
              </a>
            </div>
            <div class="py-6">
              <RouterLink :to="{ name: 'MainPage' }" class="-mx-3 flex items-center transition-all duraction-300 gap-x-3 rounded-xl px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-emerald-600 hover:shadow-lg hover:text-white">
                <ArrowRightEndOnRectangleIcon class="size-6" />
                <span>Выйти</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </div>
</template>

<script setup>
  import { ArrowRightEndOnRectangleIcon, ArrowsRightLeftIcon, BanknotesIcon, HomeIcon } from '@heroicons/vue/24/outline';
  import Logo from './Logo.vue';
  import { Dialog, DialogPanel } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  import { ref } from 'vue'

  const navigation = [
    { name: 'Панель', href: '#', icon: "dashboard", active: true },
    { name: 'Операции', href: '#', icon: "operations", active: false },
    { name: 'Накопления', href: '#', icon: "accumulation", active: false }
  ]

  const mobileMenuOpen = ref(false)
</script>