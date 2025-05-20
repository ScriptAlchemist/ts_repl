'use client';

import { useSyncExternalStore } from "react";
import { userRegistryStore } from "./hooks/useZodRegistry";
import { v4 as uuidv4 } from "uuid";

export default function UserRegistryPage() {
  const users = useSyncExternalStore(
    userRegistryStore.subscribe,
    userRegistryStore.getSnapshot,
    undefined
  );
  console.log(users);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>User Registry</h1>
      <div style={{ marginBottom: "1rem" }}>
       <button
        onClick={() => {
          userRegistryStore.addUser({
            id: uuidv4(),
            name: "New User",
          });
        }}
      >
        Add User
      </button>
      </div>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.id}){" "}
            <button onClick={() => userRegistryStore.removeUserById(u.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
