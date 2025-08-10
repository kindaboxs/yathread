"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { authClient } from "@/lib/auth/client";
import { signInSchema, type SignInSchema } from "@/modules/auth/schemas";

export const SignInView = () => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			username: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmit = async (data: SignInSchema) => {
		startTransition(async () => {
			await authClient.signIn.username({
				username: data.username,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						form.reset();
						toast.success("You are now signed in, redirecting...");
						router.push("/");
					},
					onError: (ctx) => {
						toast.error("Oops, your account could not be found.", {
							description: ctx.error.message,
						});
					},
				},
			});
		});
	};

	return (
		<div className="w-full">
			<Card className="mx-auto mt-12 max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold">Sign In</CardTitle>
					<CardDescription>
						Enter your account details below to sign in.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													placeholder="yourusername"
													type="text"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													placeholder="password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={isPending || !form.formState.isValid}
							>
								{isPending ? (
									<>
										<Loader2Icon className="size-4 animate-spin" />
										Signing In
									</>
								) : (
									"Sign In"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
