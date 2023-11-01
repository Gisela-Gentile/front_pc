export type User = {
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    userId: number,
}
export type CreateUser = {
    password: string,    
} & Omit<User, "userId">;

