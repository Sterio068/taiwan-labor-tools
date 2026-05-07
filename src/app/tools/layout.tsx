import { ToolAuthorityAuto } from "@/components/tools/ToolAuthorityAuto";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ToolAuthorityAuto />
    </>
  );
}
