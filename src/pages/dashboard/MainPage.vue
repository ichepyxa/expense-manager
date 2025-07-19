<template>
  <div class="w-full relative">
    <Sidebar />
    <main class="lg:ml-72 p-8 z-10 relative lg:flex justify-around lg:gap-x-5">
      <div class="w-full lg:w-1/2 xl:w-1/3">
        <div class="flex gap-y-5 flex-col sm:gap-x-5 sm:flex-row lg:flex-col justify-around items-center">
          <div class="border-1 border-gray-500 shadow-lg rounded-2xl p-5 h-48 max-w-96 w-full relative">
            <h3 class="font-semibold text-sm text-gray-700">Текущий баланс</h3>
            <div class="text-4xl mt-5">{{ new Intl.NumberFormat('ru-RU').format(balance) }}<span class="text-emerald-600 ml-2">BYN</span></div>
            <div class="flex justify-end items-center w-full mt-6 gap-x-3">
              <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <MinusIcon class="size-6" />
              </button>
              <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <PlusIcon class="size-6" />
              </button>
            </div>
          </div>
          <div class="border-1 border-gray-500 shadow-lg rounded-2xl p-5 h-48 max-w-96 w-full relative">
            <h3 class="font-semibold text-sm text-gray-700">Накопления</h3>
            <div class="text-4xl mt-5">{{ new Intl.NumberFormat('ru-RU').format(accumulations) }}<span class="text-emerald-600 ml-2">BYN</span></div>
            <div class="flex justify-end items-center w-full mt-6 gap-x-3">
              <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <MinusIcon class="size-6" />
              </button>
              <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
                <PlusIcon class="size-6" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-full mt-7 border-1 border-gray-500 rounded-2xl p-5 shadow-lg">
          <h3 class="text-md font-semibold text-emerald-600 pb-5 border-b-2 border-gray-200">Последние операции</h3>
          <ul class="w-full">
            <template v-if="operations && operations.length > 0">
              <li class="overflow-hidden cursor-pointer border-transparent hover:border-gray-200 transition-all duration-300 py-3 flex items-center w-full group" v-for="operation in operations.slice(-3)">
                
                <div v-if="operation.type == 'INCOME'" class="w-4 h-4 bg-emerald-600 rounded-full"></div>
                <div v-else-if="operation.type == 'EXPENSES'" class="w-4 h-4 bg-red-600 rounded-full"></div>
                <div v-else class="w-4 h-4 bg-gray-400 rounded-full"></div>
                
                <div class="ml-2">
                  <p class="text-black text-md">{{ !operation.typePurchase ? "Накопления" : operation.typePurchase }}</p>
                  <p class="text-gray-400 text-sm font-semibold">07.06.2025 18:40</p>
                </div>

                <div v-if="operation.type == 'INCOME'" class="flex items-center ml-auto text-emerald-600">
                  <PlusIcon class="size-4" />
                  <span>{{ operation.amount }}</span>
                  <span class="ml-1">BYN</span>
                </div>
                <div v-else-if="operation.type == 'EXPENSES'" class="flex items-center ml-auto text-red-600">
                  <MinusIcon class="size-4" />
                  <span>{{ operation.amount }}</span>
                  <span class="ml-1">BYN</span>
                </div>
                <div v-else class="flex items-center ml-auto text-black">
                  <span>{{ operation.amount }}</span>
                  <span class="ml-1">BYN</span>
                </div>

                <div class="ml-3 -mr-6 right-arrow group-hover:mr-1 transition-all duration-300 hidden sm:block">
                  <ArrowRightIcon class="size-5" />
                </div>
              </li>
            </template>
            <template v-else>
              <div class="text-center my-5">Операции отсутствуют</div>
            </template>
          </ul>
        </div>

      </div>
      <div class="relative w-full lg:w-1/2">
        <div class="hidden sm:block mt-7 lg:mt-0 border-1 border-gray-500 rounded-2xl p-5 shadow-lg">
          <h3 class="text-md font-semibold text-emerald-600 mb-2">Расходы за месяц</h3>
          <ChartDasboardPage />
        </div>

        <div class="mt-5">
          <h3 class="text-md font-semibold text-emerald-600 mb-2">Основные расходы за месяц</h3>
          
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
  import ChartDasboardPage from '@/components/ChartDasboardPage.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import { ArrowRightIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import { useStore } from 'vuex'

  const store = useStore()

  const balance = store.getters["finances/balance"]
  const accumulations = store.getters["finances/accumulations"]
  const operations = store.getters["finances/operations"]
</script>