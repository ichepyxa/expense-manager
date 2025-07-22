<template>
  <DashboardLayout main-classes="p-8">
    <h2 class="text-center text-2xl mb-3">Операции</h2>
    <div class="w-full">
      <div class="gap-x-2 px-3 w-full border-b-2 border-gray-200 text-gray-400 pb-3 flex justify-around">
        <div class="flex-2/3">Название</div>
        <div class="flex-1/3">Сумма</div>
        <div class="flex-1/3">Дата</div>
      </div>
      <ul class="flex flex-col w-full">
        <template v-if="operations && operations.length > 0">
          <RouterLink v-for="operation in operations" :key="operation.id" :to="{ name: 'DashboardOperationPage', params: { id: operation.id } }" class="gap-x-2 px-3 cursor-pointer not-last:border-b-2 border-gray-200 hover:bg-gray-200 transition-all duration-300 py-3 flex items-center w-full">
            <div class="flex-2/3 break-words">{{ operation.typePurchase }}</div>
            <div class="flex-1/3">
              <div v-if="operation.type == 'INCOME'" class="flex items-center text-emerald-600">
                <PlusIcon class="size-4" />
                <span class="ml-1">{{ operation.amount }}</span>
                <span class="ml-1">BYN</span>
              </div>
              <div v-else-if="operation.type == 'EXPENSES'" class="flex items-center text-red-600">
                <MinusIcon class="size-4" />
                <span class="ml-1">{{ operation.amount }}</span>
                <span class="ml-1">BYN</span>
              </div>
              <div v-else class="flex items-center text-black">
                <span>{{ operation.amount }}</span>
                <span class="ml-1">BYN</span>
              </div>
            </div>
            <div class="flex-1/3 font-semibold text-sm">{{ operation.date }}</div>
          </RouterLink>
        </template>
        <template v-else>
          <div class="text-center my-5">Операции отсутствуют</div>
        </template>
      </ul>
    </div>
  </DashboardLayout>
</template>

<script setup>
  import DashboardLayout from '@/layouts/DashboardLayout.vue';
  import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';
  import { RouterLink } from 'vue-router';
  import { useStore } from 'vuex';

  const store = useStore()

  const operations = store.getters["finances/operations"]
</script>