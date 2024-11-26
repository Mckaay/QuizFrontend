<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/auth.js";
import PrimaryButton from "@/components/Button/PrimaryButton.vue";
import ErrorMessage from "@/components/Form/ErrorMessage.vue";

const email = ref("");
const password = ref("");

const userStore = useUserStore();
</script>

<template>
  <div class="form-wrapper">
    <form
      @submit.prevent="userStore.login(email, password)"
      action="/login"
      method="POST"
    >
      <div class="input-wrapper">
        <label for="email">Your email</label>
        <input
          type="email"
          v-model="email"
          name="email"
          placeholder="email@example.com"
        />
      </div>
      <div class="input-wrapper">
        <label for="password">Your Password</label>
        <input type="password" v-model="password" name="password" />
      </div>
      <PrimaryButton type="submit" text="Login" />
      <ErrorMessage
        v-if="userStore.errorMessage"
        :message="userStore.errorMessage"
      />
    </form>
  </div>
</template>

<style>
.form-wrapper {
  height: 400px;
  display: grid;
  place-items: center;
}

form {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);

  @media screen and (min-width: 768px) {
    width: 60%;
  }

  @media screen and (min-width: 1100px) {
    width: 40%;
  }
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-25);
}

input {
  padding: var(--spacing-50);
}
</style>
