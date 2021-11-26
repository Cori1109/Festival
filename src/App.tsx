import { ChakraProvider, Box, Flex, Text, Button } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./components/Identicon";
import theme from "./theme";
import GhostBox from "./components/GhostBox";
import "@fontsource/inter";
import { useState } from "react";

export default function App() {
  interface Ghost {
    boxId: number;
    cnt: number;
  }

  const SoulUnit = 300;
  const [ghostFes, setGhostFes] = useState([0, 0, 0]);
  const [totalMint, setTotalMint] = useState("");
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  const appendGhostBox = (newGhost: Ghost) => {
    ghostFes[newGhost.boxId] = newGhost.cnt;
    setGhostFes(ghostFes);
    let _total = 0;
    for (let i = 0; i < 3; i++) {
      _total += ghostFes[i];
    }
    const _totalstr = (_total * SoulUnit).toString().concat(" SOUL");
    setTotalMint(_totalstr);
    console.log(ghostFes);
  };

  const handlePurchase = () => {
    if (account) {
      return alert(ghostFes);
    } else return alert("Please connect your wallet!");
  };

  return (
    <ChakraProvider theme={theme}>
      <Box className="section wf-section">
        <Box className="container-5 w-container">
          <Box className="columns-4 w-row">
            <Box className="column-2 w-col w-col-4">
              <a
                className="button-4 w-button"
                href="https://www.ghostfestival.me/"
              >
                <img
                  className="homeImg"
                  width={24}
                  height={24}
                  src="/images/home.png"
                  alt="home"
                ></img>
                <p className="homeP">Home</p>
              </a>
            </Box>
            <Box className="w-col w-col-4 column-eth">
              {account && (
                <p className="walletText">
                  {etherBalance &&
                    parseFloat(formatEther(etherBalance)).toFixed(2)}{" "}
                  ETH
                </p>
              )}
            </Box>
            <Box className="column-3 w-col w-col-4">
              <Button
                className="column-eth"
                onClick={handleConnectWallet}
                color="#ff0"
                bgColor="#f06"
                borderRadius="10px"
                mr="20px"
                p="20px 15px"
                border="3px solid #5b00da"
                fontSize="20px"
                fontWeight={500}
                _hover={{
                  borderColor: "#40a",
                  color: "#cc0",
                }}
              >
                {account ? (
                  <Flex>
                    <Text mr="2">
                      {account &&
                        `${account.slice(0, 6)}...${account.slice(
                          account.length - 4,
                          account.length
                        )}`}
                    </Text>
                    <Identicon />
                  </Flex>
                ) : (
                  <p>Connect wallet</p>
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <header id="hero" className="hero wf-section">
        <div className="w-container">
          <div>
            <div className="w-row">
              <div className="w-col w-col-3"></div>
              <div className="column-11 w-col w-col-6">
                <a href="\#hero" className="button-8 w-button">
                  Mint
                </a>
                <a href="\#" className="button-8 guide w-button">
                  Info
                </a>
              </div>
              <div className="w-col w-col-3"></div>
            </div>
          </div>
        </div>
        <Box className="w-container">
          <Box className="columns-5 w-row" flexWrap="wrap">
            {Array.from(Array(3).keys()).map((index) => {
              return (
                <GhostBox key={index} onFound={appendGhostBox} id={index} />
              );
            })}
          </Box>
        </Box>
        <Box className="container-8 w-container">
          <Box className="columns-7 w-row">
            <Box className="column-10 w-col">
              <h1 className="heading-7">Total:</h1>
            </Box>
            <Box className="w-col">
              <h1 className="heading-6 total">{totalMint}</h1>
            </Box>
          </Box>
        </Box>
        <Box className="container-7 w-container">
          <button className="button-7 w-button" onClick={handlePurchase}>
            PURCHASE
          </button>
        </Box>
      </header>
    </ChakraProvider>
  );
}
