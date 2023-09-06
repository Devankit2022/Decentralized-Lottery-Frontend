import { MoralisProvider } from "react-moralis"
import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import { NotificationProvider } from "@web3uikit/core"
import { useEffect } from "react"

import { Header, InfoMessage, LotteryEntrance, ManualHeader } from "@/components"
import { theme } from "@/utils"

export default function Home() {
    useEffect(() => {
        if (window?.sessionStorage.getItem("register") === null) {
            window?.localStorage.clear()
        }
        window?.sessionStorage.setItem("register", 1)
    }, [])

    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <InfoMessage />
                        <Header />
                        <LotteryEntrance />
                        {/* <ManualHeader /> */}
                    </ThemeProvider>
                </StyledEngineProvider>
            </NotificationProvider>
        </MoralisProvider>
    )
}
