const aliasMap = {
  thc: 'Total Health Connections',
  "total health": 'Total Health Connections',
  "total health creations": 'Total Health Connections',
  "total health connection": 'Total Health Connections',

  copy: 'CopyCat Genetics',
  "copycat": 'CopyCat Genetics',
  "copy cat": 'CopyCat Genetics',
  "copycat genetics": 'CopyCat Genetics',

  dwp: 'DadWeedProject',
  "dadweed": 'DadWeedProject',
  "dad weed": 'DadWeedProject',
  "dad weed project": 'DadWeedProject',
  "dadweed project": 'DadWeedProject',
  "dadweedproject": 'DadWeedProject',

  cwf: 'Chronic Worm Farmer',
  "chronic worm farmer": 'Chronic Worm Farmer',
  "chronic_worm_farmer": 'Chronic Worm Farmer',
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

function normalizeAliasFromLine(line = "") {
  const cleaned = line.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
  const match = Object.keys(aliasMap).find(key =>
    cleaned.includes(key.replace(/\s+/g, '').replace(/[^a-z]/g, ''))
  );
  return match ? aliasMap[match] : "";
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

          return {
            slot,
            breeder: "",
            strain: "",
            sex: "",
            type: "",
            case: name,
            alias: normalizeAliasFromLine(line),
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
