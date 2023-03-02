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
  if (typeof phoneNumber !== 'string' || !phoneNumber.match(phoneNumberRegex)) {
    return phoneNumber;
  }

  const countryCode = phoneNumber.substring(0, 4); // Extract the country code (+254)
  const firstPart = phoneNumber.substring(4, 7); // Extract the first 3 digits of the phone number
  const censoredPart = phoneNumber.substring(7, 10).replace(/\d/g, '*'); // Censor the middle 3 digits
  const lastPart = phoneNumber.substring(10); // Extract the last 3 digits of the phone number

  // Combine the parts back into a censored phone number string
  const censoredPhoneNumber = `${countryCode}${firstPart}${censoredPart}${lastPart}`;

  // Return the censored phone number
  return censoredPhoneNumber;
}