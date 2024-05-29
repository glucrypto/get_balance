import EthDater from "ethereum-block-by-date";
import { clientToProvider } from "./clientToProvider";

export const getBlocks = async (year, provider) => {
  const dater = new EthDater(clientToProvider(provider));

  //let block = await dater.getDate(timestamp);
  let block0 = await dater.getDate("2022-12-31T00:00:00.000Z");
  let block1 = await dater.getDate("2023-01-31T00:00:00.000Z");
  let block2 = await dater.getDate("2023-02-28T00:00:00.000Z");
  let block3 = await dater.getDate("2023-03-31T00:00:00.000Z");
  let block4 = await dater.getDate("2023-04-30T00:00:00.000Z");
  let block5 = await dater.getDate("2023-05-31T00:00:00.000Z");
  let block6 = await dater.getDate("2023-06-30T00:00:00.000Z");
  let block7 = await dater.getDate("2023-07-31T00:00:00.000Z");
  let block8 = await dater.getDate("2023-08-31T00:00:00.000Z");
  let block9 = await dater.getDate("2023-09-30T00:00:00.000Z");
  let block10 = await dater.getDate("2023-10-31T00:00:00.000Z");
  let block11 = await dater.getDate("2023-11-30T00:00:00.000Z");
  let block12 = await dater.getDate("2023-12-31T00:00:00.000Z");

  const blocks2023 = [
    block0,
    block1,
    block2,
    block3,
    block4,
    block5,
    block6,
    block7,
    block8,
    block9,
    block10,
    block11,
    block12,
  ];

  let block13 = await dater.getDate("2024-01-31T00:00:00.000Z");
  let block14 = await dater.getDate("2024-02-28T00:00:00.000Z");
  let block15 = await dater.getDate("2024-03-31T00:00:00.000Z");
  let block16 = await dater.getDate("2024-04-30T00:00:00.000Z");
  let block17 = await dater.getDate("2024-05-31T00:00:00.000Z");
  let block18 = await dater.getDate("2024-06-30T00:00:00.000Z");
  let block19 = await dater.getDate("2024-07-31T00:00:00.000Z");
  let block20 = await dater.getDate("2024-08-31T00:00:00.000Z");
  let block21 = await dater.getDate("2024-09-30T00:00:00.000Z");
  let block22 = await dater.getDate("2024-10-31T00:00:00.000Z");
  let block23 = await dater.getDate("2024-11-30T00:00:00.000Z");
  let block24 = await dater.getDate("2024-12-31T00:00:00.000Z");

  const blocks2024 = [
    block12,
    block13,
    block14,
    block15,
    block16,
    block17,
    block18,
    block19,
    block20,
    block21,
    block22,
    block23,
    block24,
  ];

  let blocks = [];
  if (year === 2023) {
    blocks = blocks2023;
  } else if (year === 2024) {
    blocks = blocks2024;
  } else {
    console.log("Year not supported");
    process.exit(1);
  }
  return blocks;
};
