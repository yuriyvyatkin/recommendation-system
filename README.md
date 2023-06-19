## Система рекомендаций

🚧 Внимание! Проект в процессе разработки. 🚧

**🛠️ Стек**

React + Redux Toolkit + Redux Thunk + TypeScript + React Router + Mui + Axios + Faker + ESLint + Prettier + Vite + PNPM


**🚀 Основная информация**

Это онлайн-платформа, которая рекомендует пользователям новый контент, который может заинтересовать их, и побудить пользователей потреблять больше контента на этой платформе.

Рекомендации могут быть по музыке/фильмам/книгам/новостям и др.

<!-- ![главная страница приложения](https://iili.io/какое-то название.jpg) -->

**📚 Инструкция по работе с проектом**

##### 1. Клонирование

```
git clone https://github.com/yuriyvyatkin/recommendation-system.git
```

```
cd recommendation-system
```

##### 2. Установка менеджера пакетов

###### Если ваш Node.js выше версии 16.14

```
npm install -g pnpm
```

###### иначе

```
npm install -g @pnpm/exe
```

##### 3. Установка зависимостей

```
pnpm install
```

##### 4. Запуск

```
pnpm dev
```

##### 5. Пути

Приложение имеет абсолютные пути
Пример: '@/components/Counter/Counter';

##### 6. Скрипты

| Скрипт        | Описание                            |
| ------------- | ----------------------------------  |
| pnpm dev      | Запуск приложения                   |
| pnpm build    | Сборка приложения                   |
| pnpm preview  | Запуск Vite превью                  |
| pnpm lint     | Отобразить ошибки eslint            |
| pnpm lint:fix | Исправить ошибки eslint             |
| pnpm format   | Запустить prettier для всех файлов  |

**⚙️ Возможности**:

 - **Регистрация пользователя:**
   - Через Gmail (валидация почты, Regexp)

   - Почта

   - Пароль

   - Имя

   - Пол

   - Возраст

 - **Авторизация пользователя**:

   - Через Gmail

     или

   - Почта

   - Пароль

 - **Сброс пароля пользователя**:

   - Письмо на почту с ссылкой на сброс старого пароля

   - Создание нового пароля

   - Подтверждение нового пароля

 - **CRUD для Админа**

   При создании нового элемента заполняются следующие поля:

   - Название

   - Автор

   - Альбом

   - Изображение

   - Жанр

   - Аудиозапись/Видеозапись/Текст

     - возможность загрузить видео, аудиозапись, статью, текст и др.

   - Год выпуска

 - **Поиск**:

   - Живой поиск по названию

 - **Фильтрация**:

   - По автору

   - По жанру

   - По названию

 - **Избранное (любимое)**:

   - Контент, который пользователю понравился

 - **Рекомендации**:

   - Популярное

   - Новинка

   - По вкусу пользователя
