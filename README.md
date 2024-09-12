Инструкцию по запуску:
  Запустить json-сервер на 8000 порту (в package.json заменить на json-server --watch db.json --port 8000, npm run server)
  Затем в корне проекта выполнить 2 команды:
    docker build -t react-app .
    docker run -p 3000:3000 react-app
  Приложение будет доступно на localhost:3000

