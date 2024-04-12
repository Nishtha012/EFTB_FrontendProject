// Modify the schema
const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Mutation {
    registerUser(username: String!, password: String!): User
  }
`);

// Modify the root resolver
const root = {
  registerUser: async ({ username, password }) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing password
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save(); // Save the new user to the database
      return newUser;
    } catch (error) {
      throw new Error(`Failed to register user: ${error.message}`);
    }
  },
};
