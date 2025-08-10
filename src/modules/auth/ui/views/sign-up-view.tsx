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
import { signUpSchema, type SignUpSchema } from "@/modules/auth/schemas";

export const SignUpView = () => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
		mode: "all",
	});

	const onSubmit = async (data: SignUpSchema) => {
		startTransition(async () => {
			await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
				username: data.username,
				fetchOptions: {
					onSuccess: () => {
						form.reset();
						toast.success("Account created successfully, please sign in.");
						router.push("/sign-in");
					},
					onError: (ctx) => {
						toast.error("Oops, your account could not be created.", {
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
					<CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
					<CardDescription>
						Enter your details to create an account.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder="Your name" type="text" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

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
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="youremail@domain.com"
													type="email"
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
										Signing Up
									</>
								) : (
									"Sign Up"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
