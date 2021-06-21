import Link from 'next/link'
import Head from 'next/head'
import Layout from "../../components/layout";

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>RAE-DEV First Page</title>
            </Head>
            <section>
                <h1>First Post</h1>
                <dl>
                    <dt>Next JS tutorial</dt>
                    <dd><Link href={'/'}>Back to Home</Link></dd>
                </dl>
            </section>
        </Layout>
    )
}