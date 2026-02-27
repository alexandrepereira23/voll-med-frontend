# 🏥 Voll.med - Frontend

Bem-vindo ao frontend da **Voll.med**, uma plataforma moderna para gestão de clínicas médicas, agendamento de consultas e administração de profissionais de saúde.

Este projeto foi desenvolvido com foco em performance, tipagem estática e uma experiência de usuário fluida, utilizando as tecnologias mais recentes do ecossistema React.

---

## 🚀 Tecnologias e Ferramentas

O projeto utiliza uma stack moderna e robusta:

- **[React 19](https://react.dev/)**: Biblioteca principal para construção da interface.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build extremamente rápida.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e produtividade.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Estilização baseada em utilitários para um design responsivo e customizável.
- **[React Query (TanStack Query)](https://tanstack.com/query/latest)**: Gerenciamento de estado assíncrono e cache de dados da API.
- **[React Hook Form](https://react-hook-form.com/)** & **[Zod](https://zod.dev/)**: Validação de formulários robusta e tipada.
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones consistentes e leves.
- **[Axios](https://axios-http.com/)**: Cliente HTTP para consumo da API.

---

## 🛠️ Funcionalidades Principais

- **🩺 Gestão de Médicos**: Listagem, cadastro e edição de profissionais com especialidades.
- **👥 Gestão de Pacientes**: Controle completo de dados dos pacientes.
- **📅 Agendamento de Consultas**: Fluxo intuitivo para marcar e visualizar agendas médicas.
- **🎨 Design Responsivo**: Interface adaptável para diferentes tamanhos de tela.
- **🛡️ Validação de Dados**: Garantia de integridade das informações via formulários.

---

## 📁 Estrutura do Projeto

A organização segue os princípios de **Features**:

```text
src/
├── components/     # Componentes globais e reutilizáveis
├── features/       # Módulos específicos (consultas, medicos, pacientes)
│   └── [feature]/  # Componentes, hooks e serviços locais
├── layouts/        # Estruturas de página (Header, Footer, Sidebar)
├── lib/            # Configurações de bibliotecas externas (Axios, QueryClient)
├── routes/         # Definição das rotas da aplicação
└── services/       # Serviços globais de API
```

---

## ⚙️ Instalação e Uso

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Passos

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/api-voll.med.git
   cd api-voll.med/voll-med-frontend
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto com a URL da API:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O projeto estará disponível em `http://localhost:5173`.

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção otimizada.
- `npm run lint`: Executa a verificação do ESLint.
- `npm run preview`: Visualiza o build de produção localmente.

---

## 📄 Licença

Este projeto é para fins educacionais. Sinta-se à vontade para explorar e aprender!
