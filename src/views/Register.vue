<template>
  <div class="register">
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <div>
        <label>ФИО:
          <input type="text" v-model="formData.fio" :class="{ error: errors.fio }" required>
        </label>
        <p v-if="errors.fio">{{ errors.fio[0] }}</p>
      </div>
      <div>
        <label>Email:
          <input type="text" v-model="formData.email" :class="{ error: errors.email }">
        </label>
        <p v-if="errors.email">{{ errors.email[0] }}</p>
      </div>
      <div>
        <label>Пароль:
          <input type="password" v-model="formData.password" :class="{ error: errors.password}">
        </label>
        <p v-if="errors.password">{{ errors.password[0] }}</p>
      </div>
      <button type="submit">Зарегстрироваться</button>
      <a href="http://localhost:8080/login">Авторизироавться</a>
    </form>
    <p v-if="successMessage">{{ successMessage }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '@/utils/api';
import { mapMutations } from 'vuex';

export default {
  name: 'RegisterView',
  data(){
    return{
      formData:{
        fio: '',
        email: '',
        password: ''
      },
      errors: {},
      successMessage: '',
      errorMessage: ''
    }
  },
  methods:{
    ...mapMutations(['setToken']),
    async register(){
      try {
        this.errors = {};
        const response = await  api.register(this.formData)
        if(response.data.data.user_token){
          this.setToken(response.data.data.user_token);
          this.successMessage = 'Вы успешно зарегестрировались!';
          setTimeout(() =>{
            this.$router.push('/login');
          }, 2000);
        }
      } catch (error){
        if(error.response && error.response.data.error){
          const { errors } = error.response.data.error;
          this.errors= errors || {};
          this.errorMessage = 'Ошибка ргеистрации. Проверьте введенные данные.';

          console.error('Ошибка валидации:', errors);
        }else{
          this.errorMessage = 'Произошла ошибка. Попробуйте позже.';
        }
      }
    }
  }
}

</script>


<style scoped>
.register{
  max-width: 400px;
  margin: 0 auto;
}
form div{
  margin-bottom: 1rem;
}
input{
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

input.error{
  border-color: red;
}

p{
  color: red;
  margin: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover{
  background-color: #3aa876;
}

</style>