export interface RegisterRequest {
    userId: number;
    businessName: string;
    contactName: string;
    businessPhone: string;
    businessEmail: string;
    businessAddress: string;
    serviceArea: string;
    serviceType: string;
    description: string;
    website: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    ratingAverage: number;
    reviewCount: number;
}

export interface RegisterResponse extends RegisterRequest {
    id: number;
}