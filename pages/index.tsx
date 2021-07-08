import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
// @ts-ignore
import { RootState } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { wrapper } from '../store/store';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { fetchPosts } from '../store/feature/post/post';

export const getStaticProps  = wrapper.getStaticProps(store =>
  async () => {
    const allPostsData = getSortedPostsData();
    // @ts-ignore
    await store.dispatch(fetchPosts());
    return { props: { allPostsData } };
  }
);

function Home({ allPostsData, fetchposts, posts }: {
    allPostsData: {
        date: string
        title: string
        id: string
    }[],
  fetchposts: () => void,
  posts: any[],
}) {

  useEffect(() => {
    if (posts && posts.length < 1) {
      fetchposts();
    }
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
          <Link href={`/posts/first-post`}>
              <a>First post</a>
          </Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData && allPostsData.length > 0 && allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={{
                pathname: '/posts/[slug]',
                query: { slug: encodeURIComponent(id) },
              }}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

const mapStateToProps = (state: RootState) => ({
  posts: state?.postSliceReducer?.posts,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  // @ts-ignore
  fetchposts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
