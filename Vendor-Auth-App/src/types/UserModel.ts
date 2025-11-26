export interface UserSchema {
    id: number;
    fullName: string;
    email: string;
    passwordHash: string;
    address: string;
    role: string;
    createdAt: string;
}