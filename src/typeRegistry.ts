// src/typeRegistry.ts

import z from "zod/v4";
import { $ZodRegistry } from "zod/v4/core";

export const $User = z.object({
  id: z.uuid(),
  name: z.string(),
  posts: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ),
});

export type User = z.infer<typeof $User>;

export const userRegistry = z.registry<User>();
console.log('User Registry setup');

// Function to Add User to Registry
export function addUserToRegistry(user: User): void {
  $User.clone().register(userRegistry, user);
  console.log(`User ${user.name} added to registry.`);
}

// Function to get metadata by ID or any other field
export function getMetaByField<T>(field: keyof typeof userRegistry._meta, value: unknown) {
  for (const schema of userRegistry._idmap.values()) {
    const meta = userRegistry.get(schema);
    if (meta && meta[field] === value) {
      return meta as T;
    }
  }
  return undefined;
}

export function removeById(registry: $ZodRegistry, id: string) {
  for (const schema of registry._idmap.values()) {
    const meta = registry.get(schema);
    if (meta && meta.id === id) {
      registry.remove(schema);
      console.log(`Schema with ID ${id} removed`);
      return true;
    }
  }
  console.log(`Schema with ID ${id} not found`);
  return false;
}
