<h1 align="center">Film! - Онлайн-сервис бронирования билетов</h1>

<div align="center"><img src="frontend/src/assets/logo.svg" /></div>
 

**Film!** - это веб-приложение для бронирования билетов в кинотеатр, состоящее из фронтенда на React и бэкенда на Nest.js. Проект демонстрирует навыки разработки модульного API, работы с базами данных (MongoDB / PostgreSQL), реализации бизнес-логики бронирования и настройки статического контента.

---

## 🛠 Технологии

<div align="center">
  <img src="https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="Nest.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/TypeORM-FF6600?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" alt="Storybook"/>
</div>

- **Nest.js** - фреймворк для построения эффективных и масштабируемых серверных приложений.
- **TypeScript** - строгая типизация.
- **TypeORM** - ORM для работы с PostgreSQL (поддержка также MongoDB).
- **PostgreSQL** - реляционная база данных для хранения фильмов, сеансов и занятых мест.
- **React** - клиентская часть для отображения интерфейса.
- **Vite** - сборка фронтенда.
- **Docker** - контейнеризация приложения (nginx, backend, frontend, PostgreSQL, pgAdmin).

---

## ✨ Функциональность

- 🎬 **Просмотр списка фильмов** - главная страница отображает все доступные фильмы с постерами и краткой информацией.
- 📽️ **Детальная информация о фильме** - по клику открывается расписание сеансов на ближайшие дни.
- 🎟️ **Выбор мест** - интерактивная схема зала с отображением свободных и занятых мест.
- 🛒 **Корзина** - добавление выбранных билетов, удаление, подсчёт итоговой стоимости.
- 📧 **Оформление заказа** - ввод контактных данных (email, телефон) и подтверждение бронирования.
- ✅ **Успешное бронирование** - после оплаты билеты сохраняются в базе, места становятся занятыми.
- 🖼️ **Статический контент** - изображения афиш раздаются через `/content/afisha/*`.
- 🔄 **Поддержка двух СУБД** - приложение может работать с MongoDB или PostgreSQL (выбор через переменную окружения).

---

## 🔍 Особенности реализации

### Архитектура

Проект построен по модульной архитектуре Nest.js:

- **Контроллеры** - обработка HTTP-запросов (`films.controller`, `order.controller`).
- **Сервисы** - бизнес-логика (`films.service`, `order.service`).
- **Репозитории** - абстракция над базой данных (`films.repository`).
- **DTO** - валидация входных данных.
- **Модули** - группировка связанных компонентов (`FilmsModule`, `OrderModule`, `AppConfigModule`).

### База данных

- **PostgreSQL** (или MongoDB) - данные организованы в две таблицы:
  - `films` - информация о фильмах (id, rating, director, tags, title, about, description, image, cover).
  - `schedules` - расписание сеансов (id, daytime, hall, rows, seats, price, taken, filmId).
- Связь: один фильм → много сеансов (`@OneToMany`).
- Поле `taken` хранит занятые места в формате `"row:seat"` (например, `"3:5"`).

### Бронирование билетов

- При создании заказа проверяется:
  - наличие сеанса и фильма;
  - отсутствие дубликатов билетов в одном запросе;
  - свободно ли выбранное место.
- После успешной проверки занятые места добавляются в `taken` соответствующего сеанса.
- Возвращается список подтверждённых билетов.

### Логирование

- Поддерживаются три формата логов: `dev`, `json`, `tskv` (выбирается переменной `LOGGER`).
- В режиме `dev` используется встроенный `ConsoleLogger`, в `json` и `tskv` - кастомные логгеры.

### Конфигурация

- Все настройки (подключение к БД, порт, формат логов) читаются из переменных окружения (`.env`).
- Модуль `AppConfigModule` предоставляет объект `CONFIG` для доступа к параметрам базы данных.

---

## 🧱 Структура проекта

```
film-react-nest/
├── backend/                  # Бэкенд на Nest.js
│   ├── src/
│   │   ├── films/            # Модуль фильмов (контроллер, сервис, DTO, сущности)
│   │   ├── order/            # Модуль заказов (контроллер, сервис, DTO)
│   │   ├── repository/       # Репозиторий (работа с TypeORM)
│   │   ├── logger/           # Кастомные логгеры
│   │   ├── app.module.ts     # Главный модуль
│   │   ├── main.ts           # Точка входа
│   │   └── ...
│   ├── public/               # Статические файлы (изображения афиш)
│   ├── test/                 # Тестовые данные и SQL-скрипты
│   ├── .env.example
│   └── package.json
├── frontend/                 # Фронтенд на React + Vite
│   ├── src/
│   │   ├── components/       # UI-компоненты
│   │   ├── hooks/            # Хуки (useAppState)
│   │   ├── utils/            # API-клиент, константы, состояние
│   │   └── ...
│   ├── .env.example
│   └── package.json
├── nginx/                    # Конфигурация nginx
├── docker-compose.yml        # Запуск всех сервисов
├── .github/workflows/        # GitHub Actions (тесты, сборка Docker)
└── README.md
```

