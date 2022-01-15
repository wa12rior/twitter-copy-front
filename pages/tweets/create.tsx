import { NextComponentType, NextPageContext } from "next";
import { Form } from "../../components/tweet/Form";
import Head from "next/head";
import Layout from "../../components/common/Layout";

const Page: NextComponentType<NextPageContext> = () => (
  <Layout>
      <div>
          <div>
              <Head>
                  <title>Create Tweet </title>
              </Head>
          </div>
          <Form />
      </div>
  </Layout>
);

export default Page;
