
Hanzihero
=====

Hanzihero is the backend application for a project in the course "User Interface Programming II. (Uppsala University). The goal of the project is to create a flashcard application for languages, that require more than 2 sides for a card (ex.: Chinese, where the user would want to separate hanzi, pinjin and meaning).

The application also provides a Swagger documentation under the /docs api.

Quick start
-----------
(for all the following commands the "-d" flag detaches the terminal from the execution)
- "docker-compose build" - build containers (pull db and build app by local Dockerfile)
- "docker-compose run app sh -c "python manage.py makemigrations" - create sql scripts for db
- "docker-compose run app sh -c "python manage.py migrate" - migrate changes from generated scripts to db
- "docker-compose up" - run the application and the db
- "docker-compose up --build" build containers and run them (in one step)
