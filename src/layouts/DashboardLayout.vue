<template>
  <div class="w-full relative">
    <Sidebar />
    <main :class="`${props.mainClasses ?? ''} lg:ml-54 xl:ml-72 p-8 z-10 relative`">
      <slot />
    </main>
  </div>
</template>

<script setup>
  import Sidebar from '@/components/Sidebar.vue';

  const props = defineProps({
    mainClasses: String
  })
</script>