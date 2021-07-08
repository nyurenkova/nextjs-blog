import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar';
import { appWithTranslation } from 'next-i18next';
import { wrapper } from '../store/store';
import '../styles/global.css'

function App({ Component, pageProps }: AppProps) {
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
export default wrapper.withRedux(appWithTranslation(App));
