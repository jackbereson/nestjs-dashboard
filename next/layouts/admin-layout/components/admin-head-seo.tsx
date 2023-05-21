import Head from "next/head";

export const AdminHeadSEO = (props: any) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};
