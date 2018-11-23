# node_api

* `/api`
    * `/auth`
        * `POST - /register` | `{email: 'john.doe@example.fr', password: '123'}`
        * `POST - /login` | `{email: 'john.doe@example.fr', password: '123'}`
    * `/chat`
        * `POST - /` | `{message: 'Bonjour !'}`
        * `GET - /`