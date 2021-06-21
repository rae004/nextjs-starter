import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hi! I'm Robert. Welcome to my NextJS site. I'm a software developer who likes to play around with
                    Javascript libraries.
                </p>
                <p>
                    If you see anything cool or just think it's totally lame, drop me a line at the email below.
                </p>
                <code>rae004dev@gmail.com</code>
                <p>
                    (This is a sample website - if you wanna build one like it... check out{' '}
                    <a href="https://nextjs.org/learn">this Next.js tutorial</a>.)
                </p>
            </section>
        </Layout>
    )
}
