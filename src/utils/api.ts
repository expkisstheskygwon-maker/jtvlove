export class ApiClient {
    private static baseUrl = '/api';

    static async getPartners() {
        const response = await fetch(`${this.baseUrl}/partners`);
        if (!response.ok) throw new Error('Failed to fetch partners');
        return response.json();
    }

    static async getPartnerDetail(id: string) {
        const response = await fetch(`${this.baseUrl}/partners/${id}`);
        if (!response.ok) throw new Error('Failed to fetch partner detail');
        return response.json();
    }

    static async getTopCCAs() {
        const response = await fetch(`${this.baseUrl}/ccas/top`);
        if (!response.ok) throw new Error('Failed to fetch top CCAs');
        return response.json();
    }

    static async getStats() {
        const response = await fetch(`${this.baseUrl}/stats`);
        if (!response.ok) return { totalUsers: 0, totalPartners: 0, totalReservations: 0 };
        return response.json();
    }
}
