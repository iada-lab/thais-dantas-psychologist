# CONTRATO DE PRESTAÇÃO DE SERVIÇOS

# DESENVOLVIMENTO E MANUTENÇÃO DE SOFTWARE

---

## IDENTIFICAÇÃO DAS PARTES

### CONTRATADA

> **Razão Social:** IADA LTDA
> **CNPJ:** 47.917.618/0001-84

> **Representante Legal:**

&emsp;&emsp; **Norton Pereira Ricardo** CPF: 052.172.041-92

> **Desenvolvedora Responsável:**

&emsp;&emsp; **Luciana Lopes de Freitas** CPF: 051.362.691-38

---

### CONTRATANTE

> **Maria José Pereira Dantas**
> CPF: 281.401.411-00

---

As partes acima identificadas têm entre si justo e acertado o presente **Contrato de Prestação de Serviços de Desenvolvimento e Manutenção de Software**, que se regerá pelas cláusulas e condições a seguir estipuladas.

---

## CLÁUSULA PRIMEIRA — DO OBJETO

O presente contrato tem por objeto a **entrega, implantação e manutenção do sistema web institucional da psicóloga Tais Dantas** — site institucional com blog e painel de gerenciamento de conteúdo (CMS) fullstack, já desenvolvido, aprovado e validado pela CONTRATANTE, conforme demonstração prévia realizada antes da assinatura deste instrumento.

O sistema objeto deste contrato encontra-se na versão **0.1.0** e compreende todas as funcionalidades detalhadas nas cláusulas seguintes.

---

## CLÁUSULA SEGUNDA — DECLARAÇÃO DE APROVAÇÃO PRÉVIA

A CONTRATANTE declara, para todos os fins de direito, que o sistema foi previamente demonstrado e apresentado pela CONTRATADA, tendo sido **expressamente aprovado** pela CONTRATANTE em todos os seus módulos, funcionalidades, design e fluxos de uso. A assinatura do presente contrato confirma essa aprovação e autoriza o processo de deploy e ativação em produção.

---

## CLÁUSULA TERCEIRA — DESCRIÇÃO COMPLETA DO SISTEMA ENTREGUE

### 3.1 Visão Geral

O sistema é uma plataforma web completa, composta por dois ambientes:

1. **Portal Público** — site institucional e blog acessíveis a qualquer visitante, sem necessidade de autenticação;
2. **Painel de Gerenciamento Administrativo** — área restrita para gestão do conteúdo editável do sistema, acessível exclusivamente pela CONTRATANTE mediante usuário e senha.

---

### 3.2 Páginas e Módulos do Portal Público

#### 3.2.1 Página Inicial — Home / Landing Page — `/`

Página única de rolagem contínua, composta pelas seguintes seções:

**a) Hero editorial**

- Retrato profissional em destaque, com fotos do consultório dispostas em arcos ao redor da imagem
- Apresentação e identidade visual da profissional
- Botão de ação **"Agendar uma conversa"**, que direciona automaticamente para o WhatsApp cadastrado no painel administrativo ou, na ausência de número cadastrado, para a página `/contato`
- Menu de navegação fixo com acesso a Sobre, Especialidades, Blog e Contato

**b) Sobre — `#sobre`**

- Texto de apresentação institucional da profissional
- **Carrossel de fotos do consultório**, com avanço automático

**c) Avaliações do Google**

- Exibição da nota média e do número total de avaliações recebidas
- Carrossel com os depoimentos de pacientes, contendo nome do autor, foto de perfil, nota atribuída, tempo decorrido e texto integral da avaliação
- Link para o perfil da profissional no Google Maps

**d) Especialidades e Abordagem — `#especialidades`**

Seis seções em painéis alternados (imagem + texto), com transições em onda entre elas:

| # | Seção                            | Natureza            |
| - | -------------------------------- | ------------------- |
| 1 | Obesidade & Corpo                | Especialidade       |
| 2 | Emagrecimento consciente         | Especialidade       |
| 3 | Transtornos Alimentares          | Especialidade       |
| 4 | Cirurgia Bariátrica              | Especialidade       |
| 5 | Terapia Cognitiva Comportamental | Abordagem           |
| 6 | Endometriose & Saúde Mental      | Experiência Clínica |

Cada painel exibe etiqueta de categoria, título, texto descritivo e imagem ilustrativa.

**e) Destaque do Blog**

- Exibição do artigo mais recente publicado, com chamada para a listagem completa

**f) Contato**

- Bloco com os canais de contato cadastrados no painel administrativo

**g) Rodapé**

- Identificação da profissional, navegação e aviso de direitos reservados

#### 3.2.2 Blog — `/blog`

- Listagem de artigos publicados, com **4 artigos por página**
- **Busca por texto** no título e conteúdo dos artigos
- **Filtro por categorias** (seleção múltipla)
- **Ordenação** por: mais recentes, mais antigos, mais lidos, A–Z e Z–A
- Cada card exibe: imagem de capa, título, subtítulo, resumo, categorias, data de publicação, **tempo estimado de leitura** e **contador de visualizações**
- Paginação inteligente, com reticências para grandes volumes de artigos

#### 3.2.3 Artigo — `/blog/[slug]`

- Visualização completa do artigo, com título, subtítulo, categorias, data, tempo de leitura e número de leituras
- Conteúdo formatado com títulos, listas, links, destaques e imagens com alinhamento e dimensões definidos na edição
- URL amigável gerada a partir do título (slug)
- **Metadados para redes sociais e buscadores** (SEO e OpenGraph): título, descrição e imagem de capa
- Registro automático de leitura para alimentar as estatísticas do painel

#### 3.2.4 Contato — `/contato`

