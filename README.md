# Tem Vaga Aí - Frontend

## Descrição do Projeto

Frontend da aplicação "Tem Vaga Aí?", portal que conecta estudantes de Quixadá a vagas em repúblicas e apartamentos. Usa React + TypeScript + Vite + Tailwind, com Clean Architecture.

Funcionalidades:
- Visualizar vagas públicas (somente anúncios `published`)
- Login e cadastro
- Criar/editar/excluir anúncios (suporta rascunho `status='draft'` e publicar `status='published'`)
- Favoritar anúncios (usuário autenticado)

## Tecnologias
- React 18
- TypeScript 5.7
- Vite 6.4
- Tailwind CSS 3.4
- Clean Architecture (domain, application, infrastructure, presentation)

## Estrutura (principais)
- `src/domain`: entidades (`Ad`) e contratos de repositório
- `src/application`: casos de uso (GetAds, CreateAd, UpdateAd etc.)
- `src/infrastructure`: `api/HttpClient` (usa `VITE_API_URL`) e `repositories/AdsRepository`
- `src/presentation`: páginas, componentes, contextos (Auth/Favorites), hooks

## Executando
1. Entre na pasta `frontend`
2. Copie/ajuste `.env.local` (já existe) com `VITE_API_URL=http://localhost:4000/api`
3. Instale dependências: `npm install`
4. Rode: `npm run dev` e acesse `http://localhost:5173`
5. Build: `npm run build`

## Integração com o backend
- Base URL: `VITE_API_URL` -> `http://localhost:4000/api`
- Autenticação: token salvo em localStorage e enviado como `Authorization: Bearer <token>`
- Ads: respeita `status` (`draft`/`published`); a Home mostra só `published`, Meus Anúncios mostra ambos
- Favoritos: usa `/favorites` e `/favorites/:adId/toggle` com usuário logado