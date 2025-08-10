"use client";

import Link from "next/link";

import { MenuIcon } from "lucide-react";

import { UserButtonMobileHeader } from "@/components/global/site-header/user-button-header";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const navItemsLinks = [
	{ label: "Top", href: "/top" },
	{ label: "Hot", href: "/hot" },
	{ label: "Newest", href: "/newest" },
	{ label: "Submit", href: "/submit" },
];

export const NavigationDesktopHeader = () => {
	return (
		<nav className="hidden items-center space-x-2 md:flex">
			{navItemsLinks.map((item) => (
				<Button key={item.href} variant="ghost" size="sm" asChild>
					<Link href={item.href}>{item.label}</Link>
				</Button>
			))}
		</nav>
	);
};

export const NavigationMobileHeader = () => {
	return (
		<nav className="flex items-center space-x-2 md:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="size-8">
						<MenuIcon className="size-4" />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Navigation</SheetTitle>
						<SheetDescription>Choose what you want to see.</SheetDescription>
					</SheetHeader>
					<div className="flex flex-col space-y-4 px-4">
						{navItemsLinks.map((item) => (
							<SheetClose key={item.href} asChild>
								<Button
									variant="ghost"
									size="default"
									className="w-full"
									asChild
								>
									<Link href={item.href}>{item.label}</Link>
								</Button>
							</SheetClose>
						))}
					</div>
					<SheetFooter>
						<UserButtonMobileHeader />
						<SheetClose asChild>
							<Button variant="outline" size="sm">
								Close
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</nav>
	);
};
