import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./components/Identicon";
import theme from "./theme";
import GhostBox from "./components/GhostBox";
import "@fontsource/inter";
import { useState } from "react";

export default function App() {
  interface Ghost {
    BoxId: number;
    cnt: number;
  }

  const [ghostFes, setGhostFes] = useState([0, 0, 0]);
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const isMobile = window.screen.width <= window.screen.height ? true : false;

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  const appendGhostBox = (newGhost: Ghost) => {
    let _ghostFes = [0, 0, 0];
    if (newGhost.BoxId === 1) _ghostFes[0] = newGhost.cnt;
    else if (newGhost.BoxId === 2) _ghostFes[1] = newGhost.cnt;
    else if (newGhost.BoxId === 3) _ghostFes[2] = newGhost.cnt;
    console.log(_ghostFes);
    setGhostFes(_ghostFes);
  };

  const handlePurchase = () => {
    if (account) {
      console.log("GhostFestival", ghostFes);
    } else alert("Please connect your wallet!");
  };

  return (
    <ChakraProvider theme={theme}>
      <Box className="section wf-section">
        <Box className="container-5 w-container">
          <Box className="columns-4 w-row">
            <Box className="column-2 w-col w-col-5">
              <a
                className="button-4 w-button"
                href="https://www.ghostfestival.me/"
              >
                {isMobile ? (
                  <Image
                    src="/images/home2.png"
                    w="24px"
                    h="24px"
                    pos="absolute"
                    top="6px"
                    left="36px"
                  />
                ) : (
                  <p>Back to home</p>
                )}
              </a>
            </Box>
            <Box className="w-col w-col-3">
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
                onClick={handleConnectWallet}
                color="#ff0"
                bgColor="#f06"
                borderRadius="10px"
                mr="20px"
                p="20px 15px"
                border="3px solid #5b00da"
                fontFamily="'Changa One', Impact, sans-serif"
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
        <Box className="w-container">
          <Box className="columns-5 w-row" flexWrap="wrap">
            {Array.from(Array(3).keys()).map((index) => {
              return (
                <GhostBox key={index} onFound={appendGhostBox} id={index} />
              );
            })}
          </Box>
        </Box>
        <Box className="container-7 w-container">
          <Button
            onClick={handlePurchase}
            color="#ff0"
            bgColor="#f06"
            border="3px solid #5b00da"
            borderRadius="10px"
            fontFamily="'Changa One', Impact, sans-serif"
            fontSize="28px"
            fontWeight="500"
            p="28px"
            _hover={{
              borderColor: "#40a",
              color: "#cc0",
            }}
          >
            PURCHASE
          </Button>
        </Box>
      </header>
    </ChakraProvider>
  );
}
