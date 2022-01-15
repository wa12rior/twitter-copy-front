import { NextComponentType, NextPageContext } from "next";
import { Show } from "../../../components/profilefollow/Show";
import { ProfileFollow } from "../../../types/ProfileFollow";
import { fetch } from "../../../utils/dataAccess";
import Head from "next/head";
import Layout from "../../../components/common/Layout";

interface Props {
  profilefollow: ProfileFollow;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
  profilefollow,
}) => {
  return (
    <Layout>
        <div>
            <div>
                <Head>
                    <title>{`Show ProfileFollow ${profilefollow["@id"]}`}</title>
                </Head>
            </div>
            <Show profilefollow={profilefollow} />
        </div>
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const profilefollow = await fetch(asPath);

  return { profilefollow };
};

export default Page;
