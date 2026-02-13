interface Env {
    DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    try {
        const { results } = await context.env.DB.prepare(
            `SELECT 
        id, name, location, rating, review_count, image_url, intro
       FROM partners 
       ORDER BY is_recommended DESC, rating DESC`
        ).all();
        return Response.json(results);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
};
