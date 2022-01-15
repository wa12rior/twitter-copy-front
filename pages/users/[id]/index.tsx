import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/user/Show";
import { User } from "../../../types/User";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";
import Layout from "../../../components/common/Layout";

interface Props {
  user: User;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ user }) => {
  return (
    <Layout>
        <div>
            <div>
                <Head>
                    <title>{`Show User ${user["@id"]}`}</title>
                </Head>
            </div>
            <Show user={user} />
        </div>
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const user = await fetch(asPath);

  return { user };
};

export default Page;
