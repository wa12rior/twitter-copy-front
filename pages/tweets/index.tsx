import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/tweet/List";
import { PagedCollection } from "../../types/Collection";
import { Tweet } from "../../types/Tweet";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";
import Layout from "../../components/common/Layout";

interface Props {
  collection: PagedCollection<Tweet>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <Layout>
      <div>
          <div>
              <Head>
                  <title>Tweet List</title>
              </Head>
          </div>
          <List tweets={collection["hydra:member"]} />
      </div>
  </Layout>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/tweets");

  return { collection };
};

export default Page;
