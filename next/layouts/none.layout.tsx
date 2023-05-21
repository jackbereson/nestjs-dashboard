import { HeadSEO } from "./default-layout/components/head-seo";

export function NoneLayout({
  title = "DC8",
  ...props
}: {
  title?: string;
  children?: any;
}) {
  return (
    <>
      <HeadSEO />
      <div className="w-full min-h-screen">{props.children}</div>
    </>
  );
}
