import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div
          id="loader"
          className="h-screen w-full fixed bg-teal-600 z-50 flex justify-center items-center"
        >
          <h1 className="text-5xl text-white font-bold uppercase">
            Taka Earth
          </h1>
        </div>
        <Main />
        <NextScript />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js"></script>
      </body>
    </Html>
  );
}
