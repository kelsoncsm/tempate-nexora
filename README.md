# nexoraV2 — template estático

Protótipo visual navegável do Nexora (**HTML/CSS/JS puro**, sem build), construído a partir
do `dentalflow-template` com **tema claro** (referência `reference/Nexora_telas.png`).

É a base visual **antes** de qualquer reimplementação em Angular. Cada tela que existe hoje no
Nexora tem uma página aqui, todas acessíveis pelo menu lateral. A organização final do menu
("onde cada tela fica") ainda vai ser definida.

## Como abrir

Abra `index.html` no navegador, ou sirva a pasta:

```bash
python -m http.server 4300      # depois: http://localhost:4300
```

## Estrutura

```
index.html              Login (card centralizado)
pages/                   Uma página por tela
assets/css/             style.css (tokens + sidebar clara), components.css, responsive.css
assets/js/              app.js (sidebar/modais/tabs), sidebar.js, components.js (Chart.js)
partials/sidebar.html   Bloco canônico da sidebar+topbar (referência — está colado em cada página)
reference/              Imagens de referência do visual desejado
```

## Mapa de telas

| Grupo | Página | Tela Nexora |
|---|---|---|
| — | `index.html` | Login (`/login`) |
| — | `pages/cadastro.html` | Cadastro (`/cadastro`) |
| — | `pages/convite-aceitar.html` | Aceitar convite (`/convite/aceitar`) |
| — | `pages/onboarding.html` | Onboarding, 5 passos (`/onboarding`) |
| — | `pages/configuracao-inicial.html` | Configuração da vertical (`/configuracao-inicial`) |
| — | `pages/selecionar-empresa.html` | Seletor de empresa (`/selecionar-empresa`) |
| — | `pages/erro-403/404/500.html` | Páginas de erro |
| Principal | `pages/dashboard.html` | Visão Geral (`/`) |
| Principal | `pages/agenda.html` | Agenda (`/agenda`) |
| Principal | `pages/clientes.html` | Clientes (`/clientes`) |
| Principal | `pages/profissionais.html` | Profissionais (`/profissionais`) |
| Principal | `pages/servicos.html` | Serviços (`/servicos`) |
| Principal | `pages/relatorios.html` | Relatórios (`/relatorios`) |
| Gestão | `pages/equipe.html` | Usuários e Equipe (`/equipe`) |
| Gestão | `pages/assinatura.html` | Plano e Assinatura (`/assinatura`) |
| Gestão | `pages/configuracoes.html` | Hub de configurações (`/configuracoes`) |
| Configurações | `pages/empresa.html` | Empresa (`/empresa`) |
| Configurações | `pages/perfis.html` | Perfis e Papéis (`/perfis`) |
| Configurações | `pages/permissoes.html` | Permissões (`/permissoes`) |
| Conta | `pages/perfil.html` | Meu Perfil (`/perfil`) |
| Plataforma | `pages/admin.html` | Painel Admin (`/admin`) |
| Plataforma | `pages/admin-assinaturas.html` | Assinaturas (`/admin/assinaturas`) |
| Plataforma | `pages/admin-billing.html` | Preços e Invoices (`/admin/billing`) |
| Plataforma | `pages/admin-relatorios.html` | Relatórios da plataforma (`/admin/relatorios`) |

O grupo **Plataforma** na aplicação real só aparece para Platform Admin — aqui fica sempre
visível para facilitar a navegação pelo protótipo.

## Notas

- Dados são **fictícios**. Nenhuma integração, roteamento SPA ou autenticação real.
- Ao mudar a navegação, atualize `partials/sidebar.html` **e** o bloco `<aside class="sidebar">`
  em todas as `pages/*.html` (o markup é duplicado por ser site estático).
- Libs externas via CDN: Inter (Google Fonts), Font Awesome 6.5.1 (cdnjs), Chart.js 4.4.1 (jsdelivr).
