import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en' className="light">
        <Head />
        <body className='bg-seconds-light dark:bg-black'>
        {/* className='bg-seconds-light dark:bg-black' */}
          <Main />
          <NextScript />
          <div id="dialog-root" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
