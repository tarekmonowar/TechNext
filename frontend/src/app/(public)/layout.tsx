// app/(public)/layout.tsx

import UserNavbar from "@/src/components/navbar/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNavbar />
      <main>{children}</main>
    </>
  );
}
