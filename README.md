# Weather Dashboard - Monitoramento Meteorológico

Sistema de monitoramento meteorológico desenvolvido com Next.js para fornecer informações precisas e alertas sobre condições climáticas extremas.

## 🚀 Funcionalidades

- **Previsão Detalhada**: Dados meteorológicos precisos para qualquer cidade
- **Sistema de Alertas**: Alertas sobre condições climáticas extremas
- **Prevenção de Riscos**: Informações educativas sobre eventos climáticos
- **Interface Responsiva**: Design moderno e intuitivo
- **Gráficos Interativos**: Visualização de dados meteorológicos com Recharts

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Recharts** - Gráficos e visualizações
- **Zod** - Validação de dados
- **React Hook Form** - Gerenciamento de formulários

## 📋 Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd weather-dashboard
```

2. **Instale as dependências**
```bash
# Com npm
npm install

# Com yarn
yarn install

# Com pnpm
pnpm install
```

## 🚀 Executando o Projeto

### Modo de Desenvolvimento
```bash
# Com npm
npm run dev

# Com yarn
yarn dev

# Com pnpm
pnpm dev
```

### Build para Produção
```bash
# Com npm
npm run build
npm run start

# Com yarn
yarn build
yarn start

# Com pnpm
pnpm build
pnpm start
```

### Linting
```bash
# Com npm
npm run lint

# Com yarn
yarn lint

# Com pnpm
pnpm lint
```

## 🌐 Acesso

Após executar o projeto, acesse:
- **Desenvolvimento**: http://localhost:3000
- **Produção**: Após build, na porta configurada

## 📱 Funcionalidades Principais

### 🏠 Página Inicial
- Apresentação do sistema
- Estatísticas sobre desastres naturais
- Links para funcionalidades principais

### 🔍 Pesquisa de Cidade
- Busca por cidade
- Dados meteorológicos em tempo real
- Gráficos de temperatura e precipitação

### ⚠️ Sistema de Alertas
- Alertas de condições extremas
- Recomendações de segurança
- Notificações personalizadas

## 📊 APIs Utilizadas

- **Open-Meteo**: API para dados meteorológicos
- **Geocoding**: Localização de cidades

## 🎨 Design System

O projeto utiliza componentes do Radix UI com estilização personalizada via Tailwind CSS:
- Componentes acessíveis
- Tema escuro/claro
- Design responsivo
- Animações suaves

## 📁 Estrutura do Projeto

```
weather-dashboard/
├── app/                    # Páginas do Next.js 14 (App Router)
│   ├── api/               # Endpoints da API
│   ├── pesquisa/          # Página de pesquisa
│   ├── contato/           # Página de contato
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes base (Radix UI)
│   ├── weather-dashboard.tsx  # Dashboard principal
│   ├── weather-chart.tsx     # Gráficos meteorológicos
│   └── header.tsx           # Cabeçalho
├── hooks/                 # Hooks customizados
├── lib/                   # Utilitários e configurações
└── styles/               # Estilos adicionais
```

## 🔧 Configuração Adicional

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto se necessário:
```env
# Adicione suas chaves de API aqui se necessário
NEXT_PUBLIC_WEATHER_API_KEY=sua_chave_aqui
```

### Customização do Tema
Edite o arquivo `tailwind.config.ts` para personalizar cores, espaçamentos e outros elementos do design.

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta .next
```

### Docker
```bash
# Criar Dockerfile se necessário
docker build -t weather-dashboard .
docker run -p 3000:3000 weather-dashboard
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através da página de contato do sistema ou abra uma issue no repositório.

---

**Desenvolvido com ❤️ para ajudar comunidades a se prepararem para eventos climáticos extremos.**
