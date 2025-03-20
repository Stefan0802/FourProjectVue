<template>
  <div class="login">
    <h1>Вход в систему</h1>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="credentials.email" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="credentials.password" required />
      </div>
      <button type="submit">Войти</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapMutations } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      errorMessage: '',
    };
  },
  methods: {
    ...mapMutations(['setToken']),
    async login() {
      try {
        const response = await api.login(this.credentials);
        this.setToken(response.data.data.user_token);
        this.$router.push('/');
      } catch (error) {
        if (error.response && error.response.data.error) {
          const { errors } = error.response.data.error;
          if (errors) {
            this.errorMessage = Object.values(errors).flat().join(', ');
          } else {
            this.errorMessage = error.response.data.error.message;
          }
        } else {
          this.errorMessage = 'Произошла ошибка. Попробуйте позже.';
        }
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}
form div {
  margin-bottom: 1rem;
}
input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #3aa876;
}
p {
  color: red;
  margin-top: 1rem;
}
</style>