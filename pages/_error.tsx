import { NextApiRequest, NextApiResponse } from 'next'

function Error({ statusCode }: { statusCode: string }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }: {
  res: NextApiRequest, err: NextApiResponse,
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode }
};

export default Error
