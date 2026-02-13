interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const { id } = context.params;
    const db = context.env.DB;

    try {
        // 1. Get Partner Info
        const partner = await db.prepare(
            "SELECT * FROM partners WHERE id = ?"
        ).bind(id).first();

        if (!partner) {
            return new Response("Partner not found", { status: 404 });
        }

        // 2. Get Partner Menu
        const { results: menus } = await db.prepare(
            "SELECT * FROM partner_menus WHERE partner_id = ?"
        ).bind(id).all();

        // 3. Get Partner Gallery (images)
        const { results: gallery } = await db.prepare(
            "SELECT * FROM partner_images WHERE partner_id = ?"
        ).bind(id).all();

        // 4. Get CCAs
        const { results: ccas } = await db.prepare(
            "SELECT * FROM ccas WHERE partner_id = ?"
        ).bind(id).all();

        // 5. Get Reviews (top 5)
        // Note: In real app we might join users table to get real user names, or store author_name in reviews
        const { results: reviews } = await db.prepare(
            `SELECT r.*, u.name as user_name 
       FROM reviews r 
       LEFT JOIN users u ON r.user_id = u.id 
       WHERE r.partner_id = ? 
       ORDER BY r.created_at DESC LIMIT 5`
        ).bind(id).all();

        // Format response
        return Response.json({
            ...partner,
            menu: menus,
            gallery: gallery,
            ccaList: ccas,
            reviews: reviews.map((r: any) => ({
                ...r,
                user: r.user_name || 'Anonymous' // Map user_name to user field expected by frontend
            }))
        });

    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
};
