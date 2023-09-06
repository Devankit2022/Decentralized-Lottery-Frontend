import Head from "next/head"
import { Manrope } from "next/font/google"

import "@/styles/globals.css"

const manrope = Manrope({
    subsets: ["greek"],
    weight: ["200", "500", "700", "800"],
})

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="A Decentralized Lottery App" />
            </Head>
            <Component className={manrope.className} {...pageProps} />
        </>
    )
}
