import Head from 'next/head'
import Layout from '../../components/layout'
import { NextPageContext } from "next";

interface FirstPostInterface {
  title: string;
}
export default function FirstPost({ title }: FirstPostInterface) {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>{title}</h1>
      <img src="/images/profile.jpg" alt="Your Name" />
      <h1>The value of customKey is: {process.env.customKey}</h1>
      <button type="button" onClick={() => {
        throw new Error("Sentry Frontend Error");
      }}>
        Throw error
      </button>
      <style jsx>{`
        h1 {
          color: red;
        }
     
      `}</style>
    </Layout>
  )
}

FirstPost.getInitialProps = async ({ req }: NextPageContext) => {
  const title = 'My first ssr post';

  if (!req) {
    return {
      title: 'My first post',
    }
  }

  return {
    title,
  }
};
