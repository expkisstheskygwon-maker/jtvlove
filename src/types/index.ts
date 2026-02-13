export interface User {
    id: number;
    email: string;
    name: string;
    role: 'super_admin' | 'partner_admin' | 'cca' | 'user';
}

export interface Partner {
    id: number;
    name: string;
    location: string;
    address?: string;
    rating: number;
    review_count: number; // mapped from reviews?
    reviews?: number; // legacy
    image_url: string; // mapped to image?
    image?: string; // legacy
    intro: string;
    description?: string;
    hours?: string;
    showup_times?: string;
    phone?: string;
    sns_kakao?: string;
    sns_telegram?: string;
    menu?: Menu[];
    gallery?: PartnerImage[];
    ccaList?: CCA[];
}

export interface Menu {
    id: number;
    name: string;
    price: string;
    description: string;
    category: string;
}

export interface PartnerImage {
    id: number;
    url: string;
    type: 'photo' | 'video';
    thumbnail_url?: string;
}

export interface CCA {
    id: number;
    partner_id: number;
    partner_name?: string; // joined
    name: string;
    age: number;
    height: number;
    likes: number;
    image_url: string;
    image?: string; // legacy
    status: 'online' | 'offline';
    intro?: string;
}

export interface Reservation {
    id: number;
    reservation_number: string;
    user_id: number;
    partner_id: number;
    cca_id?: number;
    reservation_date: string;
    reservation_time: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    message?: string;
}
