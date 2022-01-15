import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/user/List";
import { PagedCollection } from "../../types/Collection";
import { User } from "../../types/User";
import { fetch } from "../../utils/dataAccess";
import Head from "next/head";
import Layout from "../../components/common/Layout";

interface Props {
  collection: PagedCollection<User>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  collection,
}) => (
  <Layout>
      <div>
          <div>
              <Head>
                  <title>User List</title>
              </Head>
          </div>
          <List users={collection["hydra:member"]} />
      </div>
  </Layout>
);

Page.getInitialProps = async () => {
  const collection = await fetch("/users");

  return { collection };
};

export default Page;
