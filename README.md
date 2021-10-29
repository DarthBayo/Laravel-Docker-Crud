POTENCIAL CRUD
==============

Primeiro passo é criar o arquivo com as varíaveis de ambiente.  
Pode ser gerado a partir do exemplo, que já está configurado para rodar em produção.  
    ``
    .env.example -> .env
    ``  
    
*Caso não seja executado para gerar o build do container, lembrar de trocar o DB_HOST para localhost*  
    
    DB_HOST=localhost
    
  
Colocar em produção
--------------------

Para colocar a aplicação no ar, é executar:  
    
    docker-compose up --build
    
  
A aplicação vai estar sendo executada na seguinte URL:  
    
    http://localhost:8000
    
  
Para executar as migrações:  
    
    docker exec crud_frontend php artisan migrate
    
  
Para executar as migrações e já popular o banco de dados:  
    
    docker exec crud_frontend php artisan migrate --seed
    
  
Testes
------
  
Com o banco de dados já sendo executado, é digitar em seu terminal:  
    
    php artisan test 
  
**Antes de executar os testes, é preciso que já tenha sido executado ao menos as migrações**
