import fs from "fs";
import path from "path";

const file = fs.readFileSync(path.resolve(__dirname, "./data.txt")).toString();
const fileLines = file.split("\n");

type BagColor = string;

type ParsedContent = { container: BagColor; content: string };

const parseContainersAndContent = (): ParsedContent[] => {
  return fileLines.map((item) => {
    const match = item.match(
      /(?<container>.*) bags contain ((?<content>\d.*)|(no other bags))./
    );
    return { ...match?.groups } as ParsedContent;
  });
};

const parseContent = (content?: string): BagColor[] => {
  if (!content) {
    return [];
  }
  const differentTypes = content.split(", ");

  return differentTypes.map((item) => {
    const match = item.match(/(\d) (?<bag_color>(.*)) bag/);
    return match?.groups?.bag_color ?? "";
  });
};

export const main = (): number => {
  const rulesMap = new Map<BagColor, BagColor[]>();
  parseContainersAndContent().forEach((item) => {
    rulesMap.set(item.container, parseContent(item.content));
  });

  const canContainShinyGold: BagColor[] = [];
  let addedColors: BagColor[] = ["shiny gold"];

  while (addedColors.length) {
    const addedColorsThisCycle: BagColor[] = [];
    rulesMap.forEach((value, key) => {
      addedColors.forEach((color) => {
        if (value.find((item) => item === color)) {
          canContainShinyGold.push(key);
          addedColorsThisCycle.push(key);
        }
      });
    });
    addedColors = addedColorsThisCycle;
  }

  return new Set(canContainShinyGold).size;
};
