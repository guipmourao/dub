import { MaxWidthWrapper } from "@dub/ui";
import { cn } from "@dub/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
const AppLayout = dynamic(() => import("@/components/layout/app"), {
  ssr: false,
});

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { slug } = router.query as {
    slug?: string;
  };

  const tabs = [
    {
      name: "General",
      href: slug ? `/${slug}/settings` : "/settings",
    },
    ...(slug
      ? [
          {
            name: "Billing",
            href: `/${slug}/settings/billing`,
          },
          {
            name: "People",
            href: `/${slug}/settings/people`,
          },
          {
            name: "Security",
            href: `/${slug}/settings/security`,
          },
        ]
      : [
          // {
          //   name: "API Keys",
          //   href: "/settings/tokens",
          // },
        ]),
  ];

  return (
    <AppLayout bgWhite>
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-600">Settings</h1>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="grid items-start gap-5 py-10 md:grid-cols-5">
        <div className="sticky top-36 flex gap-1 md:grid">
          {tabs.map(({ name, href }) => (
            <Link
              href={href}
              key={href}
              className={cn(
                "rounded-md p-2.5 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200",
                {
                  "font-semibold text-black": router.asPath === href,
                },
              )}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="grid gap-5 md:col-span-4">{children}</div>
      </MaxWidthWrapper>
    </AppLayout>
  );
}
