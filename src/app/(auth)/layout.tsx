import { AppWrapper } from "@/components/global/app-wrapper";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppWrapper>{children}</AppWrapper>;
}
