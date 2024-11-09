# Instalação e Configuração

Para usar este template através do GPT Engineer, use os seguintes prompts:

1. Inicialize o projeto:
```
Crie um novo projeto React usando Vite e configure-o para usar o template @tg-devs/auth-skeleton
```

2. Configure o ambiente:
```
Configure as variáveis de ambiente necessárias para o projeto @tg-devs/auth-skeleton, incluindo as URLs da API e configurações visuais
```

3. Configure o router:
```
// No seu App.tsx ou componente principal
import { BrowserRouter } from 'react-router-dom';
import { BaseApp } from '@tg-devs/auth-skeleton';

const App = () => {
  return (
    <BrowserRouter>
      <BaseApp skipRouter={true} />
    </BrowserRouter>
  );
};
```

4. Configure o Redux store:
```
// No seu store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@tg-devs/auth-skeleton';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // ... seus outros reducers
  },
});
```

5. Configure os temas:
```
// No seu .env
VITE_BODY_BG_COLOR="#FFFFFF"
VITE_BODY_TEXT_COLOR="#000000"
VITE_BODY_LINK_COLOR="#EFB207"
VITE_HEADER_BG_COLOR="#000000"
VITE_HEADER_TEXT_COLOR="#EFB207"
VITE_HEADER_LINK_COLOR="#EFB207"
VITE_FOOTER_BG_COLOR="#000000"
VITE_FOOTER_TEXT_COLOR="#EFB207"
VITE_FOOTER_LINK_COLOR="#EFB207"
```

6. Importante: Configuração do Router
Para evitar o erro de múltiplos Routers, sempre use o `skipRouter={true}` quando estiver usando o BaseApp dentro do seu próprio Router:

```typescript
// Correto
<BrowserRouter>
  <BaseApp skipRouter={true} />
</BrowserRouter>

// Incorreto - Causará erro
<BrowserRouter>
  <BaseApp /> {/* Não passar skipRouter causará erro de Router dentro de Router */}
</BrowserRouter>
```

7. Configuração das URLs da API:
```
VITE_AUTH_API_URL=https://sua-api.com/auth
VITE_API_BASE_URL=https://sua-api.com
```