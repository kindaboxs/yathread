"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SheetClose } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/client";
import { type Session } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

const AvatarUser = ({
	user,
	className,
}: {
	user: Session["user"];
	className?: string;
}) => {
	if (!user.image) {
		return (
			<Avatar className={cn(className)}>
				<AvatarFallback className={cn("text-primary uppercase", className)}>
					{user.username?.charAt(0)}
				</AvatarFallback>
			</Avatar>
		);
	}

	return (
		<Avatar className={cn(className)}>
			<AvatarImage src={user.image} alt={user.username ?? ""} />
			<AvatarFallback className={cn("text-primary uppercase", className)}>
				{user.username?.charAt(0)}
			</AvatarFallback>
		</Avatar>
	);
};

export const UserButtonDesktopHeader = () => {
	const { data: session, isPending } = authClient.useSession();

	const router = useRouter();

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success("Signed out successfully");
					router.push("/");
				},
				onError: (ctx) => {
					toast.error("Failed to sign out", {
						description: ctx.error.message,
					});
				},
			},
		});
	};

	if (isPending) {
		return (
			<div className="hidden md:flex">
				<Skeleton className="size-8 rounded-full" />
			</div>
		);
	}

	return (
		<div className="hidden md:flex">
			{session ? (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="size-8 rounded-full"
							>
								<AvatarUser user={session.user} />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent side="bottom" align="end" sideOffset={16}>
							<DropdownMenuLabel>
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<AvatarUser user={session.user} className="rounded-lg" />

									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">
											{session.user.username}
										</span>
										<span className="truncate text-xs">
											{session.user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem className="cursor-pointer" onClick={signOut}>
								<LogOutIcon />
								Sign Out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			) : (
				<Button size="sm" asChild>
					<Link href="/sign-in">Sign In</Link>
				</Button>
			)}
		</div>
	);
};

export const UserButtonMobileHeader = () => {
	const { data: session, isPending } = authClient.useSession();

	const router = useRouter();

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success("Signed out successfully");
					router.push("/");
				},
				onError: (ctx) => {
					toast.error("Failed to sign out", {
						description: ctx.error.message,
					});
				},
			},
		});
	};

	if (isPending) {
		return <Skeleton className="h-8 w-full rounded-md" />;
	}

	return (
		<>
			{!session ? (
				<SheetClose asChild>
					<Button size="sm" className="w-full" asChild>
						<Link href="/sign-in">Sign In</Link>
					</Button>
				</SheetClose>
			) : (
				<div className="flex items-center gap-2">
					<AvatarUser user={session.user} className="rounded-md" />

					<SheetClose asChild className="flex-1">
						<Button size="sm" className="w-full" onClick={signOut}>
							<LogOutIcon className="size-4" />
							Sign Out
						</Button>
					</SheetClose>
				</div>
			)}
		</>
	);
};
