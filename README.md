# Desafio 2 - JavaScript, DOM e Fetch APIDescrição

## Por que este desafio é importante?
Nos desafios anteriores, você criou páginas estáticas com HTML e CSS. Agora, vamos adicionar inteligência a elas!  
O JavaScript permite que suas páginas interajam com o usuário e, mais importante, se comuniquem com o "mundo exterior" através de APIs.  
Neste desafio, você vai simular um processo muito comum no dia a dia do desenvolvimento: buscar dados de uma fonte externa (a API do IBGE) e exibir essas informações de forma dinâmica na tela.  
É o seu primeiro passo para construir aplicações web de verdade.

## O Desafio

O seu objetivo é criar uma página web que exibe uma lista de municípios de um estado, de acordo com a seleção do usuário. Todos os dados devem ser buscados da API do IBGE.

## O que fazer?
Construa a Interface: Crie uma página simples em HTML e CSS com dois elementos principais:  
Uma caixa de seleção (<select>) para a pessoa escolher a UF (Unidade Federativa).  
Uma tabela para exibir os municípios da UF selecionada.

**Busque os Dados: Use JavaScript para:**  
- Preencher a caixa de seleção com todas as UFs do Brasil, obtidas da API do IBGE.  
- Preencher a tabela com os municípios da UF selecionada, também obtidos da API.

**Entrega:**  
A entrega deve ser feita através de uma Release no GitHub. Envie o arquivo ZIP da release e o link do seu repositório pessoal no Google Classroom.

## Requisitos Essenciais
- A tabela deve ser preenchida com os municípios da UF que o usuário selecionar.
- A caixa de seleção deve listar todas as UFs do Brasil.
- Quando a página carregar, a tabela deve estar vazia e a caixa de seleção deve exibir "Selecione uma UF".
- Você pode usar frameworks CSS como Bootstrap para acelerar o desenvolvimento.
- O código JavaScript deve estar em um arquivo separado.
- Seu código precisa ser organizado, indentado e legível.

## Desafios Extras
Se você quiser ir além e se destacar, tente:  
Adicionar validações na seleção de UF.  
Exibir mensagens amigáveis para erros de conexão com a API.  
Implementar paginação na tabela, caso o número de municípios seja muito grande.
