import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/profilefollow/Form";
import Head from "next/head";
import Layout from "../../components/common/Layout";

const Page: NextComponentType<NextPageContext> = () => (
  <Layout>
      <div>
          <div>
              <Head>
                  <title>Create ProfileFollow </title>
              </Head>
          </div>
          <Form />
      </div>
  </Layout>
);

export default Page;
