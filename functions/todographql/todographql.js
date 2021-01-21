const { ApolloServer, gql } = require("apollo-server-lambda")

const typeDefs = gql`
  type Todo {
    id: ID
    userId: String!
    text: String!
    archived: Boolean
    ts: number
  }

  type Query {
    getAllTodosById(userId: String!): [Todo!]!
  }

  # type Mutation {
  #   createTodo(userId: String!, data: Todo!): Todo!
  #   archivedTodo(todoId: ID!, userId: String!): Todo!
  #   deleteTodo(todoId: ID!): Boolean!
  # }
`

const resolvers = {
  Query: {
    getAllTodosById: async (root, args, context) => {
      try {
        console.log(args, context)
        const docRefs = Paginate(Match(Index("allTodosById"), "123"))

        let results = await client.query(
          Map(docRefs, Lambda("ref", Get(Var("ref"))))
        )
        results = results.data.map(o => ({
          id: o.ref.id,
          ts: o.ts,
          ...o.data,
        }))
        return results
      } catch (err) {
        return err
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context, ...rest }) => {
    console.log("context-->", event, context, rest)
    return {
      event,
      context,
    }
  },
})

const handler = server.createHandler()

module.exports = { handler }
