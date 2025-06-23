<template>
  <div class="w-2xs flex flex-col fixed border-r-1 border-gray-100 h-screen">
    <div class="px-6 overflow-y-auto flex flex-col grow">
      <div class="flex shrink-0 items-center h-20">
        <Logo class="w-auto h-20" />
      </div>
      <nav class="flex flex-col flex-1">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li class="mt-auto">
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
</template>

<script setup>
  import { ArrowRightEndOnRectangleIcon, ArrowsRightLeftIcon, BanknotesIcon, HomeIcon } from '@heroicons/vue/24/outline';
  import Logo from './Logo.vue';

  const navigation = [
    { name: 'Панель', href: '#', icon: "dashboard", active: true },
    { name: 'Операции', href: '#', icon: "operations", active: false },
    { name: 'Накопления', href: '#', icon: "accumulation", active: false }
  ]
</script>