// src/typeRegistry.ts

import { z } from "zod/v4";
import { $ZodRegistry, GlobalMeta } from "zod/v4/core";

export const $User = z.object({
  id: z.uuid(),
  name: z.string(),
  posts: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ).optional(),
});

export type User = z.infer<typeof $User>;

// Explicitly Typed User Registry
export const userRegistry: $ZodRegistry<User> = z.registry<User>();
console.log("User Registry setup");

// Function to Add User to Registry
export function addUserToRegistry(user: User): void {
  $User.clone().register(userRegistry, user);
  console.log(`User ${user.name} added to registry.`);
}

// Function to Get Metadata by Field
export function getMetaByField<T extends GlobalMeta>(
  registry: $ZodRegistry<T>,
  field: keyof T,
  value: unknown
): T | undefined {
  for (const schema of registry._idmap.values()) {
    const meta = registry.get(schema) as T | undefined;
    if (meta && meta[field] === value) {
      return meta;
    }
  }
  return undefined;
}

// Function to Remove User by ID
export function removeById(registry: $ZodRegistry<User>, id: string): boolean {
  for (const [key, schema] of registry._idmap.entries()) {
    const meta = registry.get(schema);
    if (meta && meta.id === id) {
      registry.remove(schema);        // Unregister schema from registry
      registry._idmap.delete(key);    // Clean up stale key manually
      console.log(`User with ID ${id} removed`);
      return true;
    }
  }
  console.log(`User with ID ${id} not found`);
  return false;
}

// Function to Pop the First User
export function popFirstUser(): User | undefined {
  const firstKey = [...userRegistry._idmap.keys()][0];
  if (firstKey) {
    const schema = userRegistry._idmap.get(firstKey);
    if (schema) {
      const user = userRegistry.get(schema);
      userRegistry.remove(schema);
      console.log(`First User ${user?.name} removed from registry.`);
      return user;
    }
  }
  console.log("Registry is empty. No user to remove.");
  return undefined;
}

// Function to Pop the Last User
export function popLastUser(): User | undefined {
  const lastKey = [...userRegistry._idmap.keys()].at(-1);
  if (lastKey) {
    const schema = userRegistry._idmap.get(lastKey);
    if (schema) {
      const user = userRegistry.get(schema);
      userRegistry.remove(schema);
      console.log(`Last User ${user?.name} removed from registry.`);
      return user;
    }
  }
  console.log("Registry is empty. No user to remove.");
  return undefined;
}

// Function to Clear All Users from Registry
export function clearAllUsers(): void {
  userRegistry._idmap.clear();
  console.log("All users have been cleared from the registry.");
}
