# 2GO Base Auth

Este pacote contém os componentes base de autenticação e layout do 2GO Bank.

## Pré-requisitos
### Estado Global:
- Utilize redux toolkit para gerenciar o estado global da aplicação

### Teste de Componentes: 
- Implemente testes de unidade e integração utilizando Jest e React Testing Library
- gere uma página stats no projeto com a mostra de toda a cobertura de teste

### Performance:
- Divida o código com React.lazy e React Suspense para carregar módulos sob demanda
- Exiba validações em tempo real no formulário com mensagens claras

### Responsividade:
- Use Tailwind para criar layouts fluídos, adaptando-se a diferentes dispositivos
- fique perfeitamente utilizável em dispositivos mobile 

### Acessibilidade (a11y):
- Utilize o shadcn/ui para componentes que já seguem padrões de acessibilidade
- Use atributos ARIA e garanta navegação por teclado

### Cores predominantes:
- Preto: #000000
- Amarelo: #EFB207
- Branco: #FFFFFF

### Design:
- Utilizar style guides de acordo com: https://m3.material.io/get-started
- Header sempre preto com fontes em amarelo
- Logotipo sempre no lado esquerdo do header
- Footer sempre preto com fontes em amarelo

### Números:
- Utilizar numeros no padrão brasileiro
- Utilizar 6 casas decimais quando for cripto
- Utilizar 2 casas decimais quando for moeda corrente

## Instalação

```bash
npm install @2go/base-auth
# ou
yarn add @2go/base-auth
```

## Configuração

1. Crie um arquivo `.env` na raiz do seu projeto:

```env
VITE_AUTH_API_URL=https://api.2gopag.com/access/auth
VITE_API_BASE_URL=https://api.2gopag.com
VITE_ENVIRONMENT=production
VITE_LOGO_URL=https://2gobank.com.br/wp-content/uploads/2023/05/logo-2go-bank.png
```

2. Instale as dependências necessárias:

```bash
npm install @reduxjs/toolkit react-redux react-router-dom @tanstack/react-query crypto-js tailwindcss
```

## Compartilhando o Projeto

Para compartilhar este projeto com outro usuário do GPT Engineer:

1. Exporte o código-fonte:
   - Comprima a pasta do projeto em um arquivo ZIP.

2. Compartilhe o arquivo ZIP:
   - Use um serviço de compartilhamento de arquivos (ex: Google Drive, Dropbox).

3. Compartilhe as informações do ambiente:
   - Envie o arquivo `.env` separadamente por um canal seguro.
   - Crie e compartilhe um arquivo `.env.example` com a estrutura, mas sem valores reais.

4. Instruções para o receptor:
   - Descompacte o arquivo ZIP em uma pasta local.
   - Copie o arquivo `.env` para a raiz do projeto.
   - Execute `npm install` ou `yarn` para instalar as dependências.
   - Siga as instruções de configuração acima.

## Licença

Este projeto é privado e proprietário do 2GO Bank.