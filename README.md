# API-Rest-PSCEOS
API Rest para processo seletivo CEOS - Setor de Projetos

API desenvolvida com Node.js e Express para o gerenciamento de jogadores profissionais de League of Legends, com foco na implementação de operações CRUD.

Nessa API, cada jogador possui as seguintes informações: 
- nickname (apelido utilizado para comunicação durante o jogo)
- role (função exercida dentro da equipe)
- champion (personagem com a qual dado jogador se destaca)
- team (organização a qual o jogador pertence)

Funcionalidades
- Listagem de jogadores
- Busca de jogador por id
- Criação de novos jogadores
- Remoção de jogadores

Rotas 
GET /api/users/:id  
POST /api/users  
PUT /api/users/:id  
DELETE /api/users/:id
