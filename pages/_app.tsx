import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar';
import '../styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNprogress
        color="yellow"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Component {...pageProps} />
      <style jsx global>{`
        body {
          font-family: 'Roboto', sans-serif;
        }
      `}</style>
    </>
  );
}

