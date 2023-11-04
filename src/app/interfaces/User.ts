export type User = {
    email: string,
    username: string,
    userId: number,
    firstName?: string,
    lastName?: string,
    dateRegistration?:string,
}
export type CreateUser = {
    password: string,    
} & Omit<User, "userId">;

