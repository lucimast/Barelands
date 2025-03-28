import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Barelands Photography",
  description: "A collection of my finest landscape photographs from around the world, each capturing a unique moment in time"
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 