import { useEffect, useState } from "react";
import { Box, Button, Text, Center } from "@chakra-ui/react";

type Props = {
  id: number;
  onFound: Function;
};

export default function GhostBox({ id, onFound }: Props) {
  const maxSupply = [9000, 3000, 500];
  const priceCrate = [15, 45, 250];

  const countMinted = 0;
  const crateName = ["Common", "Rare", "Epic"];
  const [cntMint, setCntMint] = useState(0);
  const [mpSrc, getMpSrc] = useState("");

  const getSrc = () => {
    let mvSrc = "/assets/crate";
    mvSrc = mvSrc.concat((id + 1).toString()).concat(".mp4");
    getMpSrc(mvSrc);
  };

  useEffect(() => {
    getSrc();
  });

  useEffect(() => {
    if (cntMint <= 0) setCntMint(0);
    else if (cntMint > 10) setCntMint(10);
    onFound({ boxId: id, cnt: cntMint });
  }, [cntMint, id, onFound]);

  return (
    <Box className="column-5 w-col w-col-4 w-col-tiny-tiny-stack">
      <Box className="div-block-3">
        <Box>
          <Box className="div-block">
            <h1 className="heading">
              {crateName[id]}
              <br />
              <span className="text-span">Founder's Crate</span>.
            </h1>
          </Box>
        </Box>
        <Box>
          <Box
            className="hero-image"
            as="video"
            src={mpSrc}
            autoPlay
            loop
            muted
          />
          <Text className="paragraph">
            {countMinted}/{maxSupply[id]}
          </Text>
        </Box>
        <Box className="div-block-2">
          <Box className="columns-6 w-row">
            <Box className="column-7 w-col w-col-4">
              <Button
                bg="#5b00da"
                borderRadius="20px"
                color="#ff0"
                fontSize="24px"
                p="initial"
                _hover={{
                  cursor: "pointer",
                  border: "1px",
                  borderStyle: "solid",
                  borderColor: "purple.700",
                  bgColor: "purple.300",
                }}
                onClick={(e) => {
                  setCntMint((prevCntMint) => prevCntMint - 1);
                }}
              >
                -
              </Button>
            </Box>
            <Box className="column-9 w-col w-col-4">
              <Center
                bg="#ff0066"
                color="#ffff00"
                w={12}
                fontFamily="'Changa One', Impact, sans-serif"
                fontSize={24}
                fontWeight={600}
                borderRadius={12}
                border="3px solid #5b00da"
              >
                {cntMint}
              </Center>
            </Box>
            <Box className="column-6 w-col w-col-4">
              <Button
                bg="#5b00da"
                borderRadius="20px"
                color="#ff0"
                fontSize="24px"
                p="initial"
                _hover={{
                  cursor: "pointer",
                  border: "1px",
                  borderStyle: "solid",
                  borderColor: "purple.700",
                  bgColor: "purple.300",
                }}
                onClick={(e) => {
                  setCntMint((prevCntMint) => prevCntMint + 1);
                }}
              >
                +
              </Button>
            </Box>
          </Box>
          <Text className="heading-6" lineHeight="44px" my="10px">
            {priceCrate[id] * cntMint} SOUL
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
