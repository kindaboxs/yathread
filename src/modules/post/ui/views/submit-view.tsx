"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	createPostSchema,
	type CreatePostSchema,
} from "@/modules/post/schemas/create-post-schema";
import { useTRPC } from "@/trpc/client";

export const SubmitView = () => {
	const trpc = useTRPC();

	const form = useForm<CreatePostSchema>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: "",
			url: "",
			content: "",
		},
		mode: "all",
	});

	const mutationPostOptions = trpc.posts.create.mutationOptions({
		onSuccess: () => {
			form.reset();
			toast.success("Post created successfully");
		},
		onError: (error) => {
			toast.error("Failed to create story", {
				description: error.message,
			});
		},
	});
	const createPost = useMutation(mutationPostOptions);

	const onSubmitForm = (data: CreatePostSchema) => {
		createPost.mutate({
			title: data.title,
			url: data.url,
			content: data.content,
		});
	};

	return (
		<div className="w-full">
			<Card className="mx-auto mt-12 max-w-lg">
				<CardHeader>
					<CardTitle>Create New Post</CardTitle>
					<CardDescription>
						Leave url blank if you want to write a question for discussion. If
						there is no url, the content will appear at the top thread.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmitForm)}
							className="grid gap-6"
						>
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													type="text"
													disabled={createPost.isPending}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="url"
									render={({ field }) => (
										<FormItem>
											<FormLabel>URL</FormLabel>
											<FormControl>
												<Input
													type="url"
													disabled={createPost.isPending}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="content"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Content</FormLabel>
											<FormControl>
												<Textarea disabled={createPost.isPending} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={createPost.isPending || !form.formState.isValid}
							>
								{createPost.isPending ? (
									<>
										<Loader2Icon className="size-4 animate-spin" />
										Submitting...
									</>
								) : (
									"Submit"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
