import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="DGDtKvpzOB-xK2jnGnVjjFG6kmUApXCPu3ZK26GoQh8" />
        <link rel="icon" href="/images/logocanavaro.webp" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap"
          rel="stylesheet"
        />
        <script type="text/javascript">const tlJsHost = {((window.location.protocol === "https:") ? "https://secure.trust-provider.com/" : "http://www.trustlogo.com/")}
          document.write(unescape(<script src='" + tlJsHost + "trustlogo/javascript/trustlogo.js' type='text/javascript' ></script>))
        </script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
