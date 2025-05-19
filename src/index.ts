import { $User, addUserToRegistry, getMetaByField, removeById, type User, userRegistry } from './typeRegistry.ts';
console.log("-----Hoisted Files Above Line-----");

addUserToRegistry({
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  name: "John Doe",
  posts: [
    {
      title: "First Post",
      content: "This is the content of the first post.",
    },
  ],
})

addUserToRegistry({
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: "Sam Smith",
  posts: [
    {
      title: "First Of The Posts",
      content: "This is the content of the first post. Of the posts",
    },
  ],
})

const johnMeta: User | undefined = getMetaByField<User>("name", "John Doe");
if (!$User.safeParse(johnMeta).success || !johnMeta) {
  console.log('No User Found');
} else {
  console.log(johnMeta.name);
}

const samMeta = getMetaByField<User>("name", "Sam Smith");
if (!$User.safeParse(samMeta).success || !samMeta) {
  console.log('No User Found');
} else {
  console.log(samMeta.name);
  removeById(userRegistry, samMeta.id);
}

const samMetaRetry = getMetaByField<User>("name", "Sam Smith");
if (!$User.safeParse(samMetaRetry).success || !samMetaRetry) {
  console.log('No User Found');
} else {
  console.log(samMetaRetry.name);
}
console.log('Server Finished');
