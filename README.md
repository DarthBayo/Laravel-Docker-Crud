## Mais um CRUDizin

# Para darmos início no projeto

Antes de começar o processo para subir o serviço, lembrar de criar o arquivo de ambiente.
Pode só copiar e colar o .env.example

É preciso executar:
    docker-compose up

A aplicação estara executando seguintes na seguinte URL:
    http://localhost:8000

Para executar as migrações:
     docker exec crud_frontend php artisan migrate

Para executar as migrações e já popular o banco de dados:
     docker exec crud_frontend php artisan migrate --seed
