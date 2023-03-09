export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.userAgent.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export function isEmpty(e) {
  if (e && Array.isArray(e)) {
    return e.length < 1 ? true : false;
  } else if (typeof e === "object") {
    return isObjEmpty(e);
  } else {
    switch (e) {
      case "":
      case null:
      case false:
      case undefined:
        return true;
      default:
        return false;
    }
  }
}

function isObjEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

export function censorName(name) {
  // Split the name into an array of first and last names
  const names = name.split(" ");

  // Replace all characters in the first and last names, except for the first letter of each name, with asterisks
  const censoredNames = names.map((name) => {
    const firstLetter = name.charAt(0);
    const censoredPart = name.substring(1).replace(/\S/g, "*");
    return `${firstLetter}${censoredPart}`;
  });

  // Join the censored first and last names back into a single string
  const censoredName = censoredNames.join(" ");

  // Return the censored name
  return censoredName;
}

export function censorPhoneNumber(phoneNumber) {
  // Check that the phoneNumber is a string and matches the format +254XXXXXXXXX
  const phoneNumberRegex = /^\+254\d{9}$/;
  if (typeof phoneNumber !== "string" || !phoneNumber.match(phoneNumberRegex)) {
    return phoneNumber;
  }

  const countryCode = phoneNumber.substring(0, 4); // Extract the country code (+254)
  const firstPart = phoneNumber.substring(4, 7); // Extract the first 3 digits of the phone number
  const censoredPart = phoneNumber.substring(7, 10).replace(/\d/g, "*"); // Censor the middle 3 digits
  const lastPart = phoneNumber.substring(10); // Extract the last 3 digits of the phone number

  // Combine the parts back into a censored phone number string
  const censoredPhoneNumber = `${countryCode}${firstPart}${censoredPart}${lastPart}`;

  // Return the censored phone number
  return censoredPhoneNumber;
}

export const imageMap = {
  plastic1: "/images/waste/p1.png",
  plastic2: "/images/waste/p2.png",
  plastic3: "/images/waste/p3.png",
  plastic4: "/images/waste/p4.png",
  plastic5: "/images/waste/p5.png",
  plastic6: "/images/waste/p6.png",
  plastic7: "/images/waste/p7.png",
  glass: "/images/waste/g.png",
  metal: "/images/waste/m.png",
  paper: "/images/waste/blank.png",
};

const wasteTypes = [
  { text: "Paper", value: "paper" },
  { text: "Glass", value: "glass" },
  { text: "Metal", value: "metal" },
  { text: "Plastic 1", value: "plastic1" },
  { text: "Plastic 2", value: "plastic2" },
  { text: "Plastic 3", value: "plastic3" },
  { text: "Plastic 4", value: "plastic4" },
  { text: "Plastic 5", value: "plastic5" },
  { text: "Plastic 6", value: "plastic6" },
  { text: "Plastic 7", value: "plastic7" },
];

//find brand from brands array using value and return text
export function findBrand(value) {
  let brand = brands.find((b) => b.value === value);
  return brand.text;
}

//find product from productsDict using value and return text
export function findProduct(brnd, value) {
  let product = productsDict[brnd].find((p) => p.value === value);
  return product.text;
}

const brands = [
  { text: "Coca Cola", value: "cocacola" },
  { text: "Bidco", value: "bidco" },
  { text: "Unilever", value: "unilever" },
  { text: "Procter & Gamble", value: "procterngamble" },
  { text: "Brookside", value: "brookside" },
  { text: "EABL", value: "eabl" },
  { text: "Dairyland", value: "dairyland" },
  { text: "Pernod Ricard", value: "pernodricard" },
  { text: "Kenya Originals", value: "kenyaoriginals" },
];

const productsDict = {
  cocacola: [
    { text: "Coca-Cola", value: "cocacola" },
    { text: "Sprite", value: "sprite" },
    { text: "Fanta", value: "fanta" },
    { text: "Stoney", value: "stoney" },
    { text: "Minute maid", value: "minutemaid" },
    { text: "Dasani", value: "dasani" },
    { text: "Schweppes", value: "schweppes" },
    { text: "Novida", value: "novida" },
  ],
  bidco: [
    { text: "Elianto", value: "elianto" },
    { text: "SoyaGold", value: "soyagold" },
    { text: "SunGold", value: "sungold" },
    { text: "Kimbo", value: "kimbo" },
    { text: "Olive Gold", value: "olivegold" },
    { text: "Golden Fry", value: "goldenfry" },
    { text: "Ufuta", value: "ufuta" },
    { text: "Bahari", value: "bahari" },
    { text: "Chipo", value: "chipo" },
    { text: "Mallo", value: "mallo" },
    { text: "Cowboy", value: "cowboy" },
    { text: "Chipsy", value: "chipsy" },
    { text: "Gold Band", value: "goldband" },
    { text: "Germonil", value: "germonil" },
    { text: "Nuru", value: "nuru" },
    { text: "Gental", value: "gental" },
    { text: "Msafi", value: "msafi" },
  ],
  unilever: [
    { text: "Dove", value: "dove" },
    { text: "Vaseline", value: "vaseline" },
    { text: "Sunsilk", value: "sunsilk" },
    { text: "Liquid I.V", value: "liquidiv" },
    { text: "Axe", value: "axe" },
    { text: "Lifebuoy", value: "lifebuoy" },
    { text: "Lux", value: "lux" },
    { text: "Rexona", value: "rexona" },
    { text: "Comfort", value: "comfort" },
    { text: "Omo", value: "omo" },
    { text: "Knorr", value: "knorr" },
    { text: "Hellmann’s", value: "hellmanns" },
    { text: "Horlicks", value: "horlicks" },
    { text: "Ben & Jerry’s", value: "bennjerrys" },
  ],
  procterngamble: [
    { text: "Ariel", value: "ariel" },
    { text: "Downy", value: "downy" },
    { text: "Tide", value: "tide" },
    { text: "bounty", value: "bounty" },
    { text: "Gilette", value: "gilette" },
    { text: "Old Spice", value: "oldspice" },
    { text: "Dawn", value: "dawn" },
    { text: "Febreze", value: "Febreze" },
    { text: "Mr Clean", value: "mrclean" },
    { text: "Oral B", value: "oralb" },
  ],
  brookside: [{ text: "Lala", value: "lala" }],
};
