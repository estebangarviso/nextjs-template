import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const SearchSchema = z.object({
  search: z.string().optional(),
});

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

let nextId = 1;
export const users = new Map<string, User>();

export function createUser(data: z.infer<typeof CreateUserSchema>): User {
  const id = String(nextId++);
  const user: User = { id, ...data, createdAt: new Date().toISOString() };
  users.set(id, user);
  return user;
}
