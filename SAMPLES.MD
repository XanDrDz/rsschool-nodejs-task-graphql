I used POSTMAN for requests.

http://127.0.0.1:3000/graphql

Use body - GraphQL

------------query---------------------------

1.  QUERY:  query { users { id firstName lastName } }
    GRAPHQL VARIABLES: {"limit": 10}
2.  QUERY:  query { posts { id, userId, title, content } }
    GRAPHQL VARIABLES: {"limit": 10}
3.  QUERY:  query { profiles { id, avatar, sex, birthday, country, street, city, memberTypeId, userId } }
    GRAPHQL VARIABLES: {"limit": 10}
4.  QUERY:  query { memberTypes { id, discounts, monthPostsLimits } }
    GRAPHQL VARIABLES: {"limit": 10}
5.  QUERY:  query { user(id: "7a0e5d8b-0e33-4491-8d31-9a3b6ea8a364") { id firstName email } }  // ID need to past for existing user
    GRAPHQL VARIABLES: {"limit": 10}
6.  QUERY:  query { post(id: "cb682d33-39cf-4eda-a632-84026bbc19a9") { id, userId, title, content } }
    GRAPHQL VARIABLES: {"limit": 10}
7.  QUERY:  query { profile(id: "c1172a94-6b6c-4aa4-94e9-9003f8391fdc") { id avatar sex birthday country street city memberTypeId userId } }
    GRAPHQL VARIABLES: {"limit": 10}
8.  QUERY:  query { memberType(id: "business") { id discounts monthPostsLimits } }

---------mutation-----------------------

1. QUERY: mutation { createUser(firstName: "John", lastName: "Doe", email: "johndoe@example.com") { id firstName lastName } }    ---------(here you need to copy ID e.x 6689d048-a0ee-4da8-afb3-35ad2d8cc837)
2. QUERY: mutation { createPost(title: "newTitle", content: "TEST", userId: "49590209-9a88-453a-85eb-e01b8ff6a60d") { id title content userId } }
3. QUERY: mutation { createProfile(avatar: "Avatar", sex: "Male", birthday: "03.04.1992", country: "Uzb", street: "Us Nosir", city: "Tashkent", memberTypeId: "6689d048-a0ee-4da8-afb3-35ad2d8cc837", userId: "6689d048-a0ee-4da8-afb3-35ad2d8cc837") { id avatar sex birthday country street city memberTypeId userId } }
4. QUERY: mutation { updateUser(id: "03fbf712-5932-49de-9f81-37110fe48159", input: { firstName: "Alesokw", lastName: "beEr", email: "sdasd@sda.ru" }) { id firstName lastName email } }
5. QUERY: mutation { updateProfile(id: "1e72ad7d-d597-4b54-bd47-5af785f3bf80", input: { avatar: "Alesokw", sex: "beEr", birthday: "sdasd@sda.ru", country: "Uzbsd", street: "Maxtum", city: "Ukr", memberTypeId: "123123", userId: "12312523" }) { avatar sex birthday country street city memberTypeId userId  } }
6. QUERY: mutation { updatePost(id: "bfd05cbb-9b88-47c8-8ca1-299ffa63ab11", input: { userId: "Alesokw", title: "Toiule", content: "Test" }) { id userId title content } }
7. QUERY: mutation { updateMemberType(id: "business", input: { discounts: 10, monthPostsLimits: 10 }) { id discounts monthPostsLimits } }