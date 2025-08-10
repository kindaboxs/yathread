import Link from "next/link";

import { ModeToggleHeader } from "@/components/global/site-header/mode-toggle-header";
import {
	NavigationDesktopHeader,
	NavigationMobileHeader,
} from "@/components/global/site-header/navigation-header";
import { UserButtonDesktopHeader } from "@/components/global/site-header/user-button-header";

export const SiteHeader = () => {
	return (
		<header className="bg-background/85 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 h-16 w-full border-b backdrop-blur">
			<div className="container flex h-full items-center justify-between p-4">
				<Link href="/" className="text-2xl font-bold">
					yathread
				</Link>

				<div className="flex items-center space-x-4">
					<NavigationDesktopHeader />
					<NavigationMobileHeader />
					<UserButtonDesktopHeader />
					<ModeToggleHeader />
				</div>
			</div>
		</header>
	);
};
