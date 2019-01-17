export default `
  type List {
    _id: ID,
    id: String,
    title: String,
    desc: String,
    date: String,
    checked: Boolean,
    meta: Meta
  }
 type Meta {
    createdAt:String,
    updatedAt: String
 }
  type Query {
    lists: [List]
  }
 type Output {
    id: String,
    success: Boolean
 }
  input InputType {
     id: String,
     desc: String,
     title: String,
     date: String,
     checked:Boolean
 }
  type Mutation {
    addOne(listObj: InputType): Output,
    delOne(id: String!): Output,
    editOne(listObj: InputType): Output,
    tickOne(id: String!, checked: Boolean!): Output
  }
`;

