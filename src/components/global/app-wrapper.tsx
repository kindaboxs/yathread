import { SiteHeader } from "@/components/global/site-header";

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="flex min-h-dvh flex-col">
				<SiteHeader />
				<main className="container grow p-4">{children}</main>
				<footer className="p-4 text-center">
					<p className="text-muted-foreground text-sm">
						&copy; {new Date().getFullYear()} ngefeed
					</p>
				</footer>
			</div>
		</>
	);
};
