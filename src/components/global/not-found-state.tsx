import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { AppWrapper } from "@/components/global/app-wrapper";
import { Button } from "@/components/ui/button";

export const NotFoundState = () => {
	return (
		<AppWrapper>
			<div className="flex size-full items-center justify-center p-2">
				<div className="flex flex-col items-center gap-4">
					<h1 className="text-4xl font-bold">404</h1>
					<p className="text-muted-foreground text-lg">Page not found</p>
					<Button asChild>
						<Link href="/">
							<ArrowLeftIcon className="size-4" />
							Go Home
						</Link>
					</Button>
				</div>
			</div>
		</AppWrapper>
	);
};