- **Mapa interativo** com a localização do consultório, incorporado a partir do Google Maps
- Endereço completo: logradouro e número, bairro, cidade/UF e CEP
- **Canais de contato dinâmicos** — cada canal com ícone próprio, rótulo e valor (e-mail, telefone, WhatsApp, Instagram, LinkedIn, Facebook, YouTube, site, entre outros), na ordem definida no painel

---

### 3.3 Painel de Gerenciamento Administrativo

Acessível via `/manager`, protegido por autenticação com usuário e senha exclusivos da CONTRATANTE.

#### 3.3.1 Login — `/manager/login`

- Acesso por **usuário e senha**, armazenados de forma criptografada — a senha não pode ser lida por ninguém, nem mesmo pela CONTRATADA
- **Permanência conectada por 7 dias:** feito o login uma vez, a CONTRATANTE continua entrando no painel sem precisar digitar a senha de novo. Esse prazo é reiniciado a cada acesso — ou seja, quem usa o painel com frequência nunca precisa digitar a senha novamente. A senha só volta a ser pedida após **7 dias inteiros sem nenhum acesso**
- O acesso fica registrado em um **cookie protegido**, que não pode ser lido por outros sites nem por programas em execução no navegador
- Proteção contra tentativas automatizadas de adivinhar a senha: no máximo **5 tentativas de login por minuto**
- Botão **"Sair"** disponível em qualquer tela do painel, encerrando o acesso na hora

#### 3.3.2 Dashboard — `/manager`

Tela inicial com visão geral da atividade do site:

- **Artigos publicados na semana**
- **Artigos publicados no mês**
- **Visitas ao site nos últimos 30 dias**
- **Artigo mais lido da semana**, com o respectivo número de leituras
- **Artigo mais lido do mês**, com o respectivo número de leituras
- Atalhos de acesso rápido aos módulos de Contato e Blog

#### 3.3.3 Gerenciar Blog — `/manager/blog`

**Listagem e operações**

- Relação de todos os artigos, publicados e rascunhos
- Criação de novo artigo em `/manager/blog/new` e edição em `/manager/blog/[id]`
- Exclusão com confirmação prévia (dialog de alerta)

**Campos do artigo**

- Título, subtítulo e resumo
- **Imagem de capa** (upload)
- Endereço do artigo (slug), gerado automaticamente a partir do título
- Categorias (seleção múltipla)
- Conteúdo do artigo em editor visual
- Interruptor de **publicado / rascunho** — artigos não publicados não aparecem no site
- **Tempo de leitura calculado automaticamente** a partir do conteúdo

**Recursos de formatação do editor**

O artigo é escrito diretamente na tela, com a formatação aplicada por botões e exibida ao vivo — o texto aparece durante a edição exatamente como ficará publicado, sem necessidade de conhecimento técnico. Recursos disponíveis:

- **Títulos de seção** em dois níveis, para organizar o artigo em partes
- **Negrito** e _itálico_ para destacar trechos
- Listas com marcadores e listas numeradas
- Alinhamento do texto à esquerda, ao centro ou à direita
- Inserção de **links** para páginas externas
- **Inserção de imagens** de três formas: pelo botão, arrastando o arquivo para dentro do texto ou colando diretamente
- Ajuste das imagens no corpo do artigo: posição, **tamanho** e arredondamento das bordas

**Gerenciamento de categorias**

- Criação, edição e exclusão de categorias do blog, diretamente pelo editor de artigos

#### 3.3.4 Gerenciar Contato — `/manager/contato`

- Edição do **endereço do mapa** exibido na página de contato
- Edição dos campos de endereço: logradouro e número, bairro, cidade/UF e CEP
- **Gestão completa dos canais de contato**: criar, editar, reordenar e excluir
- Cada canal possui rótulo, valor e **ícone selecionável** entre as opções disponíveis (e-mail, telefone, WhatsApp, Instagram, LinkedIn, Facebook, Twitter, YouTube, GitHub, site, mapa, mensagem, link genérico, entre outros)
- Normalização automática de endereços web para `https`

---

### 3.4 Do Que o Sistema NÃO Trata

Para clareza das partes, registra-se expressamente que o sistema objeto deste contrato é **exclusivamente institucional e de conteúdo**. O sistema **não coleta, não armazena e não processa**:

- Dados de pacientes, prontuários, evoluções ou qualquer informação de saúde
- Agendamentos, prontuário eletrônico ou histórico clínico
- Dados de pagamento, cobrança ou faturamento
- Formulários públicos de captação de dados pessoais de visitantes

O agendamento de consultas ocorre **fora do sistema**, por meio do redirecionamento ao WhatsApp ou aos demais canais de contato cadastrados pela CONTRATANTE. Os únicos registros gerados automaticamente são **contagens anônimas de visitas e de leituras de artigos**, sem qualquer identificação do visitante.

---

## CLÁUSULA QUARTA — INFRAESTRUTURA E TECNOLOGIA

### 4.1 Stack Tecnológica

| Camada                  | Tecnologia              | Versão  |
| ----------------------- | ----------------------- | ------- |
| Framework Web           | Next.js                 | 16.2.4  |
| Biblioteca de Interface | React                   | 19.2.3  |
| Linguagem               | TypeScript              | 5       |
| Runtime                 | Node.js 20 + Bun 1      | —       |
| Estilização             | Tailwind CSS            | 4       |
| Componentes UI          | Radix UI + Base UI      | —       |
| Editor de Conteúdo      | TipTap                  | 3.27.1  |
| Ícones                  | Lucide React            | 0.574.0 |
| ORM                     | Drizzle ORM             | 0.45.2  |
| Banco de Dados          | PostgreSQL              | 16      |
| Autenticação            | Better Auth             | 1.6.11  |
| Processamento de Imagem | Sharp                   | 0.35.3  |
| Validação de Dados      | Zod                     | 4.4.3   |
| Notificações            | Sonner                  | 2.0.7   |
| Carrossel               | Embla Carousel          | 8.6.0   |
| Containerização         | Docker + Docker Compose | —       |

