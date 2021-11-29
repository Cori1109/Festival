import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./theme";
import GhostBox from "./components/GhostBox";
import "@fontsource/inter";
import { useState } from "react";

export default function App() {
  interface Ghost {
    boxId: number;
    cnt: number;
  }

  const priceCrate = [15, 45, 250];
  const [ghostFes, setGhostFes] = useState([0, 0, 0]);
  const [totalMint, setTotalMint] = useState("");

  const appendGhostBox = (newGhost: Ghost) => {
    ghostFes[newGhost.boxId] = newGhost.cnt;
    setGhostFes(ghostFes);
    let _total = 0;
    for (let i = 0; i < 3; i++) {
      _total += ghostFes[i] * priceCrate[i];
    }
    const _totalstr = _total.toString().concat(" SOUL");
    setTotalMint(_totalstr);
    localStorage.setItem("GhostFestival", JSON.stringify(ghostFes));
  };

  return (
    <ChakraProvider theme={theme}>
      <div className="w-container">
        <div>
          <div className="w-row">
            <div className="w-col w-col-3"></div>
            <div className="column-11 w-col w-col-6">
              <a href="\#hero" className="button-8 w-button">
                Mint
              </a>
              <a
                href="https://www.ghostfestival.me/info"
                className="button-8 guide w-button"
              >
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
            return <GhostBox key={index} onFound={appendGhostBox} id={index} />;
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
    </ChakraProvider>
  );
}
