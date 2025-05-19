// src/typeRegistry.ts

import z from "zod/v4";

export const $Post = z.object({
  title: z.string(),
  content: z.string(),
});

export type Post = z.infer<typeof $Post>;

export const $User = z.object({
  id: z.uuid(),
  name: z.string(),
  posts: z.array($Post),
});
export type User = z.infer<typeof $User>;

export const userRegistry = z.registry<User>();
console.log('User Registry setup');

// Function to get metadata by schema reference
export function getMetaBySchema(schema: typeof $User) {
  return userRegistry.get(schema);
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

