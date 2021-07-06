import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import { withRouter, NextRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const postData = await getPostData(params?.id as string);

  return {
    props: {
      ...locale && (await serverSideTranslations(locale, ['common'])),
      postData
    }
  }
};

function Post({ postData, router }: {
  postData: {
    title: string
    date: string
    contentHtml: string
  },
  router: NextRouter,
}) {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h1 className={utilStyles.headingXl}>{router.query.id}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <h3>There wasn't {t('error-with-status', {statusCode: 404})}</h3>
        <h3>{t('title')}</h3>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
export default withRouter(Post);
