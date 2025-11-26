export interface RegisterRequest {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    role: "Customer" | null;
}

export interface RegisterResponse {
    message: string;
}