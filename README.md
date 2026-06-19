# 🌐 bladsvytro.github.io — портфолио Владислава Наумова

Личный сайт-портфолио backend-разработчика (Go). Тёмная тема, акцент Go-cyan,
фильтр проектов, страница резюме + PDF. Чистый **HTML + CSS + vanilla JS**, без сборки.

**Живой сайт:** https://bladsvytro.github.io/

## Разделы
- **Hero** — представление, контакты, код-карточка на Go.
- **О себе / навыки** — стек по группам (языки, backend, devops, инструменты).
- **Проекты** — фильтр: Бэкенд (Go·C) · Лендинги · Telegram-боты. Карточки с демо и кодом,
  коллажи «десктоп + телефон» из реальных скриншотов.
- **Резюме** — [resume.html](resume.html) + кнопка «Сохранить в PDF».
- **Контакты** — Telegram, email, телефон, GitHub.

## Структура
```
├── index.html          # главная (все секции + карточки проектов)
├── resume.html         # печатное резюме (→ PDF через «Печать»)
├── css/style.css
├── js/main.js          # навигация, фильтр проектов, reveal
├── assets/
│   ├── img/            # скриншоты лендингов (desktop+mobile) и чатов ботов
│   └── resume-naumov.pdf
├── .github/workflows/deploy.yml   # авто-деплой на GitHub Pages
└── site.webmanifest · robots.txt · sitemap.xml
```

## Деплой
Репозиторий должен называться **`bladsvytro.github.io`** — тогда сайт доступен по корню
`https://bladsvytro.github.io/`. Settings → Pages → Source: **GitHub Actions**
(workflow уже в репозитории). Пуш в `main` → деплой за ~1 минуту.

## Обновить резюме PDF
Откройте `resume.html` → «Печать» → «Сохранить как PDF», либо пересоберите из исходника.

## Лицензия
MIT — см. [LICENSE](LICENSE).