### 4.2 Banco de Dados — Estrutura das Tabelas

O banco de dados PostgreSQL é composto pelas seguintes tabelas:

| Tabela                 | Descrição                                                   |
| ---------------------- | ----------------------------------------------------------- |
| `blog_posts`           | Artigos do blog (título, conteúdo, publicação, leituras)    |
| `blog_categories`      | Categorias disponíveis para os artigos                      |
| `blog_post_categories` | Vínculo entre artigos e categorias (um artigo, várias)      |
| `blog_images`          | Imagens de capa e do corpo dos artigos, em formato binário  |
| `contact_info`         | Endereço, CEP e endereço do mapa do consultório             |
| `contact_channels`     | Canais de contato dinâmicos, com ícone, valor e ordem       |
| `page_views`           | Registro anônimo de visitas às páginas públicas             |
| `blog_post_views`      | Histórico anônimo de leituras por artigo                    |
| `auth_user`            | Usuário administrador do painel                             |
| `auth_session`         | Sessões ativas do painel administrativo                     |
| `auth_account`         | Credenciais de acesso (senha criptografada)                 |
| `auth_verification`    | Tokens de verificação do mecanismo de autenticação          |

Todas as tabelas de conteúdo possuem identificadores únicos (UUID v4) gerados automaticamente e campos de auditoria (`created_at` e `updated_at` com fuso horário).

### 4.3 Processamento e Armazenamento de Imagens

Todas as imagens enviadas pelo painel são processadas da seguinte forma:

1. **Recebidas via upload** diretamente pelo painel administrativo, em formulários seguros
2. **Validadas** quanto ao formato e ao tamanho — máximo de **8 MB** por arquivo
3. **Processadas em memória** pelo servidor, sem gravação temporária em disco: correção automática de orientação e redução para no máximo **2000 pixels** no maior lado
4. **Convertidas para o formato WebP** com qualidade 85, o que reduz significativamente o peso do arquivo sem perda visual perceptível
5. **Armazenadas no banco de dados PostgreSQL** como dados binários (`bytea`), junto com o tipo do arquivo e suas dimensões
6. **Servidas ao visitante** por rota dedicada, com cache permanente no navegador e cabeçalhos de segurança adequados
7. **Sem dependência de serviços externos** de armazenamento — sem Amazon S3, sem Cloudinary, sem CDN de terceiros. Todo o conteúdo de mídia reside no próprio banco de dados

Formatos aceitos no envio: **PNG · JPEG · WebP · GIF**. Formato de armazenamento: **WebP**.

### 4.4 Autenticação e Segurança

- Autenticação por **usuário e senha**, com senha armazenada de forma criptografada (hash) — nunca em texto puro
- Sessão gerenciada por **cookie HTTP-only** com prefixo `__Host-`, política `SameSite=strict` e validade de 7 dias
- **Limitação de requisições** (rate limiting): 100 requisições por minuto de modo geral e 5 tentativas por minuto na tela de login
- **Proteção de todas as rotas administrativas** — acesso bloqueado automaticamente sem sessão válida
- **Higienização (sanitização) do conteúdo dos artigos**: o HTML gerado pelo editor passa por filtro com lista restrita de elementos e atributos permitidos, impedindo a injeção de scripts maliciosos
- **Validação de todos os dados recebidos** pelas rotas de API, com rejeição de conteúdo fora do formato esperado
- **Cabeçalhos de segurança** aplicados a todas as páginas: Content-Security-Policy, Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy
- Sem dependência de provedores externos de autenticação (sem Google OAuth, sem Auth0)

### 4.5 Containerização e Deployment

O sistema é entregue com configuração completa de containerização:

- **`Dockerfile`** — imagem de produção otimizada (build standalone)
- **`Dockerfile.dev`** — imagem para ambiente de desenvolvimento
- **`docker-compose.yml`** — orquestração dos serviços (aplicação + banco de dados PostgreSQL 16)
- Migrações do banco de dados executadas automaticamente na inicialização
- Dados do banco preservados em volume persistente, independente de reinicializações e atualizações da aplicação
- Reinício automático dos serviços em caso de falha ou reinicialização do servidor

---

## CLÁUSULA QUINTA — DO VALOR E FORMA DE PAGAMENTO

### 5.1 Composição e Valor Total

| #   | Item                                                              | Valor           |
| --- | ----------------------------------------------------------------- | --------------- |
| 1   | Desenvolvimento do sistema                                        | R$ 3.000,00     |
| 2   | Registro de domínio — 2 anos (`taisdantas.com`, venc. 31/08/2028) | R$ 200,00       |
| 3   | Hospedagem do servidor — 1 ano (venc. 31/08/2027)                 | R$ 500,00       |
|     | **TOTAL**                                                         | **R$ 3.700,00** |

> **Valor Total: R$ 3.700,00**
> _(três mil e setecentos reais)_
> Pago **à vista**, contra entrega e ativação do sistema em ambiente de produção.

### 5.2 O Que Está Incluso no Valor

O valor total compreende integralmente:

| Item                           | Descrição                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------- |
| **Desenvolvimento do Sistema** | Entrega do sistema completo descrito neste contrato                          |
| **Registro de Domínio**        | Domínio `taisdantas.com` registrado e mantido por **2 (dois) anos**          |
| **Hospedagem do Servidor**     | Servidor pelo período de **1 (um) ano** (venc. 31/08/2027)                   |
| **Deploy e Ativação**          | Configuração e implantação do sistema em produção, incluindo certificado SSL |
| **Manutenção do Servidor**     | Gerenciamento técnico do ambiente de execução pelo período de 1 ano          |
| **Backup Mensal**              | Backup completo do banco de dados todo dia **25** de cada mês, durante 1 ano |
| **Correção de Bugs**           | Correção de falhas funcionais pelo período de **1 (um) ano**                 |
| **Pequenos Ajustes**           | Alterações de baixo impacto conforme definido na Cláusula Sétima             |

