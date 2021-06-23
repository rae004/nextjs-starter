import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head title={'Our Home Page'}>
                    <link rel={'canonical'} href={'https://nextjs-starter-ivory-ten.vercel.app/'}/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument