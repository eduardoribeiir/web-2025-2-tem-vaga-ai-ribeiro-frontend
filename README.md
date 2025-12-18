# 🎨 Frontend - Tem Vaga Aí

<div align="center">

### _Interface moderna e intuitiva para busca de vagas estudantis_

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## 🎯 Sobre

SPA (Single Page Application) desenvolvida com as melhores práticas de engenharia de software, oferecendo:

- 🎨 **UI/UX Moderna** - Interface clean e responsiva com Tailwind CSS
- 🏗️ **Clean Architecture** - Código organizado em camadas bem definidas
- 🔐 **Autenticação Completa** - Sistema de login, registro e perfil de usuário
- 🏠 **Gerenciamento de Anúncios** - CRUD completo com suporte a rascunhos
- ❤️ **Sistema de Favoritos** - Salve suas vagas preferidas
- 🔍 **Filtros Avançados** - Busca por preço, localização e comodidades
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em qualquer dispositivo
- ⚡ **Performance Otimizada** - Build ultrarrápido com Vite

---

## 🛠️ Stack Tecnológico

```typescript
interface TechStack {
  library: "React 18",
  language: "TypeScript 5.7",
  buildTool: "Vite 6.4",
  styling: "Tailwind CSS 3.4",
  routing: "React Router",
  architecture: "Clean Architecture",
  patterns: ["SOLID", "Repository Pattern", "Use Cases"]
}
```

### 📦 Principais Dependências

- **React 18** - Biblioteca UI com hooks modernos
- **TypeScript** - Tipagem estática para código mais seguro
- **Vite** - Build tool next-gen com HMR instantâneo
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento declarativo

---

## 📁 Arquitetura do Projeto

Seguindo os princípios da **Clean Architecture** e **SOLID**:

```
frontend/
├── src/
│   ├── domain/                    # 🏛️ Camada de Domínio
│   │   ├── entities/
│   │   │   └── Ad.ts             # Entidade anúncio
│   │   └── repositories/
│   │       └── IAdsRepository.ts # Contrato do repositório
│   │
│   ├── application/               # 📋 Camada de Aplicação
│   │   └── useCases/
│   │       ├── GetAdsUseCase.ts
│   │       ├── CreateAdUseCase.ts
│   │       ├── UpdateAdUseCase.ts
│   │       ├── DeleteAdUseCase.ts
│   │       └── ...
│   │
│   ├── infrastructure/            # 🔧 Camada de Infraestrutura
│   │   ├── api/
│   │   │   └── HttpClient.ts     # Cliente HTTP (Fetch API)
│   │   └── repositories/
│   │       └── AdsRepository.ts  # Implementação do repositório
│   │
│   └── presentation/              # 🎨 Camada de Apresentação
│       ├── components/            # Componentes reutilizáveis
│       │   ├── Navbar.tsx
│       │   ├── Footer.tsx
│       │   ├── AdGallery.tsx
│       │   └── ...
│       ├── pages/                 # Páginas da aplicação
│       │   ├── HomePage.tsx
│       │   ├── LoginPage.tsx
│       │   ├── NovoAnuncioPage.tsx
│       │   ├── MeusAnunciosPage.tsx
│       │   └── ...
│       ├── context/               # Contextos React
│       │   ├── AuthContext.tsx   # Autenticação global
│       │   └── FavoritesContext.tsx
│       ├── hooks/                 # Hooks customizados
│       │   ├── useAds.ts
│       │   ├── useAuth.ts
│       │   └── useFavorites.ts
│       └── App.tsx                # Componente raiz + rotas
│
├── public/                        # Assets estáticos
├── index.html                     # HTML root
├── .env.local                     # Variáveis de ambiente
├── vite.config.ts                 # Configuração Vite
├── tailwind.config.js             # Configuração Tailwind
└── package.json
```

### 🏛️ Princípios Aplicados

- **Separation of Concerns**: Cada camada tem responsabilidade única
- **Dependency Inversion**: Domínio não depende de frameworks
- **Single Responsibility**: Classes com propósito bem definido
- **Interface Segregation**: Contratos específicos e coesos
- **Open/Closed**: Aberto para extensão, fechado para modificação

---

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend rodando em `http://localhost:4000`

### 1. Entre no diretório

```bash
cd frontend
```

### 2. Verifique as variáveis de ambiente

O arquivo `.env.local` já está configurado:

```env
VITE_API_URL=http://localhost:4000/api
```

> Se o backend estiver em outra porta, ajuste aqui!

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o aplicativo

**Modo Desenvolvimento:**
```bash
npm run dev
```

✅ Aplicação rodando em: **http://localhost:5173** 🎉

**Build de Produção:**
```bash
npm run build
```

**Preview do Build:**
```bash
npm run preview
```

---

## 🧪 Como Testar

### Fluxo Completo de Teste Manual

#### 1️⃣ **Acesso Inicial**

```
1. Abra http://localhost:5173
2. Você verá a home com anúncios públicos
3. Use os filtros de preço, bairro e tipo
```

#### 2️⃣ **Criar Conta**

```
1. Clique em "Criar conta" no topo
2. Preencha: nome, email, senha
3. Clique em "Criar conta"
4. ✅ Você será redirecionado logado!
```

#### 3️⃣ **Login**

```
1. Clique em "Entrar"
2. Use email e senha cadastrados
3. ✅ Redirecionado para home logado
```

