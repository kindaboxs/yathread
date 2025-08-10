import { z } from "zod";

export const createPostSchema = z
	.object({
		title: z
			.string()
			.min(3, "Title must be at least 3 characters")
			.max(50, "Title must be at most 50 characters"),
		url: z
			.string()
			.url("Please enter a valid URL")
			.optional()
			.or(z.literal("")),
		content: z
			.string()
			.max(1000, "Content must be at most 1000 characters")
			.optional(),
	})
	.refine((data) => data.url || data.content, {
		message: "Please enter either a URL or content",
		path: ["content", "url"],
	});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
