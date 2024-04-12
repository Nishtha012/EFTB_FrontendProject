const { ApolloServer, gql } = require('apollo-server'); 
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const typeDefs = gql`  
  type user {  
    username: String! 
    password: String! 
  }  
  type Query {  
    user: [user]  
  }  
`;

//defined dataset
const user = [  
  {  
    username: 'nishtha',  
    password: '1234',  
  },  
  {  
    username: 'tom',  
    password: '1234666',  
  },  

];  

 // defined resolver
 const resolvers = {  
  Query: {  
    user: () => user,  
  },  
};

 // instance of apollo server
 const server = new ApolloServer({ typeDefs, resolvers });  
 server.listen().then(({ url }) => {  
   console.log(`Server ready at ${url}`);  
 });  