# DesafioVue
Desafio de Desenvolvimento de FrontEnd em Vue

Este é um projeto Vue.js que utiliza várias bibliotecas e plugins importantes para fornecer funcionalidades avançadas e melhorar a experiência do desenvolvedor.

Bibliotecas e plugins utilizados
Vue.js: Um framework JavaScript progressivo para construir interfaces de usuário.
Vue Router: O roteador oficial para Vue.js. Ele integra profundamente com o Vue.js para facilitar a construção de aplicativos de página única.
Axios: Uma biblioteca JavaScript popular usada para fazer solicitações HTTP a partir do navegador. É amplamente utilizada por sua API fácil de usar e promessa baseada.
Bootstrap: Uma biblioteca CSS popular para desenvolver projetos responsivos e móveis na web.
Vite: Uma ferramenta de construção moderna que oferece uma experiência de desenvolvimento mais rápida e mais eficiente.
ESLint: Uma ferramenta de análise de código estático para identificar padrões problemáticos encontrados no código JavaScript.
Prettier: Um formatador de código opinativo que força um estilo consistente, formatando automaticamente o código.
TypeScript: Um superconjunto tipado de JavaScript que compila para JavaScript simples.
Lodash: Uma biblioteca JavaScript moderna que oferece utilitários modulares.
Como instalar
Clone o repositório para sua máquina local usando https://github.com/MarcusAbagnale/DesafioVue
Mude para o diretório do projeto: cd desafio-f
Instale as dependências do projeto: npm install
Inicie o servidor de desenvolvimento: npm run serve

Usando Docker
Construa a imagem Docker. No diretório do projeto, execute o seguinte comando para construir uma imagem Docker para o aplicativo:
docker build -t desafio-f .

Este comando cria uma nova imagem Docker chamada desafio-f que contém todas as dependências necessárias para executar o aplicativo.

Execute o contêiner Docker. Depois de construir a imagem, você pode iniciar um contêiner usando essa imagem com o seguinte comando:
docker run -p 8080:8080 desafio-f

Este comando inicia um novo contêiner Docker que executa o aplicativo Vue.js na porta 8080.

Agora, você pode abrir seu navegador e visitar http://localhost:8080 para ver o aplicativo em ação.

Por favor, note que você precisa ter o Docker instalado em sua máquina para usar esses comandos. Se você não tiver o Docker instalado, você pode baixá-lo do site oficial do Docker.
Como usar
Depois de iniciar o servidor de desenvolvimento, você pode abrir seu navegador e visitar http://localhost:8080 para ver o aplicativo em ação.

Contribuindo
Contribuições são sempre bem-vindas! Se você tiver alguma sugestão ou problema, sinta-se à vontade para abrir uma issue ou fazer um pull request.
