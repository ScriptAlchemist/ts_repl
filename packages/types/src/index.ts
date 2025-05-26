import { addUserToRegistry, getMetaByField, popLastUser, type User, userRegistry } from './typeRegistry.ts';

console.log("-----Hoisted Files Above Line-----");

addUserToRegistry({
  id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  name: "John Doe",
});

addUserToRegistry({
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: "Sam Smith",
  posts: [
    {
      title: "First Of The Posts",
      content: "This is the content of the first post. Of the posts",
    },
  ],
});

// Fetching User by Name (John Doe)
const johnMeta = getMetaByField<User>(userRegistry, "name", "John Doe");
if (johnMeta) {
  console.log(`Found User: ${johnMeta.name}`);
} else {
  console.log('No User Found');
}

// Fetching User by Name (Sam Smith)
const samMeta = getMetaByField<User>(userRegistry, "name", "Sam Smith");
if (samMeta) {
  console.log(`Found User: ${samMeta.name}`);
  // Removing Sam Smith by ID
  // removeById(userRegistry, samMeta.id);
  popLastUser();
  // popFirstUser();
  // clearAllUsers();
} else {
  console.log('No User Found');
}

// Trying to Fetch Sam Smith Again (After Removal)
const samMetaRetry = getMetaByField<User>(userRegistry, "name", "Sam Smith");
if (samMetaRetry) {
  console.log(`User Still Exists: ${samMetaRetry.name}`);
} else {
  console.log('No User Found - Successfully Removed');
}

console.log('Server Finished');
