import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <script
            src="https://accounts.google.com/gsi/client"
            async
            defer
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="preview-modal"></div>
          <div id="loading-modal"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
