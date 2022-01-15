import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../../components/profilefollow/Form";
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
                    <title>
                        {profilefollow && `Edit ProfileFollow ${profilefollow["@id"]}`}
                    </title>
                </Head>
            </div>
            <Form profilefollow={profilefollow} />
        </div>
    </Layout>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const profilefollow = await fetch(asPath.replace("/edit", ""));

  return { profilefollow };
};

export default Page;
