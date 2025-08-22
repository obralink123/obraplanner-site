# Dashboard ObraPlanner

Esta pasta contém toda a estrutura do dashboard do ObraPlanner, organizada de forma modular e reutilizável.

## Estrutura de Pastas

```
app/dashboard/
├── componentes/           # Componentes reutilizáveis
│   ├── CabecalhoDashboard.tsx
│   ├── CardEstatistica.tsx
│   ├── ListaObras.tsx
│   ├── BotoesAcao.tsx
│   ├── InformacoesConta.tsx
│   ├── NavegacaoLateral.tsx
│   └── index.ts
├── page.tsx              # Página principal do dashboard
├── layout.tsx            # Layout específico do dashboard
└── README.md             # Esta documentação
```

## Componentes

### CabecalhoDashboard
- **Função**: Cabeçalho fixo com logo, nome do usuário e menu de configurações
- **Props**: `usuario` (objeto com dados do usuário)

### CardEstatistica
- **Função**: Card reutilizável para exibir estatísticas
- **Props**: 
  - `titulo`: Título da estatística
  - `valor`: Valor numérico ou texto
  - `icone`: Ícone SVG
  - `cor`: Cor do tema ('azul', 'verde', 'amarelo', 'roxo')
  - `formato`: Formato do valor ('numero', 'moeda', 'texto')

### ListaObras
- **Função**: Lista de obras com progresso e status
- **Props**:
  - `obras`: Array de obras
  - `mostrarTodas`: Boolean para mostrar todas ou limitar
  - `limite`: Número máximo de obras a mostrar

### BotoesAcao
- **Função**: Botões de ação rápida
- **Props**:
  - `acoes`: Array de ações
  - `titulo`: Título da seção (opcional)

### InformacoesConta
- **Função**: Informações da conta do usuário
- **Props**: `usuario` (objeto com dados do usuário)

### NavegacaoLateral
- **Função**: Menu de navegação lateral (preparado para uso futuro)
- **Props**: Nenhuma (usa estado interno)

## Como Usar

### Importação Simples
```tsx
import { 
  CabecalhoDashboard, 
  CardEstatistica, 
  ListaObras 
} from './componentes';
```

### Exemplo de Uso
```tsx
<CardEstatistica
  titulo="Orçamentos"
  valor={24}
  cor="azul"
  formato="numero"
  icone={<IconeOrcamento />}
/>
```

## Benefícios da Estrutura

1. **Reutilização**: Componentes podem ser usados em várias páginas
2. **Manutenção**: Mudanças em um componente afetam todas as páginas
3. **Organização**: Código limpo e fácil de encontrar
4. **Escalabilidade**: Fácil adicionar novos componentes
5. **Tipagem**: TypeScript para melhor desenvolvimento

## Próximos Passos

- [ ] Adicionar navegação lateral funcional
- [ ] Criar páginas específicas (obras, orçamentos, clientes)
- [ ] Implementar autenticação
- [ ] Conectar com API/banco de dados
- [ ] Adicionar gráficos e visualizações
