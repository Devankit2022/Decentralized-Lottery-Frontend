import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material"
import { Close } from "@mui/icons-material"
import { useState } from "react"

const InfoMessage = () => {
    const [open, setOpen] = useState(true)

    return (
        <Collapse in={open}>
            <Alert
                severity="info"
                className="w-5/6 my-3 mx-auto"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => setOpen(false)}
                    >
                        <Close fontSize="inherit" className="fill-slate-950" />
                    </IconButton>
                }
            >
                <AlertTitle className="font-extrabold">Info</AlertTitle>
                It is advised to disconnect the wallet before closing the window due to some issues
                with web3 wallets, particularly Metamask. This is solely for improved user
                experience and not due to any security concerns. —{" "}
                <strong>Disconnect your wallet !!</strong>
            </Alert>
        </Collapse>
    )
}

export default InfoMessage
