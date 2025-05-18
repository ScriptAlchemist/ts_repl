import { z } from "zod/v4";

const schema = z.object({
  name: z.string(),
});

console.log(schema.safeParse({ name: true }));
console.log("Started Running TS");

type User = {
  name: string,
};

interface UserTwo {
  name: string;
};

type Users = User | UserTwo;

console.log('Fuck it');

