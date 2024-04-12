const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/Login_Register', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Query {
    user(username: String): User
  }

  type Mutation {
    registerUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): User
  }
`);

const root = {
  user: async ({ username }) => await User.findOne({ username }),
  registerUser: async ({ username, password }) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing password
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(`Failed to register user: ${error.message}`);
    }
  },
  loginUser: async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password); // Comparing hashed password
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      
      return user;
    } catch (error) {
      throw new Error(`Failed to login: ${error.message}`);
    }
  },
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const port = 4002;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