### 5.3 O Que NÃO Está Incluso no Valor

Os seguintes itens **não estão incluídos** no valor contratado e serão objeto de orçamento e cobrança separados:

| Item                                     | Observação                                                                             |
| ---------------------------------------- | -------------------------------------------------------------------------------------- |
| **Renovação de Hospedagem (após 1 ano)** | Após 31/08/2027, a renovação será orçada e formalizada em Aditivo Contratual           |
| **Renovação de Domínio (após 2 anos)**   | Após 31/08/2028, a renovação será orçada e formalizada em Aditivo Contratual           |
| **Ampliação de Armazenamento (SSD)**     | Custo de responsabilidade da CONTRATANTE, conforme Cláusula Sexta, item 6.3            |
| **Novas Telas ou Funcionalidades**       | Desenvolvimento de páginas ou módulos não presentes neste contrato                     |
| **Mudanças Estruturais**                 | Alterações na arquitetura, banco de dados, infraestrutura ou stack tecnológica         |
| **Integrações com Terceiros**            | Integrações com APIs externas, sistemas de pagamento, agendamento online, e-mail marketing, etc. |

---

## CLÁUSULA SEXTA — DO DOMÍNIO, HOSPEDAGEM E ATIVAÇÃO EM PRODUÇÃO

### 6.1 Domínio e Endereço do Sistema

| Campo                      | Informação                                     |
| -------------------------- | ---------------------------------------------- |
| **Domínio registrado**     | `taisdantas.com`                               |
| **Endereço do sistema**    | `psi.taisdantas.com`                           |
| **Registrador**            | GoDaddy                                        |
| **Titularidade**           | IADA LTDA (em nome da CONTRATANTE)             |
| **Vencimento**             | **31 de agosto de 2028**                       |
| **Transferência de posse** | Disponível a partir de **30 de outubro de 2026** |

**6.1.1 Do subdomínio escolhido.** O sistema objeto deste contrato será publicado no subdomínio **`psi.taisdantas.com`**, endereço **escolhido pela CONTRATANTE**. A CONTRATANTE declara ciência de que este é o endereço oficial e definitivo do sistema, e que toda a divulgação, indexação em buscadores e materiais de comunicação deverão apontar para ele.

**6.1.2 Do domínio raiz.** O domínio raiz `taisdantas.com` e quaisquer outros subdomínios permanecem **livres e disponíveis** para uso da CONTRATANTE em outras finalidades. Não é objeto deste contrato o desenvolvimento, a publicação ou a manutenção de qualquer conteúdo ou sistema no domínio raiz ou em subdomínios diversos de `psi.taisdantas.com`.

**6.1.3 Da titularidade.** O domínio encontra-se registrado e gerenciado pela **IADA LTDA** em benefício da CONTRATANTE. A transferência da titularidade para conta própria da CONTRATANTE poderá ser solicitada a qualquer momento após **30 de outubro de 2026** (prazo de carência de 60 dias imposto pela plataforma registradora), mediante simples solicitação e indicação de conta de destino, sem custo adicional.

### 6.2 Servidor de Hospedagem

| Especificação        | Configuração             |
| -------------------- | ------------------------ |
| **Provedor**         | Contabo                  |
| **Processamento**    | 4 vCPU Cores             |
| **Memória RAM**      | 8 GB                     |
| **Armazenamento**    | 100 GB SSD               |
| **Snapshots**        | 1 Snapshot               |
| **Largura de banda** | 200 Mbit/s               |
| **Vencimento**       | **31 de agosto de 2027** |

O servidor está contratado e gerenciado pela **IADA LTDA** pelo período de 1 (um) ano incluso no valor deste contrato. Após o vencimento em **31/08/2027**, a renovação deverá ser acordada entre as partes mediante Aditivo Contratual.

### 6.3 Da Capacidade de Armazenamento e Eventual Ampliação

**6.3.1 Natureza do consumo.** Todo o conteúdo do sistema — artigos, imagens de capa, imagens do corpo dos textos e registros de acesso — é armazenado no banco de dados que reside no disco do servidor. O espaço ocupado, portanto, **cresce de forma proporcional ao volume de conteúdo publicado** pela CONTRATANTE, com destaque para as imagens.

**6.3.2 Monitoramento e comunicação.** A CONTRATADA obriga-se a **monitorar o consumo de armazenamento** do servidor e a **comunicar formalmente a CONTRATANTE** assim que a ocupação atingir **80% (oitenta por cento)** da capacidade contratada, indicando a projeção de esgotamento e as opções de ampliação disponíveis junto ao provedor.

**6.3.3 Custo da ampliação.** Caso o espaço em disco venha a se esgotar, será necessária a **contratação de ampliação de armazenamento (upgrade de SSD)** junto ao provedor **Contabo**. O custo dessa ampliação é de **responsabilidade exclusiva da CONTRATANTE**, sendo o valor **a avaliar no momento da necessidade**, conforme a tabela de preços vigente do provedor, e repassado à CONTRATANTE **sem qualquer acréscimo** pela CONTRATADA, mediante apresentação do comprovante.

**6.3.4 Execução da ampliação.** A execução técnica da ampliação — contratação junto ao provedor, expansão do volume e validação do sistema após a mudança — será realizada pela CONTRATADA **sem cobrança de mão de obra**, estando incluída nos serviços de manutenção do servidor previstos na Cláusula Sétima.

**6.3.5 Da recusa ou omissão.** Caso a CONTRATANTE, uma vez comunicada nos termos do item 6.3.2, **não autorize a ampliação** ou não efetue o pagamento correspondente, a CONTRATANTE declara ciência de que o esgotamento do disco poderá acarretar: impossibilidade de envio de novas imagens, impossibilidade de publicação de novos artigos, falhas na gravação de dados e, em último caso, **indisponibilidade total do sistema**. Nessa hipótese, a indisponibilidade **não configura descumprimento contratual pela CONTRATADA**.

