const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/Login_Register', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

//  MongoDB schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Constructing Schema here
const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Query {
    users(username : String, password : String): String
  }

  type Mutation {
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): User
  }
`);

// The root 
// const root = {
//   users: async () => await User.find(),
//   registerUser: async ({ username, password }) => {
//     const user = new User({ username, password });
//     await user.save();
//     return user;
//   },
//   loginUser: async ({ username, password }) => {
//     return await User.findOne({ username, password });
//   },
// };

const root = {
  user: async () => await User.find(),
  user: async ({ username }) => await User.findOne({ username }),
  registerUser: async ({ username, password }) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      const newUser = new User({ username, password });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(`Failed to register user: ${error.message}`);
    }
  },
};

const app = express();

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL interface
}));

// Starting the server here
const port = 4001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
