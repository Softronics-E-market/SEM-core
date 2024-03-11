export default `
    type User {
        firstName: String!
        lastName: String
        phone: String
        email: String
        userUuid: String!
    }

    type Query {
        getUser(userUuid: ID!): User!
        verifyUserOrder(userUuid: ID!, orderUuid: ID!): Boolean!
    }
`;
