# Mestre da Navalha

Site institucional de uma barbearia, com apresentação de serviços, agendamento demonstrativo e opções de planos mensais. Ao escolher um plano, o visitante é direcionado para uma tela de cadastro que mostra os benefícios da opção selecionada.

## Como visualizar

O projeto é estático e não precisa de instalação de dependências:

1. Abra `index.html` diretamente no navegador; ou
2. Abra a pasta no Visual Studio Code e inicie um servidor local, como a extensão Live Server.

Para acessar o cadastro de um plano, clique em **Escolher um plano** na seção de planos. A página também pode ser aberta diretamente com um dos identificadores abaixo:

- `cadastro-plano.html?plano=essencial`
- `cadastro-plano.html?plano=premium`
- `cadastro-plano.html?plano=black`

## Recursos

- Página inicial responsiva com navegação para as seções do site.
- Apresentação dos serviços, equipe, galeria, avaliações e localização.
- Fluxo demonstrativo de agendamento em etapas.
- Tela de cadastro que exibe o nome, o preço e os benefícios do plano selecionado.
- Validação básica dos campos obrigatórios pelo navegador.

## Estrutura do projeto

```text
.
├── index.html           # Página principal
├── cadastro-plano.html  # Cadastro demonstrativo de assinatura
├── style.css            # Estilos e regras responsivas
├── script.js            # Interações de navegação, agendamento e planos
├── img/                 # Imagens usadas no site
└── icons/               # Ícones do projeto
```

## Observação sobre os formulários

O cadastro de plano e o agendamento são demonstrações de interface. O cadastro valida os dados no navegador, mas ainda não os envia nem os salva. Para receber solicitações reais, é necessário integrar um serviço de backend ou uma API.
