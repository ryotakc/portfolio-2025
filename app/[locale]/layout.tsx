import LocaleLayoutComponent from "@/components/layouts/LocaleLayout";
import { languages } from "@/lib/i18n";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  await params; // Ensure params are consumed if necessary, though we don't use locale here explicitly anymore, it might be needed for static generation context.

  return <LocaleLayoutComponent>{children}</LocaleLayoutComponent>;
}
