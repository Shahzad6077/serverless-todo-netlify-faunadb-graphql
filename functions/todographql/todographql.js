const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
require("dotenv").config()
const query = faunadb.query

const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })

const typeDefs = gql`
  type Todo {
    id: ID
    userId: String!
    text: String!
    archived: Boolean
    ts: String
  }

  type Query {
    getAllTodosById: [Todo]!
  }

  type Mutation {
    createTodo(text: String!): Todo!
    archivedTodo(todoId: ID!): Todo!
    deleteTodo(todoId: ID!): Todo!
  }
`

const resolvers = {
  Query: {
    getAllTodosById: async (root, args, context) => {
      try {
        const hasUser = context.context.clientContext.user
        if (!hasUser) {
          return new Error("You're not authorized.")
        }
        const docRefs = query.Paginate(
          query.Match(query.Index("allTodosById"), hasUser.sub)
        )

        let results = await client.query(
          query.Map(docRefs, query.Lambda("ref", query.Get(query.Var("ref"))))
        )
        results = results.data.map(o => ({
          id: o.ref.id,
          ts: `${o.ts}`,
          ...o.data,
        }))

        return results
      } catch (err) {
        return err
      }
    },
  },
  Mutation: {
    archivedTodo: async (root, args, context) => {
      try {
        const { todoId } = args
        const hasUser = context.context.clientContext.user
        if (!hasUser) {
          return new Error("You're not authorized.")
        }

        const docRef = query.Ref(query.Collection("Todo"), `${todoId}`)
        const result = await client.query(
          query.Update(docRef, {
            data: {
              archived: true,
            },
          })
        )

        return {
          id: result.ref.id,
          ts: `${result.ts}`,
          ...result.data,
        }
      } catch (err) {
        return err
      }
    },
    createTodo: async (root, args, context) => {
      try {
        const { text } = args
        const hasUser = context.context.clientContext.user
        if (!hasUser) {
          return new Error("You're not authorized.")
        }

        const result = await client.query(
          query.Create("Todo", {
            data: {
              userId: hasUser.sub,
              text,
              archived: false,
            },
          })
        )

        return {
          id: result.ref.id,
          ts: `${result.ts}`,
          ...result.data,
        }
      } catch (err) {
        return err
      }
    },
    deleteTodo: async (root, args, context) => {
      try {
        const { todoId } = args
        const hasUser = context.context.clientContext.user
        if (!hasUser) {
          return new Error("You're not authorized.")
        }

        const docRef = query.Ref(query.Collection("Todo"), todoId)
        const result = await client.query(query.Delete(docRef))

        return {
          id: result.ref.id,
          ts: `${result.ts}`,
          ...result.data,
        }
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
    return {
      event,
      context,
    }
  },
})

const handler = server.createHandler()

module.exports = { handler }
