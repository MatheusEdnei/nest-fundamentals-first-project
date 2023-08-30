Tudo começa no arquivo *main.ts*, onde temos a instância da classe e em que porta o nest será iniciado.
O main.ts carrega o app.module.ts, ele cria os controllers e os services.
Todos os request são interceptados por controllers.

# Conceitos fundamentais

## Bootstrap

Auxiliador para iniciar a aplicação. No Nest temos uma função bootstrap, que será chamada primeiro para carregar o primeiro módulo da aplicação. Ela fica no arquivo *main.ts*. Ela pode ter qualquer outro nome. 

## Decorators

São funções que modificam o comportamento de classes, objetos etc. São identificados pelo @.

## Module

Divisão de sessões da aplicação, separando a aplicação em módulos. Ele agrupa recursos. Podemos colocar dentro do módulo controllers e serviços. Podemos importar outros módulos dentro do meu módulo, assim como exportar as funcionalidades do meu módulo.

## Controller

Ele serve como um "meio de campo" para atender a solicitação dos requests dos clientes, sendo amarrado a uma rota especifica. 

## Pipes

Pipes (ou tubos em portugues) são classes com decorator @Injectable() e devem implementar a interface 
PipeTransform.
Os pipes normalmente são usados para transformar os dados que passam por eles ou para validá-los.

## Middlewares

Sempre estarão no contexto de chamadas http.
## Service

O service é responsável por processar as regras, processar as informações do banco de dados. Por boas práticas, o controller deveria chamar o Service.

## Métodos HTTP

PUT e PATCH - O PUT vai definir como os dados irão ficar, ou seja passando exatamente todos os dados do registro do jeito que está estabelecido na tabela. Se eu não passar nenhum dado significa que eu estou excluindo os dados. No caso do PATCH eu vou modificar apenas o dado que quero alterar.

## DTO

Data transfer object é uma forma (padrão de projeto) de transferir dados de um ambiente da aplicação para outro ambiente. É muito comum utilizarmos isso quando recebemos informações do banco de dados e precisamos transferir essas informações para outra parte do código.
Isso é importante porque conseguimos validar e transformar a estrutura dos dados.

## Validation Pipe

O pipe indica um "tubo" onde o request está passando. O validation pipe é um tubo de validação.

## Banco de dados

O NestJS já implementa módulos para banco de dados, podendo ser integrado em bancos SQL e NoSQL.
Para isso podemos usar um ORM (Object Relational Mapping.). O ORM faz a camada de comunicação entre os objetos e classes da nossa linguagem e o banco de dados.
ORM significa Mapeamento de objeto Relacional e se trata de uma técnica de desenvolvimento utilizada para representar as tabelas ou coleções de um banco de dados com classes e objetos.
Cada tabela ou coleção terá uma classe que descreve sua estrutura e as intâncias dessa classe ou objetos são os registros.

## Fluxo

Request -> Controller -> Service -> BD
