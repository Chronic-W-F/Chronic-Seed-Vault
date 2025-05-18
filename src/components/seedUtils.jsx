const aliasMap = {
  thc: 'total health connections',
  'total health': 'total health connections',
  'total health creations': 'total health connections',
  copy: 'copycat genetics',
  copycat: 'copycat genetics',
  'copy cat': 'copycat genetics',
  dwp: 'dadweedproject',
  dadweed: 'dadweedproject',
  'dadweed project': 'dadweedproject',
  cwf: 'chronic worm farmer',
  'chronic worm farmer': 'chronic worm farmer',
  chronic_worm_farmer: 'chronic worm farmer',
};

const docUrls = [
  {
    name: "Total Health Connections",
    url: "https://docs.google.com/document/d/1FSxo3B5Sw4oNX8eD6akMLmLQi_8gL7quxWvT4k8-dlk/export?format=txt",
  },
  {
    name: "Autoflower Case",
    url: "https://docs.google.com/document/d/1RKRh2B2GWkopW5eKG2SYkM3dF7kfXnO6jsdeyox13Cc/export?format=txt",
  },
  {
    name: "Red/Black Case",
    url: "https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt",
  },
  {
    name: "Black Case Photoperiods",
    url: "https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt",
  },
  {
    name: "Blue Case Photos",
    url: "https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt",
  },
  {
    name: "Chronic Worm Farmer",
    url: "https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt",
  },
];

function normalize(val = "") {
  return val.toLowerCase().replace(/\s+/g, "").trim();
}

export async function fetchSeedData() {
  const results = await Promise.all(
    docUrls.map(async ({ name, url }) => {
      try {
        const res = await fetch(url);
        const text = await res.text();
        const lines = text.split("\n").filter(Boolean);

        return lines.map((line) => {
          const rawSlot = line.match(/^\d+/)?.[0];
          const slot = rawSlot ? parseInt(rawSlot) : null;
          const lowerLine = line.toLowerCase();

          const normalizedAliases = Object.entries(aliasMap)
            .filter(([alias]) => lowerLine.includes(alias))
            .map(([_, mapped]) => mapped);

          return {
            slot,
            breeder: "",
            strain: "",
            sex: "",
            type: "",
            case: name,
            alias: normalizedAliases[0] || "",
            raw: `${name}: ${line.trim()}`,
          };
        });
      } catch (err) {
        console.error(`Error loading ${name}:`, err);
        return [];
      }
    })
  );

  return results.flat();
}
