import { createPostSchema } from "@/modules/post/schemas/create-post-schema";
import { createTRPCRouter, privateProcedure } from "@/trpc/init";

export const postRouter = createTRPCRouter({
	create: privateProcedure
		.input(createPostSchema)
		.mutation(async ({ ctx, input }) => {
			const { title, url, content } = input;

			return await ctx.db.post.create({
				data: {
					title,
					url,
					content,
					userId: ctx.auth.user.id,
				},
			});
		}),
});
