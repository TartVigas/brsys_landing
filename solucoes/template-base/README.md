# BRsys • Template Base (Soluções por Ramo)

Pasta: `/solucoes/template-base/`

## Como usar (rápido)
1. Copie a pasta `template-base` para `/solucoes/<ramo>/`
2. Edite o `index.html` e troque:
   - `[RAMO_TITULO]` (ex.: Assistência Técnica)
   - `[RAMO_SLUG]` (ex.: assistencia-tecnica)
   - `[RAMO_DESC]` (descrição curta e forte)
   - `[HERO_IMG]` (arquivo dentro de `/img/solucoes/`)

3. Personalize identidade no `theme.css` (sem mexer no `app.css`):
   - `--brand` e `--brand2`
   - opcional: `--hero-img` e `--hero-grad`

## Regra de ouro
- `app.css` = base global (layout/estrutura do domínio)
- `theme.css` = identidade por ramo/cliente (cores/hero)

Assim você cria `/solucoes/<ramo>/` e no futuro `/clientes/<nome>/` sem retrabalho.
