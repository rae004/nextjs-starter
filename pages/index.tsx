import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from "next";

import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from "../lib/posts";
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'


export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={ utilStyles.headingMd }>
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
            <section className={`${ utilStyles.headingMd } ${ utilStyles.padding1px }`}>
                <h2 className={ utilStyles.headingLg }>Blog</h2>
                <ul className={ utilStyles.list }>
                    { allPostsData.map(({ id, date, title }) => (
                        <li className={ utilStyles.listItem } key={ id }>
                            <Link href={`/posts/${id}`}>
                                <a>{ title }</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={ date } dateFormat={'LLLL d, yyyy'} />
                            </small>
                        </li>
                    )) }
                </ul>
            </section>
        </Layout>
    )
}