**6.3.6 Boas práticas.** A CONTRATADA orienta que as imagens sejam enviadas em resolução compatível com o uso na web. O sistema já realiza compressão e conversão automática para formato otimizado (Cláusula Quarta, item 4.3), o que reduz substancialmente o consumo de disco, mas não elimina o crescimento natural decorrente do volume de publicações.

### 6.4 Processo de Ativação

1. Após o pagamento do valor contratado, a CONTRATADA realizará o **deploy do sistema**, a **configuração do subdomínio** `psi.taisdantas.com` e a emissão do certificado SSL
2. A CONTRATADA entregará à CONTRATANTE as credenciais de acesso ao painel administrativo após a ativação
3. A partir da ativação, o período de manutenção e garantia de 1 ano tem início

### 6.5 Responsabilidades sobre a Infraestrutura

- A gestão técnica do domínio e do servidor (configurações, atualizações de segurança, certificado SSL, monitoramento) é de responsabilidade da **CONTRATADA** pelo período contratado
- Após o vencimento dos serviços de hospedagem (31/08/2027), a indisponibilidade do sistema por falta de renovação não configura descumprimento contratual pela CONTRATADA

---

## CLÁUSULA SÉTIMA — DA MANUTENÇÃO E GARANTIA

### 7.1 Período de Manutenção

A CONTRATADA prestará serviços de manutenção pelo período de **1 (um) ano**, com **vencimento em 31 de agosto de 2027**, podendo ser renovado mediante Aditivo Contratual celebrado antes dessa data.

### 7.2 Serviços Incluídos na Manutenção

**a) Backup Mensal**

- Realização de backup completo do banco de dados no dia **25 (vinte e cinco)** de cada mês
- O backup abrange **todo o conteúdo do sistema**, inclusive as imagens, uma vez que estas residem no próprio banco de dados
- Armazenamento seguro dos 3 backups mais recentes
- Restauração em caso de falha crítica

**b) Correção de Bugs**

- Identificação e correção de falhas funcionais no sistema
- Prazo de resposta: até **5 (cinco) dias úteis** para bugs de baixa criticidade
- Prazo de resposta: até **48 (quarenta e oito) horas** para falhas críticas que impossibilitem o uso do sistema

**c) Manutenção do Servidor**

- Atualizações de segurança do ambiente de execução
- Renovação automática do certificado SSL
- Monitoramento de disponibilidade e de consumo de armazenamento
- Execução técnica de eventual ampliação de disco, nos termos do item 6.3.4

**d) Pequenos Ajustes** _(sem custo adicional)_

Entende-se por pequenos ajustes toda e qualquer alteração que **não modifique a estrutura do banco de dados, a arquitetura do sistema ou requeira novas telas**, incluindo:

- Alteração dos textos das seções da página inicial (apresentação, especialidades e abordagem)
- Troca ou atualização das **fotos do consultório** e do retrato profissional
- Atualização das **avaliações do Google** exibidas na página inicial
- Inclusão, remoção ou reordenação de seções de especialidade já existentes no mesmo formato
- Adição de novos filtros simples na listagem do blog
- Ajustes de ordenação e exibição de elementos já presentes no sistema
- Correções de texto, ortografia e formatação

> **Observação:** os conteúdos de blog e de contato são **editáveis pela própria CONTRATANTE** através do painel administrativo, sem necessidade de acionar a CONTRATADA.

### 7.3 O Que NÃO Está Coberto pela Manutenção

- Desenvolvimento de novas telas ou páginas
- Criação de novos módulos no painel administrativo
- Mudanças de layout ou identidade visual que requeiram reestruturação
- Integrações com novos sistemas ou APIs (agendamento online, pagamento, prontuário, e-mail marketing)
- Alterações na infraestrutura ou migração de servidor
- Custo de ampliação do armazenamento junto ao provedor (item 6.3.3)
- Danos causados por uso indevido do painel administrativo ou por credenciais comprometidas por ação da CONTRATANTE
- Perda de conteúdo decorrente de exclusão realizada pela própria CONTRATANTE no painel, ressalvada a restauração a partir do último backup disponível

### 7.4 Prorrogação do Período de Manutenção

Findo o período contratado (venc. **31/08/2027**), as partes poderão celebrar **Aditivo Contratual** para prorrogação dos serviços de manutenção por mais 1 (um) ano, mediante novo acordo de valores e condições a ser negociado antes do vencimento. A renovação abrange manutenção do sistema, backup mensal e pequenos ajustes, podendo incluir também a renovação do servidor de hospedagem.

---

## CLÁUSULA OITAVA — DOS SERVIÇOS FORA DO ESCOPO

Qualquer solicitação de desenvolvimento que extrapole o escopo descrito neste contrato — incluindo novas telas, mudanças estruturais, novas integrações ou redesign — será:

1. Avaliada pela CONTRATADA em prazo de até **10 (dez) dias úteis**
2. Orçada e apresentada à CONTRATANTE por escrito (e-mail ou outro meio formal)
3. Executada somente após aprovação expressa e acordo de valores formalizado em **Aditivo Contratual**

---

## CLÁUSULA NONA — DA PROPRIEDADE INTELECTUAL

### 9.1 Titularidade

O código-fonte, design, banco de dados, documentação e demais artefatos que compõem o sistema são de **propriedade intelectual da IADA LTDA**.

### 9.2 Conteúdo da CONTRATANTE

Os textos, artigos, fotografias e demais conteúdos fornecidos ou publicados pela CONTRATANTE permanecem de **propriedade exclusiva da CONTRATANTE**, que declara deter os direitos de uso sobre todo o material enviado ao sistema.

### 9.3 Licença de Uso

