<template>
  <router-view v-slot="{ Component }">
    <Transition name="bounce" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>
