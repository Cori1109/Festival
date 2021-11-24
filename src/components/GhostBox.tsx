import { useEffect, useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text, Center, Circle } from "@chakra-ui/react";

type Props = {
  id: number;
  onFound: Function;
};

export default function GhostBox({ id, onFound }: Props) {
  const countMinted = 38;
  const CnSoul = 300;
  const BoxNum = ["One", "Two", "Three"];
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
  }, [cntMint]);

  return (
    <Box className="column-5 w-col w-col-4 w-col-tiny-tiny-stack">
      <Box className="div-block-3">
        <Box
          mt="26px"
          color="#0f9"
          fontFamily="'Changa One', Impact, sans-serif"
          fontSize="54px"
          fontWeight={400}
          textShadow="5px 5px #5b00da"
          lineHeight="1em"
          mb="10px"
          pl="26px"
        >
          Box type
          <Flex>
            <Text color="#ff0066">{BoxNum[id]}</Text>
            <Text>.</Text>
          </Flex>
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
          <Text className="paragraph">{countMinted}/5000</Text>
        </Box>
        <Box className="div-block-2">
          <Box className="columns-6 w-row">
            <Box className="column-7 w-col w-col-4">
              <Circle
                size={9}
                bg="#5b00da"
                color="#ffff00"
                _hover={{
                  border: "1px",
                  borderStyle: "solid",
                  borderColor: "purple.700",
                  bgColor: "purple.300",
                }}
                onClick={(e) => {
                  setCntMint((prevCntMint) => prevCntMint - 1);
                }}
              >
                <MinusIcon w={2} h={2} />
              </Circle>
            </Box>
            <Box className="column-9 w-col w-col-4">
              <Center
                bg="#ff0066"
                color="#ffff00"
                w={12}
                fontSize={18}
                fontWeight={600}
                borderRadius={12}
                border="3px solid #5b00da"
                p={1}
              >
                {cntMint}
              </Center>
            </Box>
            <Box className="column-6 w-col w-col-4">
              <Circle
                size={9}
                bg="#5b00da"
                color="#ffff00"
                _hover={{
                  border: "1px",
                  borderStyle: "solid",
                  borderColor: "purple.700",
                  bgColor: "purple.300",
                }}
                onClick={(e) => {
                  setCntMint((prevCntMint) => prevCntMint + 1);
                }}
              >
                <AddIcon w={2} h={2} />
              </Circle>
            </Box>
          </Box>
          <Text className="heading-6" lineHeight="44px" my="10px">
            {CnSoul} SOUL
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