Com o pagamento integral do valor contratado, a CONTRATANTE recebe **licença de uso exclusiva, irrevogável e não sublicenciável** do sistema para operação em seu domínio e finalidade descritos neste contrato.

### 9.4 Restrições

A CONTRATANTE não poderá:

- Comercializar ou ceder o sistema a terceiros sem autorização escrita da CONTRATADA
- Contratar terceiros para modificar o código-fonte sem comunicar e obter anuência da CONTRATADA
- Remover créditos ou marcas da CONTRATADA presentes no sistema

---

## CLÁUSULA DÉCIMA — DAS OBRIGAÇÕES DA CONTRATADA

A CONTRATADA obriga-se a:

1. Entregar o sistema conforme descrito neste contrato, em pleno funcionamento
2. Realizar o deploy e ativação no subdomínio `psi.taisdantas.com` após confirmação do pagamento
3. Fornecer credenciais de acesso ao painel administrativo
4. Prestar suporte técnico conforme prazos e escopo da Cláusula Sétima
5. Realizar backups mensais no dia 25 de cada mês
6. **Monitorar o consumo de armazenamento e comunicar a CONTRATANTE ao atingir 80% da capacidade**, nos termos do item 6.3.2
7. Manter sigilo sobre dados e informações da CONTRATANTE
8. Comunicar com antecedência mínima de **30 (trinta) dias** qualquer necessidade de manutenção programada que gere indisponibilidade

---

## CLÁUSULA DÉCIMA PRIMEIRA — DAS OBRIGAÇÕES DA CONTRATANTE

A CONTRATANTE obriga-se a:

1. Efetuar o pagamento do valor contratado conforme acordado
2. Manifestar interesse na renovação da hospedagem e efetuar o pagamento correspondente com antecedência mínima de **5 (cinco) dias úteis** antes do vencimento (**31/08/2027**), a fim de garantir a continuidade do sistema sem interrupção
3. **Arcar com o custo de eventual ampliação de armazenamento**, nos termos do item 6.3.3, quando comunicada pela CONTRATADA
4. Manter sigilo sobre as credenciais de acesso ao painel administrativo
5. Comunicar imediatamente à CONTRATADA qualquer falha, incidente ou comportamento anormal do sistema
6. Não compartilhar as credenciais de acesso ao painel com pessoas não autorizadas
7. Fornecer informações e conteúdos necessários para operação do sistema
8. Responder integralmente pelo conteúdo que publicar no sistema, inclusive quanto a direitos de imagem, direitos autorais e observância do Código de Ética Profissional do Psicólogo e das resoluções do Conselho Federal de Psicologia aplicáveis à divulgação de serviços psicológicos

---

## CLÁUSULA DÉCIMA SEGUNDA — DA RESCISÃO

### 12.1 Rescisão por Descumprimento

O presente contrato poderá ser rescindido por qualquer das partes em caso de descumprimento das obrigações aqui previstas, mediante notificação por escrito com antecedência mínima de **30 (trinta) dias**.

### 12.2 Não Renovação da Hospedagem

Caso a CONTRATANTE não manifeste interesse na renovação ou não efetue o pagamento da hospedagem até **5 (cinco) dias úteis** antes do vencimento em **31/08/2027**, a CONTRATADA estará desobrigada de manter o servidor ativo, e eventual interrupção do sistema não configura descumprimento contratual pela CONTRATADA.

### 12.3 Efeitos da Rescisão

Em caso de rescisão, os valores já pagos não são reembolsáveis, salvo em casos de comprovado inadimplemento por parte da CONTRATADA. A CONTRATADA disponibilizará à CONTRATANTE, mediante solicitação, cópia do último backup do banco de dados contendo todo o conteúdo por ela publicado.

---

## CLÁUSULA DÉCIMA TERCEIRA — DO FORO

As partes elegem o **Foro da Comarca de Goiânia — GO** para dirimir quaisquer dúvidas ou litígios oriundos do presente contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.

---

## CLÁUSULA DÉCIMA QUARTA — DAS DISPOSIÇÕES GERAIS

1. O presente contrato é celebrado em caráter irrevogável e irretratável, obrigando as partes e seus sucessores
2. Qualquer alteração ao presente instrumento somente será válida mediante **Aditivo Contratual** assinado por ambas as partes
3. A tolerância de uma das partes quanto ao descumprimento de qualquer cláusula não implica novação ou renúncia ao direito de exigi-la futuramente
4. As comunicações entre as partes poderão ser realizadas por e-mail, sendo consideradas válidas para todos os fins legais

---

## ASSINATURAS

Assim, por estarem justas e contratadas, as partes assinam o presente instrumento em **2 (duas) vias de igual teor e forma**, na presença das testemunhas abaixo.

**Local e Data:** Goiânia — GO, 14 de setembro de 2026.

---

### CONTRATADA

**Razão Social:** IADA LTDA
**CNPJ:** 47.917.618/0001-84

---

**Representante Legal:**

|       |                            |
| ----- | -------------------------- |
| Nome: | **Norton Pereira Ricardo** |
| CPF:  | 052.172.041-92             |

&emsp;&emsp;Assinatura: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

**Desenvolvedora Responsável:**

|       |                              |
| ----- | ---------------------------- |
| Nome: | **Luciana Lopes de Freitas** |
| CPF:  | 051.362.691-38               |

&emsp;&emsp;Assinatura: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### CONTRATANTE

|       |                               |
| ----- | ----------------------------- |
| Nome: | **Maria José Pereira Dantas** |
| CPF:  | 281.401.411-00                |

&emsp;&emsp;Assinatura: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

---

# ANEXO I — ESPECIFICAÇÃO TÉCNICA DETALHADA DO SISTEMA

## A. Arquitetura do Sistema

