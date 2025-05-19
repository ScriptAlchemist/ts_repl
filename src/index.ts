import { $User, getMetaByField, safeParseOr, User, userRegistry } from './typeRegistry.ts';
console.log("-----Hoisted Files Above Line-----");
console.log("Running Index.ts");

console.log("Create some types to tests out");

$User.clone().register(userRegistry, {
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  name: "John Doe",
  posts: [
    {
      title: "First Post",
      content: "This is the content of the first post.",
    },
  ],
});

// const userMeta = getMetaBySchema(User);

$User.clone().register(userRegistry, {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: "Sam Smith",
  posts: [
    {
      title: "First Of The Posts",
      content: "This is the content of the first post. Of the posts",
    },
  ],
});

// const userMetaTwo = getMetaBySchema(UserTwo);

// if (userMeta && $User.safeParse(userMeta).success) {
//   console.log('(user by schema) name: ', userMeta.name);
// }
// if (userMetaTwo && $User.safeParse(userMetaTwo).success) {
//   console.log('(userTwo by schema) name: ', userMetaTwo.name);
// }

const johnMeta: User | undefined = getMetaByField<User>("name", "John Doe");
console.log(johnMeta);

const samMeta = getMetaByField("name", "Sam Smith");
console.log(samMeta);

// if (userMetaTwo && $User.safeParse(userMetaTwo).success) {
//   console.log('(userTwo by schema) name: ', userMetaTwo.name);
// }

// console.log("Found User:", foundUser);

console.log('Server Finished');
