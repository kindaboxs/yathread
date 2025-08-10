import { AppWrapper } from "@/components/global/app-wrapper";

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppWrapper>{children}</AppWrapper>;
}
