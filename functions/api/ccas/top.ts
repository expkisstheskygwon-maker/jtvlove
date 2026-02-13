interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const { results } = await context.env.DB.prepare(
            `SELECT 
        c.*, p.name as partner_name 
       FROM ccas c
       LEFT JOIN partners p ON c.partner_id = p.id
       ORDER BY c.likes DESC LIMIT 10`
        ).all();
        return Response.json(results);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
};