```
┌────────────────────────────────────────────────────────────────┐
│                       NAVEGADOR (Cliente)                      │
│   Portal Público (psi.taisdantas.com)   Painel Administrativo  │
│   /  ·  /blog  ·  /blog/[slug]  ·  /contato      /manager      │
└─────────────┬──────────────────────────────┬───────────────────┘
              │                              │
              ▼                              ▼
┌────────────────────────────────────────────────────────────────┐
│           SERVIDOR NEXT.JS 16 (Node.js 20 / Bun)               │
│                                                                │
│   ┌───────────────────────┐   ┌──────────────────────────┐     │
│   │   Server Components   │   │   API Routes (REST)      │     │
│   │   (renderização SSR)  │   │   GET/POST/PUT/DELETE    │     │
│   └───────────┬───────────┘   └──────────────┬───────────┘     │
│               │                              │                 │
│   ┌───────────┴──────────────────────────────┴───────────┐     │
│   │  Better Auth (sessão)  ·  Zod (validação)            │     │
│   │  Sharp (imagens)       ·  Sanitizador de HTML        │     │
│   └───────────────────────┬──────────────────────────────┘     │
│                           ▼                                    │
│              ┌───────────────────────────────┐                 │
│              │  Drizzle ORM (camada dados)   │                 │
│              └───────────────┬───────────────┘                 │
└──────────────────────────────┼─────────────────────────────────┘
                               │
                               ▼
┌────────────────────────────────────────────────────────────────┐
│                  PostgreSQL 16 (Banco de Dados)                │
│                                                                │
│  Conteúdo:  blog_posts · blog_categories                       │
│             blog_post_categories · blog_images                 │
│             contact_info · contact_channels                    │
│                                                                │
│  Métricas:  page_views · blog_post_views                       │
│                                                                │
│  Acesso:    auth_user · auth_session                           │
│             auth_account · auth_verification                   │
│                                                                │
│  Mídia:     imagens armazenadas como bytea (WebP)              │
└────────────────────────────────────────────────────────────────┘
```

---

## B. Fluxo de Upload e Armazenamento de Imagens

```
CONTRATANTE (Painel Admin)
        │
        │  1. Seleciona, arrasta ou cola uma imagem no editor
        ▼
SERVIDOR (Next.js — API Route)
        │
        │  2. Recebe o arquivo via multipart/form-data
        │  3. Valida o formato (PNG · JPEG · WebP · GIF)
        │  4. Valida o tamanho (máx. 8 MB)
        │  5. Corrige a orientação da foto (EXIF)
        │  6. Redimensiona para no máx. 2000px no maior lado
        │  7. Converte para WebP com qualidade 85
        ▼
PostgreSQL (tabela blog_images — campo bytea)
        │
        │  8. Armazena binário + tipo + largura + altura
        │  9. Devolve a URL /uploads/blog/<uuid>.webp
        ▼
VISITANTE PÚBLICO (Portal)
        │
        │ 10. Solicita a imagem pela URL
        │ 11. Servidor lê o bytea do banco
        │ 12. Entrega com Content-Type correto,
        │     cache permanente e nosniff
        ▼
    Navegador exibe a imagem
```

---

## C. Fluxo de Autenticação do Painel Administrativo

```
CONTRATANTE
    │
    │  1. Acessa /manager (qualquer rota protegida)
    ▼
VERIFICAÇÃO DE SESSÃO
    │
    │  2. Verifica o cookie de sessão (__Host-, HTTP-only)
    │     Ausente ou expirado → redireciona para /manager/login
    ▼
PÁGINA DE LOGIN (/manager/login)
    │
    │  3. Contratante informa usuário e senha
    ▼
BETTER AUTH (/api/auth)
    │
    │  4. Limite de 5 tentativas por minuto
    │  5. Compara a senha com o hash salvo em auth_account
    │  6. Correto → cria sessão em auth_session (TTL 7 dias)
    │  7. Emite cookie __Host- HTTP-only, SameSite=strict
    │  8. Redireciona para /manager
    ▼
PAINEL ADMINISTRATIVO (acesso liberado)
    │
    │  Sessão renovada automaticamente a cada uso
    ▼
LOGOUT → sessão encerrada e cookie removido
```

---

## D. Fluxo de Publicação de Artigo

```
CONTRATANTE (Painel Admin)
    │
    │  1. Cria o artigo em /manager/blog/new
    │  2. Preenche título, subtítulo, resumo e capa
    │  3. Escreve o conteúdo no editor visual
    │     (títulos, negrito, itálico, listas, links,
    │      alinhamento, imagens com alinhamento e tamanho)
    │  4. Seleciona as categorias
    ▼
SERVIDOR
    │
    │  5. Gera o slug a partir do título
    │  6. Valida os dados recebidos (Zod)
    │  7. Sanitiza o HTML do conteúdo (allowlist)
    │  8. Calcula o tempo estimado de leitura
    ▼
PostgreSQL (blog_posts + blog_post_categories)
    │
    │  9. Grava o artigo — publicado ou rascunho
    ▼
PORTAL PÚBLICO
    │
    │ 10. Rascunhos não aparecem no site
    │ 11. Publicados aparecem em /blog e em /blog/[slug]
    │ 12. Cada leitura é registrada em blog_post_views
    ▼
DASHBOARD (/manager)
    │
    │ 13. Alimenta as estatísticas de artigos e leituras
```

---

## E. Modelo de Dados Detalhado

### Tabela `blog_posts`

