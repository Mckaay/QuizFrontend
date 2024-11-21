<script setup>
  import {ref} from "vue";
  import {getQuizData, getSingleQuizData} from "../composables/api.js";
  import {login,logout} from "../composables/auth.js";

  const email = ref('');
  const password = ref('');
</script>

<template>
  <div class="form-wrapper">
    <form @submit.prevent="login(email,password)" action="http://localhost/login" method="POST">
      <input type="email" v-model="email" name="email">
      <input type="password" v-model="password" name="password">
      <button type="submit">Login</button>
    </form>

    <button @click="getSingleQuizData('01jd7b5gv7kf0tnr4nm5fdnzxc')" type="button">Fetch data</button>
    <button @click="logout" type="button">Logout</button>
  </div>
  <div>{{ email }}</div>
  <div>{{ password }}</div>
</template>

<style lang="scss" scoped>

</style>