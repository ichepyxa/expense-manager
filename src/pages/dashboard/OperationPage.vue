<template>
  <DashboardLayout>
    <div v-if="operation" class="w-full py-10 px-8 sm:p-15">
      <h2 class="text-center text-2xl mb-7">Операция <strong>№{{ operation.id }}</strong></h2>
      <div class="@container w-full">
        <p class="text-xl"><strong>Подробности:</strong></p>
        <p class="text-md mt-6"><strong>Наименование операции: </strong>{{ operation.typePurchase }}</p>
        <p class="text-md mt-2">
          <strong>Тип операции: </strong>
          <span v-if="operation.type == 'INCOME'">Прибыль</span>
          <span v-else-if="operation.type == 'EXPENSES'">Траты</span>
          <span v-else>Накопление</span>
        </p>
        
        <p class="text-md mt-2">
          <strong>Сумма: </strong>
          {{ operation.date }}</p>
        <p class="text-md mt-2"><strong>Дата операции: </strong>{{ operation.date }}</p>

        <ul class="w-full flex flex-col @xs:flex-row items-center gap-y-5 @xs:gap-y-0 gap-x-5 justify-end mt-10">
          <li class="w-full @xs:w-fit">
            <button class="w-full px-5 py-3 border-emerald-600 border-1 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 cursor-pointer">Редактировать</button>
          </li>
          <li class="w-full @xs:w-fit">
            <button class="w-full px-5 py-3 border-red-600 border-1 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">Удалить</button>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="w-full flex justify-center items-center flex-col min-h-svh">
      <div class="text-center mb-10 font-semibold text-2xl">Операция отсутствует</div>
      <RouterLink :to="{ name: 'DashboardOperationsPage' }" class="cursor-pointer text-white font-semibold bg-emerald-600 px-5 py-3 rounded-xl">Вернуться</RouterLink>
    </div>
  </DashboardLayout>
</template>

<script setup>
  import DashboardLayout from '@/layouts/DashboardLayout.vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { useStore } from 'vuex';

  const store = useStore()
  const route = useRoute()

  const operation = store.getters["finances/operation"](route.params.id)
</script>