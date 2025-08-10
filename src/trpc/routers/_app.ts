import { createCallerFactory, createTRPCRouter } from "@/trpc/init";
import { postRouter } from "@/trpc/routers/posts";

export const appRouter = createTRPCRouter({
	posts: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
