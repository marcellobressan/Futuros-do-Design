# Configuração do Google OAuth

Este projeto utiliza autenticação Google OAuth para login de usuários.

## Google Client ID Configurado

```
421543325846-d8mdb1qp99qaa9dsl1lbn9hmhcaegr5v.apps.googleusercontent.com
```

## Instalação

Execute o script de instalação para adicionar a biblioteca necessária:

```bash
bash install-google-oauth.sh
```

Ou manualmente:

```bash
npm install @react-oauth/google
```

## Como Funciona

1. **LoginModal.tsx**: Componente de login com duas opções:
   - **Google OAuth**: Botão de login oficial do Google usando `GoogleLogin` component
   - **Login Manual**: Formulário tradicional com nome, email e turma

2. **App.tsx**: Aplicação envolvida com `GoogleOAuthProvider` usando o Client ID configurado

3. **Fluxo de Autenticação**:
   - Usuário seleciona turma (A ou B)
   - Clica no botão "Continuar com Google"
   - Popup do Google aparece para autenticação
   - Após sucesso, JWT é decodificado para extrair `name` e `email`
   - Usuário é logado automaticamente com os dados do Google

## Configuração no Google Cloud Console

Para que o OAuth funcione em produção, certifique-se de:

1. Adicionar os domínios autorizados em "Authorized JavaScript origins":
   - `http://localhost:5173` (desenvolvimento)
   - `https://seu-dominio-netlify.netlify.app` (produção)

2. Adicionar os URIs de redirecionamento em "Authorized redirect URIs":
   - `http://localhost:5173`
   - `https://seu-dominio-netlify.netlify.app`

## Features Implementadas

✅ Google OAuth com botão oficial  
✅ Login manual como fallback  
✅ Seleção de turma (A/B) antes do login  
✅ Decodificação automática do JWT do Google  
✅ Extração de nome e email do usuário  
✅ Interface responsiva e user-friendly  
✅ Tratamento de erros de autenticação  

## Segurança

- O Client ID é público e pode ser exposto no frontend
- A validação do token deve ser feita no backend (se necessário)
- O JWT retornado pelo Google contém informações verificadas do usuário

## Testando Localmente

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Referências

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google NPM Package](https://www.npmjs.com/package/@react-oauth/google)
