import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/tweet/Show";
import { Tweet } from "../../../types/Tweet";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";
import Layout from "../../../components/common/Layout";

interface Props {
  tweet: Tweet;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ tweet }) => {
  return (
    <Layout>
        <div>
            <div>
                <Head>
                    <title>{`Show Tweet ${tweet["@id"]}`}</title>
                </Head>
            </div>
            <Show tweet={tweet} />
        </div>
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const tweet = await fetch(asPath);

  return { tweet };
};

export default Page;
