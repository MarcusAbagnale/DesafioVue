<template>
  <div class="p-5 col-8 mx-auto text-center">
    <input class="form-control my-3" placeholder="Pesquise por nome ou descrição" type="text" v-model="search"
      @input="performSearch">
    <button class="btn btn-primary m-2" @click="abrirFormularioCriarProduto">Criar Produto</button>
    <div>
      <div class="table-container">
        <table class="table table-striped">
          <thead>
            <tr class="thead-dark">
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Preço</th>
              <th scope="col">Data de Validade</th>
              <th scope="col">Imagem</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody class="table-striped">
            <tr v-for="produto in produtos" :key="produto.id">
              <td>{{ produto.nome }}</td>
              <td>{{ produto.descricao }}</td>
              <td>R$ {{ produto.preco.toString().replace('.', ',') }}</td>
              <td>{{ produto.data_validade }}</td>
              <td>
                <img class="img-thumbnail mx-auto" style="width: 80px;"
                  :src="'http://127.0.0.1:8000/fotos/' + produto.imagem" alt="Imagem do Produto" />
              </td>
              <td>
                <button class="btn btn-primary m-1" @click="editarProduto(produto)">Editar</button>
                <button class="btn btn-danger m-1" @click="excluirProduto(produto.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center">
        <Pagination :source="pagination" @navigate="navigate"></Pagination>
      </div>
    </div>

    <div class="form-container">
      <div class="form-container-criar" v-if="mostrarFormularioCriarProduto">
        <h3>Criar Novo Produto</h3>
        <form @submit.prevent="criarProduto" enctype="multipart/form-data">
          <div class="form-group p-2">
            <input class="form-control m-1" v-model="novoProduto.nome" placeholder="Nome" required />
            <textarea class="form-control m-1" v-model="novoProduto.descricao" placeholder="Descrição"
              required></textarea>
            <input class="form-control m-1" type="text" placeholder="Preço" v-model="novoProduto.preco">
            <input class="form-control m-1" v-model="novoProduto.data_validade" type="date" required
              @input="validarDataValidade" />
            <p v-if="dataValidadeInvalida">A data de validade deve ser maior ou igual à data atual.</p>
            <select class="form-control m-1" v-model="novoProduto.categoria_id" required>
              <option disabled value="">Selecione uma categoria</option>
              <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nome }}
              </option>
            </select>
            <input class="form-control-file m-3" type="file" @change="handleImagemUpload" accept="image/*" required />
          </div>
          <button class="btn btn-primary" type="submit">Criar</button>
        </form>
      </div>

      <div class="form-container-editar" v-if="mostrarFormularioEditarProduto">
        <h3>Editar Produto</h3>
        <form @submit.prevent="atualizarProduto" enctype="multipart/form-data">
          <input class="form-control m-1" v-model="produtoEditando.nome" placeholder="Nome" required />
          <textarea class="form-control m-1" v-model="produtoEditando.descricao" placeholder="Descrição"
            required></textarea>
          <input class="form-control m-1" type="text" placeholder="Preço" v-model="produtoEditando.preco">
          <input class="form-control m-1" v-model="produtoEditando.data_validade" type="date" required
            @input="validarDataValidade" />
          <p v-if="dataValidadeInvalida">A data de validade deve ser maior ou igual à data atual.</p>
          <select class="form-control m-1" v-model="produtoEditando.categoria_id" required>
            <option disabled value="">Selecione uma categoria</option>
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nome }}
            </option>
          </select>
          <input class="form-control-file m-3" type="file" @change="handleImagemUpload" accept="image/*" />
          <button class="form-control m-1" type="submit">Salvar Alterações</button>
        </form>
      </div>
      <div v-if="isLoading" class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Pagination from './PaginationComponent.vue';

