interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const { results } = await context.env.DB.prepare(
            "SELECT count(*) as count FROM users"
        ).all();
        return Response.json({ success: true, userCount: results[0].count });
    } catch (e: any) {
        return Response.json({ success: false, error: e.message }, { status: 500 });
    }
};
