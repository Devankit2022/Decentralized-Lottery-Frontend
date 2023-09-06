import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core"
import { BiBell } from "react-icons/bi"

import { abi, contractAddresses } from "@/constants"

const LotteryEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const dispatch = useNotification()

    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromContract = (
            await getEntranceFee({
                onError: (error) => console.error(error),
            })
        ).toString()

        const numPlayersFromContract = (
            await getNumberOfPlayers({
                onError: (error) => console.error(error),
            })
        ).toString()

        const recentWinnerFromContract = await getRecentWinner({
            onError: (error) => console.error(error),
        })

        setEntranceFee(entranceFeeFromContract)
        setNumPlayers(numPlayersFromContract)
        setRecentWinner(recentWinnerFromContract)
    }

    useEffect(() => {
        if (isWeb3Enabled) updateUI()
    }, [isWeb3Enabled])

    useEffect(() => {
        if (raffleAddress && isWeb3Enabled) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(raffleAddress, abi, provider)
            contract.on("WinnerPicked", () => {
                updateUI()
            })
        }
    }, [raffleAddress, isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification",
            position: "topR",
            icon: <BiBell />,
        })
    }

    return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess,
                                onError: (error) => console.error(error),
                            })
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    <div>Entrance fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                    <div>Number Of Players: {numPlayers}</div>
                    <div>Recent Winner: {recentWinner}</div>
                </div>
            ) : (
                <div>
                    Please connect to <strong>sepolia</strong> chain.
                </div>
            )}
        </div>
    )
}

export default LotteryEntrance
