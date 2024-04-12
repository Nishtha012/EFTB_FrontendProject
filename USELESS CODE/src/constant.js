//defined graphQL schema
const { ApolloServer, gql } = require('apollo-server');  
const typeDefs = gql`  
  type Company {  
    name: String  
    owner: String  
  }  
  type Query {  
    companies: [Company]  
  }  
`;  
//defined dataset
const companies = [  
    {  
      name: 'Infosys',  
      owner: 'N.R Narayan Murthy',  
    },  
    {  
      name: 'Wipro',  
      owner: 'Mohamed Hasham Premji',  
    },  
    {  
      name: 'Reliance Industries',  
      owner: 'Dhirubhai Ambani',  
    },  
    {  
      name: 'Bajaj Auto',  
      owner: 'Jamnalal Bajaj',  
    },  
  ];  

 // defined resolver
  const resolvers = {  
    Query: {  
      companies: () => companies,  
    },  
  };  


  // instance of apollo server
  const server = new ApolloServer({ typeDefs, resolvers });  
server.listen().then(({ url }) => {  
  console.log(`Server ready at ${url}`);  
});  