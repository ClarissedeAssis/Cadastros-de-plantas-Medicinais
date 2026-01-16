# Sistema de Plantas Medicinais

Sistema completo desenvolvido em um único repositório, composto por aplicação web, backend e aplicativo mobile para gerenciamento e consulta de plantas medicinais.

## Organização do Projeto
Este repositório reúne todas as camadas do sistema:
- **Web (Administrador):** aplicação desenvolvida em PHP, utilizada pelo administrador para cadastro e gerenciamento das plantas medicinais.
- **Backend / API:** desenvolvida em Java, responsável pelas regras de negócio e pela comunicação com o banco de dados MySQL.
- **Mobile (Usuário):** aplicativo desenvolvido em TypeScript (Ionic/Angular), utilizado pelos usuários finais para consumir a API e interagir com as plantas cadastradas.

## Arquitetura do Sistema
- O administrador realiza o cadastro e a manutenção das plantas por meio da aplicação web em PHP.
- As informações são processadas pela API desenvolvida em Java.
- Os dados são persistidos no banco de dados MySQL.
- O aplicativo mobile consome a API para exibir as plantas e permitir interações dos usuários.

## Tecnologias Utilizadas
- Web (Admin): PHP, HTML, CSS
- Backend / API: Java
- Banco de Dados: MySQL
- Mobile: Ionic / Angular / TypeScript

## Funcionalidades
### Administrador (Web)
- Cadastro e gerenciamento de plantas medicinais
- Atualização e manutenção dos dados no banco de dados

### Usuário (Mobile)
- Visualização das plantas cadastradas
- Salvamento de plantas favoritas
- Comentários e interações
- Consulta detalhada das informações

## Objetivo do Projeto
Projeto desenvolvido para fins acadêmicos, com foco no aprendizado prático de desenvolvimento de sistemas distribuídos, integração entre frontend web, backend em Java, banco de dados e aplicativo mobile.

## Observações
Todo o sistema (web, backend e mobile) está centralizado neste repositório para fins de estudo e organização do projeto.
