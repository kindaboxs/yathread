import { z } from "zod";

export const signInSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at most 20 characters"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(64, "Password must be at most 64 characters"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(20, "Name must be at most 20 characters"),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be at most 20 characters")
		.regex(/^[a-zA-Z0-9_]+$/, {
			message: "Username can only contain letters, numbers, and underscores",
		}),
	email: z.string().email({
		message: "Invalid email address",
	}),
	password: z
		.string()
		.min(8)
		.max(64)
		.regex(/[A-Z]/, {
			message: "Password must contain at least one uppercase letter",
		})
		.regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter",
		})
		.regex(/[0-9]/, {
			message: "Password must contain at least one number",
		})
		.regex(/[!@#$%^&*(),.?":{}|<>]/, {
			message: "Password must contain at least one special character",
		}),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
