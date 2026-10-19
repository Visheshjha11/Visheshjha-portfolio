// Vercel returns the state/region as a short ISO 3166-2 code ("PB", "CA").
// Intl.DisplayNames can't translate subdivisions, so we map the most common ones.
// Anything not listed falls back to the raw code, which still reads fine.
const IN: Record<string, string> = {
  AN: "Andaman and Nicobar Islands", AP: "Andhra Pradesh", AR: "Arunachal Pradesh", AS: "Assam",
  BR: "Bihar", CH: "Chandigarh", CG: "Chhattisgarh", CT: "Chhattisgarh", DH: "Dadra and Nagar Haveli and Daman and Diu",
  DN: "Dadra and Nagar Haveli and Daman and Diu", DD: "Dadra and Nagar Haveli and Daman and Diu",
  DL: "Delhi", GA: "Goa", GJ: "Gujarat", HR: "Haryana", HP: "Himachal Pradesh", JK: "Jammu and Kashmir",
  JH: "Jharkhand", KA: "Karnataka", KL: "Kerala", LA: "Ladakh", LD: "Lakshadweep", MP: "Madhya Pradesh",
  MH: "Maharashtra", MN: "Manipur", ML: "Meghalaya", MZ: "Mizoram", NL: "Nagaland", OD: "Odisha", OR: "Odisha",
  PY: "Puducherry", PB: "Punjab", RJ: "Rajasthan", SK: "Sikkim", TN: "Tamil Nadu", TG: "Telangana",
  TS: "Telangana", TR: "Tripura", UP: "Uttar Pradesh", UT: "Uttarakhand", UK: "Uttarakhand", WB: "West Bengal",
};

const US: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado",
  CT: "Connecticut", DE: "Delaware", DC: "District of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii",
  ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
  ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

const BY_COUNTRY: Record<string, Record<string, string>> = { IN, US };

export function regionName(countryCode: string | null, regionCode: string | null): string | null {
  if (!regionCode) return null;
  return BY_COUNTRY[countryCode ?? ""]?.[regionCode] ?? regionCode;
}

export function countryName(countryCode: string | null): string | null {
  if (!countryCode) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}
