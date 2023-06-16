<p align="center">
  <a href="https://imgbb.com">
    <img src="https://i.ibb.co/f2R31zy/Algo-Math.png" alt="Bootstrap logo" width="500" height="250">
  </a>
</p>

<h2 align="center">AlgoMath</h2>

<p align="center">
Данный проект представляет собой сайт, который позволяет студентам заказывать выполнение различных работ и получать консультацию от опытных специалистов.
</p>



## Технологии
- **Backend**
  - Java 17
  - Spring Boot 3.0
  - Postgres 15
  - MinIO 8.5.2
  - JPA
  - Flyway 9
  - Maven
- **Frontend**
  - HTML/CSS
  - React
  - Redux
- **Deployment**
  - Docker compose

Для удобства запуска приложения в различных окружениях используется Docker.

## Запуск приложения

Для запуска приложения необходимо установить Docker на свой компьютер. После этого следуйте инструкциям:

1. Склонируйте репозиторий на свой компьютер
```
git clone https://github.com/AlexPams/AlgoMath.git
```
2. Перейдите в корневую директорию проекта
```
cd AlgoMath
```
3. Запустите `docker-compose` командой
```
cd docker
docker-compose up
```

После этого приложение должно быть доступно по адресу [http://localhost](http://localhost).

## Технический план
Технический план продукта представлен в [техническом задании](TZ.md).

## Схема базы данных
Схема базы данных представлена в [схеме базы данных](AppDB.drawio(1).png).

## Contributing

Если вы хотите внести свой вклад в развитие проекта, то можете делать это через pull request. Хороший практикой является создание отдельной ветки для каждой новой функции или исправления багов.

## Авторы

* Гресь Владимир - разработчик серверной части
* Ветров Александр - разработчик клиентской части