#### 4️⃣ **Criar Anúncio**

```
1. Menu usuário → "Novo Anúncio"
2. Preencha os dados:
   - Título: "Quarto em República"
   - Descrição: "Próximo à UFC, wifi incluso"
   - Localização: "Centro"
   - Preço: 450
   - Quartos: 1, Banheiros: 1
   - Comodidades: Marque "Wi-Fi", "Ar-condicionado"
   - Regras: Marque "Não fumantes"
3. Escolha:
   - "Salvar rascunho" (privado)
   - "Publicar anúncio" (público)
```

#### 5️⃣ **Gerenciar Anúncios**

```
1. Menu usuário → "Meus Anúncios"
2. Veja seções:
   - 📝 Rascunhos (amarelo)
   - ✨ Publicados (branco)
3. Ações disponíveis:
   - Editar: altere dados e status
   - Publicar: transforme rascunho em público
   - Excluir: remova o anúncio
```

#### 6️⃣ **Favoritar Anúncios**

```
1. Na home, clique no ❤️ de um anúncio
2. Menu usuário → "Favoritos"
3. Veja seus anúncios salvos
4. Clique novamente para desfavoritar
```

#### 7️⃣ **Perfil de Usuário**

```
1. Menu usuário → "Meu Perfil"
2. Veja/edite:
   - Informações pessoais (nome, email, telefone)
   - Segurança (trocar senha)
```

---

## 🎨 Páginas Disponíveis

| Rota | Componente | Descrição |
|------|-----------|----------|
| `/` | HomePage | Lista anúncios públicos + filtros |
| `/login` | LoginPage | Tela de login |
| `/register` | RegisterPage | Cadastro de nova conta |
| `/home-logado` | HomeLogadoPage | Home para usuário autenticado |
| `/novo-anuncio` | NovoAnuncioPage | Criar novo anúncio |
| `/editar-anuncio/:id` | EditarAnuncioPage | Editar anúncio existente |
| `/meus-anuncios` | MeusAnunciosPage | Gerenciar anúncios (draft + published) |
| `/favoritos` | FavoritosPage | Lista de favoritos |
| `/perfil-info` | MeuPerfilInformacoesPPage | Informações do usuário |
| `/perfil-seguranca` | MeuPerfilSegurancaPage | Trocar senha |
| `/ad-details/:id` | AdDetailsPage | Detalhes completos de um anúncio |

---

## 🔗 Integração com Backend

### Autenticação

```typescript
// Token é salvo automaticamente no localStorage
const token = localStorage.getItem('temVagaAi.token');

// Enviado em todas as requisições autenticadas
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Endpoints Utilizados

| Frontend Action | Backend Endpoint | Método |
|----------------|------------------|--------|
| Listar vagas públicas | `/ads` | GET |
| Ver detalhes | `/ads/:id` | GET |
| Login | `/auth/login` | POST |
| Registrar | `/auth/register` | POST |
| Criar anúncio | `/ads` | POST |
| Atualizar anúncio | `/ads/:id` | PUT |
| Deletar anúncio | `/ads/:id` | DELETE |
| Meus anúncios | `/users/me/ads` | GET |
| Listar favoritos | `/favorites` | GET |
| Toggle favorito | `/favorites/:id/toggle` | POST |

### Estados de Anúncio

```typescript
type AdStatus = 'draft' | 'published';

// 'draft'     → Aparece apenas em "Meus Anúncios" (privado)
// 'published' → Aparece na Home (público) + Meus Anúncios
```

---

## 📝 Scripts Disponíveis

```bash
npm run dev       # Servidor dev (localhost:5173) com HMR
npm run build     # Build otimizado para produção (gera /dist)
npm run preview   # Preview local do build de produção
npm run lint      # Lint com ESLint
```

---

## 🎨 Customização do Tema

O Tailwind está configurado em `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#61452a',    // Marrom principal
        secondary: '#8b5a3c',  // Marrom secundário
        // Adicione suas cores aqui!
      }
    }
  }
}
```

---

## 🐛 Troubleshooting

**Erro: "Failed to fetch"**
- ✅ Verifique se o backend está rodando em `http://localhost:4000`
- ✅ Confira `VITE_API_URL` no `.env.local`

**Erro: "Unauthorized" ao criar anúncio**
- ✅ Faça login novamente (token pode ter expirado)
- ✅ Limpe localStorage: `localStorage.clear()`

**Anúncios não aparecem na home**
- ✅ Certifique-se de que o anúncio está com `status: 'published'`
- ✅ Rascunhos só aparecem em "Meus Anúncios"

**Build falha**
- ✅ Delete `node_modules` e `package-lock.json`
- ✅ Rode `npm install` novamente

---

## 🚢 Deploy

### Vercel (Recomendado)

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure variáveis de ambiente:
# VITE_API_URL → URL do seu backend em produção
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
# Environment variables: VITE_API_URL
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Ao contribuir:

1. ✅ Siga os princípios da Clean Architecture
2. ✅ Use TypeScript com tipagem forte
3. ✅ Mantenha componentes pequenos e reutilizáveis
4. ✅ Teste localmente antes de commitar
5. ✅ Documente mudanças significativas

---

## 📚 Recursos de Aprendizado

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

<div align="center">

### Desenvolvido com ❤️ e ☕

**[⬆ Voltar ao topo](#-frontend---tem-vaga-aí)**

</div>