# Tem Vaga Aí? - Frontend

Portal que conecta estudantes de Quixadá a vagas em repúblicas, apartamentos e casas compartilhadas. Frontend em React + TypeScript + Vite + Tailwind seguindo uma estrutura inspirada em Clean Architecture.

## ✨ Funcionalidades principais
- Visualizar vagas com galeria e detalhes
- Autenticação (login/cadastro) com persistência em localStorage
- Rotas protegidas para área logada (home-logado, meus anúncios, favoritos, perfil, novo anúncio)
- Criar e listar anúncios do usuário (persistidos em localStorage, com semente inicial)
- Favoritar/desfavoritar anúncios (persistido em localStorage; exige login)
- Modal de login ao tentar favoritar sem autenticação

## 🧭 Rotas
- `/` home pública
- `/login`, `/register` autenticação
- `/ad/:id` detalhes do anúncio
- Rotas protegidas (requer login): `/home-logado`, `/meus-anuncios`, `/novo-anuncio`, `/favoritos`, `/perfil-info`, `/perfil-seguranca`

## 🗄️ Persistência local
- Anúncios: `localStorage` chave `temVagaAi.ads` (carrega semente fixa e salva anúncios criados/atualizados)
- Usuário autenticado: `temVagaAi.user`
- Favoritos: `temVagaAi.favorites`

## 🛠️ Stack
- React 18.3, TypeScript 5.7, Vite 6.4, Tailwind 3.4
- React Router para navegação e rotas privadas

## 🚀 Como rodar
```bash
# na raiz do projeto FrontEnd Tem Vaga ai
npm install
npm run dev
# abra http://localhost:5173
```

Build de produção:
```bash
npm run build
npm run preview
```

## 📁 Estrutura (resumo)
```
src/
  domain/           # Entidades e contratos (ex: Ad, IAdsRepository)
  application/      # Casos de uso (ex: GetAdsUseCase, CreateAdUseCase)
  infrastructure/   # Repositórios concretos + instância compartilhada
  presentation/     # Páginas, hooks, contextos (Auth, Favorites) e App.tsx com Router
```

## 📌 Notas de implementação
- App usa `AuthProvider` e `FavoritesProvider` para compartilhar estado e proteger rotas.
- Repositório de anúncios compartilha instância (`adsRepositoryInstance`) para manter persistência única.
- Formulários de login/registro disparam `onLogin` para popular o contexto de auth.
- Favoritos e anúncios criados permanecem após recarregar a página via localStorage.

## 📄 Licença
MIT. Veja `LICENSE`.

## 👥 Autor
- Luiz Eduardo — Frontend