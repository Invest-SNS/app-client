import default_Img from "../public/icon/+.svg";

export const getLogoFileName = (name, code) => {
  if (name.includes("스팩")) {
    return "SPAC_230706";
  } else if (name.includes("ETN")) {
    return "ETN_230706";
  } else if (
    name.includes("KODEX") ||
    name.includes("KOSEF") ||
    name.includes("KoAct") ||
    name.includes("TIGER") ||
    name.includes("ACE") ||
    name.includes("ARIRANG") ||
    name.includes("합성 H") ||
    name.includes("HANARO") ||
    name.includes("SOL")
  ) {
    return "ETF_230706";
  } else {
    return `kr/${code}`;
  }
};

export const onErrorImg = (e) => {
  e.target.src = default_Img;
};
