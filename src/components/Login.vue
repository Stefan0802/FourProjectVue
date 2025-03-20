<template>
  <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name
        <input type="text" required v-model="username">
      </label>
    <label>Password
      <input type="text">
    </label>
  </form>
</template>