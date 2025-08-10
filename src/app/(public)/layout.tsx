import { AppWrapper } from "@/components/global/app-wrapper";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppWrapper>{children}</AppWrapper>;
}
