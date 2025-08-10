"use client";

import { useState } from "react";

import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

export function LatestPost() {
	const [name, setName] = useState("");

	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const infiniteQuery = trpc.posts.getLatest.infiniteQueryOptions();

	const { data: latestPost } = useSuspenseQuery(
		trpc.posts.getLatest.queryOptions()
	);

	const createPost = useMutation(
		trpc.posts.create.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: trpc.posts.getLatest.queryKey(),
				});
				setName("");
			},
		})
	);

	return (
		<div className="w-full max-w-xs">
			{latestPost ? (
				<p className="truncate">Your most recent post: {latestPost.name}</p>
			) : (
				<p>You have no posts yet.</p>
			)}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					createPost.mutate({ name });
				}}
				className="flex flex-col gap-2"
			>
				<input
					type="text"
					placeholder="Title"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
				/>
				<button
					type="submit"
					className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
					disabled={createPost.isPending}
				>
					{createPost.isPending ? "Submitting..." : "Submit"}
				</button>
			</form>
		</div>
	);
}
