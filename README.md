# Funcionalidades Implementadas

## Leitura e Renderização de Markdown:

- A aplicação carrega e renderiza arquivos `.md` do diretório `/docs`
- O menu é construído dinamicamente a partir do `_sidebar.md`
- Diferencia visualmente arquivos com modificações locais

## Modo de Edição Local:

- Qualquer documento pode ser editado
- As alterações são salvas no `localStorage` do navegador
- Interface de edição simples e intuitiva

## Área de Administração:

- Visualização de todos os arquivos editados localmente
- Ordenação por data de modificação
- Visualizador de diferenças entre versões
- Destaque visual das alterações

# Como Executar

1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm start`
3. Acesse no navegador: [http://localhost:3000](http://localhost:3000)
