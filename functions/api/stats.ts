interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const db = context.env.DB;

        // Run queries in parallel for performance
        const [userCount, partnerCount, reservationCount] = await Promise.all([
            db.prepare("SELECT count(*) as count FROM users").first('count'),
            db.prepare("SELECT count(*) as count FROM partners").first('count'),
            db.prepare("SELECT count(*) as count FROM reservations").first('count')
        ]);

        return Response.json({
            totalUsers: userCount,
            totalPartners: partnerCount,
            totalReservations: reservationCount
        });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
};
