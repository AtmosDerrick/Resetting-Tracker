import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full flex justify-start gap-x-4">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
