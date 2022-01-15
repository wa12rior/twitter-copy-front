import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/profilefollow/List";
import { PagedCollection } from "../../types/Collection";
import { ProfileFollow } from "../../types/ProfileFollow";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";
import Layout from "../../components/common/Layout";

interface Props {
  collection: PagedCollection<ProfileFollow>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <Layout>
      <div>
          <div>
              <Head>
                  <title>ProfileFollow List</title>
              </Head>
          </div>
          <List profile_follows={collection["hydra:member"]} />
      </div>
  </Layout>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/profile_follows");

  return { collection };
};

export default Page;