---

## 🚦 Запуск проекта локально

### Требования
- Node.js 18+
- Docker и Docker Compose (для контейнеров) или локально установленные PostgreSQL / MongoDB

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-username/film-react-nest.git
cd film-react-nest
```

### 2. Настройка переменных окружения
Создайте файл `.env` в корне проекта (или в папке `backend`) на основе `.env.example`:
```bash
cp backend/.env.example backend/.env
# Отредактируйте переменные (DATABASE_DRIVER, DATABASE_HOST и т.д.)
```

Пример для PostgreSQL:
```
DATABASE_DRIVER=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=film
LOGGER=dev
```

Для MongoDB (если используется) измените `DATABASE_DRIVER=mongodb` и укажите `DATABASE_URL`.

### 3. Запуск базы данных
Если используется Docker:
```bash
docker-compose up -d postgres pgadmin
```

Или установите PostgreSQL локально и создайте базу данных `film`.

### 4. Заполнение тестовыми данными
Выполните SQL-скрипты из папки `backend/test/`:
- `prac.init.sql` - создание таблиц.
- `prac.films.sql` - вставка фильмов.
- `prac.shedules.sql` - вставка расписания.

Можно использовать pgAdmin или psql:
```bash
psql -U postgres -d film -f backend/test/prac.init.sql
psql -U postgres -d film -f backend/test/prac.films.sql
psql -U postgres -d film -f backend/test/prac.shedules.sql
```

### 5. Запуск бэкенда
```bash
cd backend
npm install
npm run start:dev
```

Бэкенд будет доступен на `http://localhost:3000`.

### 6. Запуск фронтенда
```bash
cd frontend
npm install
npm run dev
```

Фронтенд будет доступен на `http://localhost:5173`.

### 7. Запуск через Docker (все сервисы)
```bash
docker-compose up -d
```

После этого:
- Фронтенд: `http://localhost`
- Бэкенд API: `http://localhost/api/afisha`
- pgAdmin: `http://localhost:8080` (логин/пароль из .env)

---

## 📌 API Документация

Все эндпоинты имеют префикс `/api/afisha`.

| Метод | Эндпоинт               | Описание                          |
|-------|------------------------|-----------------------------------|
| GET   | `/films`               | Получить список всех фильмов      |
| GET   | `/films/:id/schedule`  | Получить расписание сеансов фильма|
| POST  | `/order`               | Оформить заказ (бронирование)     |

### Примеры ответов

#### GET /films
```json
{
  "total": 6,
  "items": [
    {
      "id": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      "rating": 2.9,
      "director": "Итан Райт",
      "tags": ["Документальный"],
      "title": "Архитекторы общества",
      "about": "...",
      "description": "...",
      "image": "/bg1s.jpg",
      "cover": "/bg1c.jpg",
      "schedule": [...]  // полный список сеансов
    }
  ]
}
```

#### GET /films/:id/schedule
```json
{
  "total": 9,
  "items": [
    {
      "id": "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
      "daytime": "2024-06-28T10:00:53+03:00",
      "hall": 0,
      "rows": 5,
      "seats": 10,
      "price": 350,
      "taken": []
    }
  ]
}
```

#### POST /order
**Тело запроса:**
```json
{
  "email": "test@test.ru",
  "phone": "+7(000)000-00-00",
  "tickets": [
    {
      "film": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      "session": "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
      "daytime": "2024-06-28T10:00:53+03:00",
      "row": 3,
      "seat": 5,
      "price": 350
    }
  ]
}
```
**Ответ:**
```json
{
  "total": 1,
  "items": [
    {
      "film": "0e33c7f6-27a7-4aa0-8e61-65d7e5effecf",
      "session": "f2e429b0-685d-41f8-a8cd-1d8cb63b99ce",
      "daytime": "2024-06-28T10:00:53+03:00",
      "row": 3,
      "seat": 5,
      "price": 350
    }
  ]
}
```

---

## 🎯 Цель проекта

Проект выполнен в рамках учебной программы для закрепления навыков:

- разработки модульных серверных приложений на Nest.js;
- работы с TypeORM и переключением между различными СУБД;
- реализации бизнес-логики бронирования с учётом конкурентного доступа;
- интеграции фронтенда с API и раздачи статического контента;
- контейнеризации приложения с помощью Docker.

---

## 📝 Что сделано мной

- Разработана полная архитектура бэкенда: модули, контроллеры, сервисы, репозитории.
- Реализованы сущности `Film` и `Schedule` для TypeORM с отношением один-ко-многим.
- Настроено конфигурирование базы данных через переменные окружения.
- Реализована бизнес-логика бронирования с проверкой дубликатов и занятости мест.
- Добавлена поддержка различных форматов логирования (dev, json, tskv).
- Настроена раздача статических изображений через `ServeStaticModule`.
- Проведена интеграция с фронтендом, обеспечена полная совместимость API.
- Написаны тесты для контроллеров и сервисов.
