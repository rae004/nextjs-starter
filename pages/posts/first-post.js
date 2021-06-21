import Link from 'next/link'

export default function FirstPost() {
    return (
        <section>
            <h1>First Post</h1>
            <dl>
                <dt>Next JS tutorial</dt>
                <dd><Link href={'/'}>Back to Home</Link></dd>
            </dl>
        </section>
    )
}