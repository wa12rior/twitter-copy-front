import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/tweet/Form";
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
                    <title>{tweet && `Edit Tweet ${tweet["@id"]}`}</title>
                </Head>
            </div>
            <Form tweet={tweet} />
        </div>
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const tweet = await fetch(asPath.replace("/edit", ""));

  return { tweet };
};

export default Page;