export default {
  components: {
    Pagination
  },
  data() {
    return {
      isLoading: false,
      produtos: [],
      categorias: [],
      novoProduto: {
        nome: '',
        descricao: '',
        preco: null,
        data_validade: '',
        imagem: null,
        categoria_id: null,
      },
      dataValidadeInvalida: false,
      produtoEditando: null,
      mostrarFormularioCriarProduto: false,
      mostrarFormularioEditarProduto: false,
      pagination: {},
      search: '',
    };
  },
  watch: {
    'novoProduto.preco': function (newVal) {
      if (typeof newVal === 'string') {
        let value = newVal.replace(/[^0-9,]*/g, '');
        let parts = value.split(',');
        if (parts.length > 1) {
          parts[1] = parts[1].substring(0, 2);
          this.novoProduto.preco = parts.join(',');
        } else {
          this.novoProduto.preco = parts[0];
        }
      }
    },
    'produtoEditando.preco': function (newVal) {
      if (typeof newVal === 'string') {
        let value = newVal.replace(/[^0-9,]*/g, '');
        let parts = value.split(',');
        if (parts.length > 1) {
          parts[1] = parts[1].substring(0, 2);
          this.produtoEditando.preco = parts.join(',');
        } else {
          this.produtoEditando.preco = parts[0];
        }
      }
    }
  },
  methods: {
    navigate(page) {
      this.carregarProdutos(page);
    },
    async carregarProdutos(page) {
      this.isLoading = true; // Define isLoading para true antes de iniciar a solicitação.
      try {
        let apiUrl = 'http://127.0.0.1:8000/api/produtos';

        if (page !== null && page !== undefined) {
          apiUrl += `?page=${page}`;
        }
        if (this.search) {
          apiUrl += `/search?query=${this.search}`;
        }
        const response = await axios.get(apiUrl);
        this.produtos = response.data.data;
        this.pagination = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async pesquisaProdutos() {
      try {
        let apiUrls = 'http://127.0.0.1:8000/api/produtos/search';

        if (this.search) {
          apiUrls += `?query=${this.search}`;
        }
        console.log(apiUrls);
        const response = await axios.get(apiUrls);
        this.produtos = response.data.data;
        this.pagination = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async carregarCategorias() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categorias');
        this.categorias = response.data.categorias;
      } catch (error) {
        console.error(error);
      }
    },
    performSearch() {
      this.pesquisaProdutos();
    },
    async criarProduto() {
      try {
        if (this.dataValidadeInvalida) {
          return;
        }
        const formData = new FormData();
        formData.append('nome', this.novoProduto.nome);
        formData.append('descricao', this.novoProduto.descricao);
        formData.append('preco', this.novoProduto.preco.toString());
        formData.append('data_validade', this.novoProduto.data_validade);
        formData.append('categoria_id', this.novoProduto.categoria_id.toString());
        formData.append('imagem', this.novoProduto.imagem);

        const response = await axios.post(
          'http://127.0.0.1:8000/api/produtos',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        this.produtos.push(response.data);
        this.novoProduto = {
          nome: '',
          descricao: '',
          preco: null,
          data_validade: '',
          imagem: null,
          categoria_id: null,
        };
        this.mostrarFormularioCriarProduto = false;
      } catch (error) {
        console.log(error);
      }
    },
    abrirFormularioCriarProduto() {
      this.novoProduto = {
        nome: '',
        descricao: '',
        preco: null,
        data_validade: '',
        imagem: null,
        categoria_id: null,
      };
      this.mostrarFormularioCriarProduto = true;
      this.mostrarFormularioEditarProduto = false;
    },
    editarProduto(produto) {
      if (this.dataValidadeInvalida) {
        return;
      }
      this.produtoEditando = { ...produto };
      this.mostrarFormularioCriarProduto = false;
      this.mostrarFormularioEditarProduto = true;
    },
    async atualizarProduto() {
      try {
        const formData = new FormData();
        formData.append('nome', this.produtoEditando.nome);
        formData.append('descricao', this.produtoEditando.descricao);
        formData.append('preco', this.produtoEditando.preco.toString());
        formData.append('data_validade', this.produtoEditando.data_validade);
        formData.append('categoria_id', this.produtoEditando.categoria_id.toString());
        formData.append('imagem', this.produtoEditando.imagem);

        const response = await axios.post(`http://127.0.0.1:8000/api/produtos/${this.produtoEditando.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const updatedProduct = response.data;

        const index = this.produtos.findIndex(produto => produto.id === updatedProduct.id);

        if (index !== -1) {

          this.produtos.splice(index, 1, updatedProduct);
        }

        this.produtoEditando = null;
        this.mostrarFormularioEditarProduto = false;
      } catch (error) {
        console.error('Erro na edição de produto:', error);
      }
    },

    excluirProduto(produtoId) {
      axios
        .delete(`http://127.0.0.1:8000/api/produtos/${produtoId}`)
        .then(() => {
          this.carregarProdutos();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validarDataValidade() {
      const dataAtual = new Date().toISOString().split('T')[0];
      if (this.novoProduto.data_validade < dataAtual) {
        this.dataValidadeInvalida = true;
        this.novoProduto.data_validade = '';
        this.produtoEditando.data_validade = '';
      } else {
        this.dataValidadeInvalida = false;
      }
    },
    handleImagemUpload(event) {
      const file = event.target.files[0];

      if (this.mostrarFormularioCriarProduto) {
        this.novoProduto.imagem = file;
      } else if (this.mostrarFormularioEditarProduto) {
        this.produtoEditando.imagem = file;
      }
    },
  },
  mounted() {
    this.carregarProdutos();
    this.carregarCategorias();
  },
};
</script>
