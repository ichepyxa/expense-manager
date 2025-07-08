<template>
  <div class="w-full relative">
    <Sidebar />
    <main class="lg:ml-72 h-[200vh] p-8 z-10 relative lg:flex lg:gap-x-5">
      <div class="w-full lg:w-1/2 xl:w-1/3">
        <div class="bg-gray-200 rounded-4xl p-5 h-48 max-w-96 w-full relative">
          <p class="font-semibold text-sm text-gray-700">Текущий баланс</p>
          <div class="text-4xl mt-5">{{ balance }}<span class="text-emerald-600 ml-2">BYN</span></div>
          <div class="flex justify-end items-center w-full mt-6 gap-x-3">
            <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
              <MinusIcon class="size-6" />
            </button>
            <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
              <PlusIcon class="size-6" />
            </button>
          </div>
        </div>
        <div class="bg-gray-200 rounded-4xl p-5 h-48 max-w-96 w-full relative mt-5">
          <p class="font-semibold text-sm text-gray-700">Накопления</p>
          <div class="text-4xl mt-5">{{ accumulations }}<span class="text-emerald-600 ml-2">BYN</span></div>
          <div class="flex justify-end items-center w-full mt-6 gap-x-3">
            <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
              <MinusIcon class="size-6" />
            </button>
            <button class="flex gap-x-3 items-center border-gray-500 text-gray-500 border-1 rounded-xl cursor-pointer py-2 px-3 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300">
              <PlusIcon class="size-6" />
            </button>
          </div>
        </div>
        <div class="w-full mt-7">
          <h3 class="text-md font-semibold text-emerald-600 pb-5 border-b-2 border-gray-200">Последние операции</h3>
          <ul>
            <template v-if="operations && operations.length > 0">
              <li class="overflow-hidden cursor-pointer border-transparent hover:border-gray-200 transition-all duration-300 py-3 flex items-center w-full group" v-for="operation in operations.slice(-4)">
                
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
      <div class="w-full lg:w-1/2">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </main>
  </div>
</template>

<script setup>
  import Sidebar from '@/components/Sidebar.vue'
  import { ArrowRightIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
  import { useStore } from 'vuex'

  import { Line } from 'vue-chartjs'
  import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler} from 'chart.js'
  import { styles } from '@/config/styles'

  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [ 
      {
        label: 'Looping tension',
        data: [65, 59, 80, 81, 26, 55, 40]
      }
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right"
      }
    },
    elements: {
      line: {
        tension: 0.25,
        borderWidth: 2,
        backgroundColor: (ctx) => {
          const canvas = ctx.chart.ctx;
          const gradient = canvas.createLinearGradient(0,0,0,160);

          gradient.addColorStop(0, styles.primaryColor);
          gradient.addColorStop(0.9, "oklch(59.6% 0.145 163.225 / 0.05)");

          return gradient;
        },
        borderJoinStyle: "round",
        borderColor: styles.primaryColor,
        fill: true
      }
    }
  }

  const store = useStore()
  
  store.dispatch("finances/addOperation", {
    type: "INCOME",
    typePurchase: "",
    amount: 1000
  })

  store.dispatch("finances/addOperation", {
    type: "ACCUMULATION",
    amount: 50000
  })
  store.dispatch("finances/addOperation", {
    type: "EXPENSES",
    amount: 54000
  })
  
  store.dispatch("finances/addOperation", {
    type: "WITHDRAW_ACCUMULATION",
    amount: 54000
  })

  
  
  const balance = store.getters["finances/balance"]
  const accumulations = store.getters["finances/accumulations"]
  const operations = store.getters["finances/operations"]

</script>