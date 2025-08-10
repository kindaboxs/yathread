import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const postRouter = createTRPCRouter({
	hello: baseProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	create: baseProcedure
		.input(z.object({ name: z.string().min(1) }))
		.mutation(async ({ ctx, input }) => {
			const post = await ctx.db.post.create({
				data: {
					name: input.name,
				},
			});

			return post;
		}),

	getLatest: baseProcedure.query(async ({ ctx }) => {
		const post = await ctx.db.post.findMany({
			orderBy: { createdAt: "desc" },
		});

		return post[0] ?? null;
	}),
});
