import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-legal-50">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
