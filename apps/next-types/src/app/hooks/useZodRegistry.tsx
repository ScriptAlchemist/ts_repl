// src/store/userRegistryStore.ts
import { z } from "zod/v4";
import { $ZodRegistry } from "zod/v4/core";

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

type Listener = () => void;

const listeners = new Set<Listener>();

export const userRegistry: $ZodRegistry<User> = z.registry<User>();

let cachedSnapshot: User[] = [];

function updateCache() {
  cachedSnapshot = [];
  for (const schema of userRegistry._idmap.values()) {
    const user = userRegistry.get(schema);
    if (user) cachedSnapshot.push(user);
  }
}

function notifyListeners() {
  updateCache();
  listeners.forEach((listener) => listener());
}

export const userRegistryStore = {
  getSnapshot: (): User[] => cachedSnapshot,
  subscribe: (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },
  addUser(user: User) {
    $User.clone().register(userRegistry, user);
    notifyListeners();
  },
  removeUserById(id: string) {
    for (const [key, schema] of userRegistry._idmap.entries()) {
      const meta = userRegistry.get(schema);
      if (meta && meta.id === id) {
        userRegistry.remove(schema);        // Unregister schema from registry
        userRegistry._idmap.delete(key);    // Clean up stale key manually
        notifyListeners();
        console.log(`User with ID ${id} removed`);
        return true;
      }
    }
    console.log(`User with ID ${id} not found`);
    return false;
  },
  clear() {
    userRegistry._idmap.clear();
    notifyListeners();
  }
};
