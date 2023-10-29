<template>
  <header>
    <div class="container text-center">
      <HelloWorld msg="Bem vindo!" />
      <div class="container">
        <input
          type="text"
          class="form-group form-control my-3"
          id="tokenInput"
          placeholder="Insira o token aqui"
          v-model="token"
        />
        <button class="btn btn-primary" @click="setToken">Definir Token</button>
      </div>

      <div class="container m-5 text-center" v-if="tokenDefined">
        <nav class="navbar navbar-expand-lg bg-success-subtle">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Menu</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <RouterLink to="/categorias" class="nav-link btn-secondary m-2 rounded">Categorias</RouterLink>
                <RouterLink to="/produtos" class="nav-link btn-secondary m-2 rounded">Produtos</RouterLink>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>

  <RouterView v-if="tokenDefined" />
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      token: '',
      tokenDefined: false, 
    };
  },
  methods: {
    setToken(): void {
      const token: string = this.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.tokenDefined = true;
    },
  },
});
</script>