| Campo             | Tipo        | Descrição                                     |
| ----------------- | ----------- | --------------------------------------------- |
| id                | UUID        | Identificador único gerado automaticamente    |
| title             | TEXT        | Título do artigo                              |
| subtitle          | TEXT        | Subtítulo (opcional)                          |
| excerpt           | TEXT        | Resumo exibido na listagem                    |
| slug              | TEXT UNIQUE | URL amigável do artigo                        |
| coverImageUrl     | TEXT        | Endereço da imagem de capa                    |
| bodyHtml          | TEXT        | Conteúdo do artigo em HTML sanitizado         |
| published         | BOOLEAN     | Publicado (true) ou rascunho (false)          |
| publishedAt       | TIMESTAMPTZ | Data de publicação                            |
| views             | INTEGER     | Contador acumulado de leituras                |
| readTimeMinutes   | INTEGER     | Tempo estimado de leitura, em minutos         |
| createdAt         | TIMESTAMPTZ | Data de criação                               |
| updatedAt         | TIMESTAMPTZ | Data de atualização                           |

### Tabela `blog_categories`

| Campo     | Tipo        | Descrição                    |
| --------- | ----------- | ---------------------------- |
| id        | UUID        | Identificador único          |
| name      | TEXT UNIQUE | Nome da categoria            |
| createdAt | TIMESTAMPTZ | Data de criação              |

### Tabela `blog_post_categories`

| Campo      | Tipo    | Descrição                                            |
| ---------- | ------- | ---------------------------------------------------- |
| postId     | UUID FK | Referência ao artigo (exclusão em cascata)           |
| categoryId | UUID FK | Referência à categoria (exclusão em cascata)         |

> Chave primária composta — um artigo pode ter várias categorias e uma categoria pode reunir vários artigos.

### Tabela `blog_images`

| Campo       | Tipo        | Descrição                                  |
| ----------- | ----------- | ------------------------------------------ |
| id          | UUID        | Identificador único, usado na URL pública  |
| data        | BYTEA       | Conteúdo binário da imagem (WebP)          |
| contentType | TEXT        | Tipo do arquivo (`image/webp`)             |
| width       | INTEGER     | Largura em pixels                          |
| height      | INTEGER     | Altura em pixels                           |
| createdAt   | TIMESTAMPTZ | Data de envio                              |

### Tabela `contact_info`

| Campo        | Tipo        | Descrição                                       |
| ------------ | ----------- | ----------------------------------------------- |
| id           | UUID        | Identificador único (registro único)            |
| mapUrl       | TEXT        | Endereço do mapa incorporado do Google Maps     |
| addressLine  | TEXT        | Logradouro, número e complemento                |
| neighborhood | TEXT        | Bairro                                          |
| cityState    | TEXT        | Cidade e UF                                     |
| postalCode   | TEXT        | CEP                                             |
| createdAt    | TIMESTAMPTZ | Data de criação                                 |
| updatedAt    | TIMESTAMPTZ | Data de atualização                             |

### Tabela `contact_channels`

| Campo         | Tipo        | Descrição                                            |
| ------------- | ----------- | ---------------------------------------------------- |
| id            | UUID        | Identificador único                                  |
| contactInfoId | UUID FK     | Referência ao registro de contato (cascata)          |
| label         | TEXT        | Rótulo do canal (ex.: "WhatsApp", "E-mail")          |
| iconKey       | TEXT        | Ícone escolhido para o canal                         |
| value         | TEXT        | Valor do canal (número, e-mail, endereço web)        |
| sortOrder     | INTEGER     | Ordem de exibição                                    |
| createdAt     | TIMESTAMPTZ | Data de criação                                      |
| updatedAt     | TIMESTAMPTZ | Data de atualização                                  |

### Tabelas de Métricas

| Tabela            | Campos                                  | Finalidade                                  |
| ----------------- | --------------------------------------- | ------------------------------------------- |
| `page_views`      | id, path, createdAt                     | Contagem anônima de visitas por página      |
| `blog_post_views` | id, postId, createdAt                   | Histórico anônimo de leituras por artigo    |

> Nenhuma das tabelas de métricas armazena endereço IP, identificação, localização ou qualquer dado pessoal do visitante.

### Tabelas de Autenticação

| Tabela              | Finalidade                                                   |
| ------------------- | ------------------------------------------------------------ |
| `auth_user`         | Usuário administrador (nome, e-mail, nome de usuário)        |
| `auth_session`      | Sessões ativas, com data de expiração e token                |
| `auth_account`      | Credenciais de acesso — senha armazenada como hash           |
| `auth_verification` | Tokens temporários do mecanismo de autenticação              |

---

## F. Medidas de Segurança Aplicadas

| Medida                           | Descrição                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------ |
| **Senha criptografada**          | Armazenada como hash — irrecuperável mesmo com acesso ao banco                 |
| **Cookie `__Host-` HTTP-only**   | Sessão inacessível por scripts e restrita ao próprio domínio                    |
| **SameSite=strict**              | Impede o envio do cookie a partir de sites de terceiros (proteção contra CSRF)  |
| **Rate limiting**                | 100 req/min no geral · 5 tentativas/min no login                                |
| **Sanitização de HTML**          | Lista restrita de elementos e atributos no conteúdo dos artigos (anti-XSS)      |
| **Validação de entrada (Zod)**   | Todas as rotas de API rejeitam dados fora do formato esperado                   |
| **Content-Security-Policy**      | Restringe a origem de scripts, estilos, imagens e iframes                       |
| **HSTS**                         | Força o uso de HTTPS por 2 anos, com pré-carregamento                           |
| **X-Frame-Options: DENY**        | Impede que o site seja incorporado em iframes de terceiros (anti-clickjacking)  |
| **X-Content-Type-Options**       | Impede a interpretação incorreta do tipo de arquivo pelo navegador              |
| **Referrer-Policy**              | Limita as informações de origem enviadas a sites externos                       |
| **Permissions-Policy**           | Bloqueia acesso a câmera, microfone e geolocalização                            |
| **Validação de nome de arquivo** | As imagens só são servidas por identificador válido, impedindo acesso indevido  |

---

_Este Anexo I é parte integrante do contrato e complementa a descrição técnica do sistema entregue._

---

**Documento elaborado por:** IADA LTDA
**Data:** 14 de setembro de 2026
**Versão do sistema:** 0.1.0
