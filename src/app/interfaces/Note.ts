export type Note = {
  id: string,
  title: string,
  content: string,
}
export type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export type UpdateNote = Partial<CreateNote>;