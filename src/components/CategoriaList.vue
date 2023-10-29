<template>
  <div class="p-5 col-8 mx-auto  container">
    <h2>Lista de Categorias</h2>
    <ul class="list-group d-flex   justify-content-center">
      <li class="list-group-item" v-for="categoria in categorias" :key="categoria.id">
        {{ categoria.nome }}
        <button class="btn btn-primary" @click="editarCategoria(categoria)">Editar</button>
        <button class="btn btn-danger" @click="excluirCategoria(categoria.id)">Excluir</button>
      </li>
    </ul>

    <form @submit.prevent="criarCategoria">
      <input class="form-group p-2 m-2 r" type="text" v-model="novaCategoria" placeholder="Nova Categoria">
      <button class="btn btn-primary" type="submit">Criar Categoria</button>
    </form>

    <form v-if="categoriaEditando" @submit.prevent="atualizarCategoria">
      <input type="text" v-model="categoriaEditando.nome">
      <button class="btn btn-primary" type="submit">Salvar Edição</button>
    </form>

    <div v-if="isLoading" class="d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <p v-if="mensagemSucesso" class="success">{{ mensagemSucesso }}</p>
    <p v-if="mensagemErro" class="error">{{ mensagemErro }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const categorias = ref<Categoria[]>([]);
const novaCategoria = ref<string>('');
const categoriaEditando = ref<Categoria | null>(null);
const mensagemSucesso = ref<string>('');
const mensagemErro = ref<string>('');
const isLoading = ref(false);

interface Categoria {
  id: number;
  nome: string;
}

const carregarCategorias = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get<{ categorias: Categoria[] }>('http://127.0.0.1:8000/api/categorias');
    categorias.value = response.data.categorias;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false; 
  }
};

const criarCategoria = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/categorias', { nome: novaCategoria.value });
    carregarCategorias();
    novaCategoria.value = '';
    mensagemSucesso.value = 'Categoria criada com sucesso!';
    mensagemErro.value = '';
  } catch (error) {
    console.error(error);
    mensagemErro.value = 'Erro ao criar a categoria.';
    mensagemSucesso.value = '';
  }
};

const editarCategoria = (categoria: Categoria) => {
  categoriaEditando.value = categoria;
};

const atualizarCategoria = async () => {
  if (categoriaEditando.value) {
    try {
      await axios.put(`http://127.0.0.1:8000/api/categorias/${categoriaEditando.value.id}`, {
        nome: categoriaEditando.value.nome,
      });
      carregarCategorias();
      categoriaEditando.value = null;
      mensagemSucesso.value = 'Categoria atualizada com sucesso!';
      mensagemErro.value = '';
    } catch (error) {
      console.error(error);
      mensagemErro.value = 'Erro ao atualizar a categoria.';
      mensagemSucesso.value = '';
    }
  }
};

const excluirCategoria = async (categoriaId: number) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/categorias/${categoriaId}`);
    carregarCategorias();
    mensagemSucesso.value = 'Categoria excluída com sucesso!';
    mensagemErro.value = '';
  } catch (error) {
    console.error(error);
    mensagemErro.value = 'Erro ao excluir a categoria.';
    mensagemSucesso.value = '';
  }
};



onMounted(() => {
  carregarCategorias();
});
</script>

<style scoped>
.success {
  color: green;
}

.error {
  color: red;
}
</style>
