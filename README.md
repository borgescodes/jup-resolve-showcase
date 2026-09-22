# Jup Resolve Showcase

Apresentação interativa do Jup Resolve preparada para hospedagem estática no GitHub Pages.

## Estrutura

- `site/`: único diretório publicado no GitHub Pages.
- `site/assets/`: assets usados pela apresentação, organizados por função.
- `site/architecture/`: arquitetura detalhada original aberta pela cena 06.
- `tests/`: testes de comportamento da apresentação. Não é publicado pelo Pages.
- `.github/workflows/pages.yml`: valida e publica `site/`.

## Executar localmente

Na raiz do repositório:

```bash
python -m http.server 8080 --directory site
```

Abra `http://localhost:8080`.

A cena 05 mantém o fallback visual existente. Quando a aplicação local do Jup estiver disponível em `http://127.0.0.1:8000`, a apresentação tenta usar a superfície ao vivo. Em hospedagem estática, o fallback continua funcionando.

## Validar

```bash
npm test
```

## GitHub Pages

O workflow publica somente `site/`. No repositório, configure **Settings > Pages > Source** como **GitHub Actions** caso o Pages ainda não esteja habilitado.
