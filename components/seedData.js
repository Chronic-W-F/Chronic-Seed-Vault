export const DNAIcon = () => (
  <span style={{ marginRight: '0.5em', verticalAlign: 'middle' }}>🧬</span>
);

export const BudIcon = () => (
  <span style={{ marginRight: '0.5em', verticalAlign: 'middle' }}>🌿</span>
);

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
    name: "Black Case",
    url: "https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt",
  },
  {
    name: "Blue Case",
    url: "https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt",
  },
  {
    name: "Chronic Worm Farmer",
    url: "https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt",
  },
];

export async function fetchSeedData() {
  const results = await Promise.all(
    docUrls.map(async ({ name, url }) => {
      try {
        const res = await fetch(url);
        const text = await res.text();

        const lines = text
          .split("\n")
          .filter((line) => line.trim() && !line.toLowerCase().includes("void"));

        return lines.map((line) => {
          const parts = line.split(" – ");
          const slot = parseInt(parts[0]?.replace("Slot ", "").trim());
          const breeder = parts[1]?.trim();
          const strain = parts[2]?.trim();
          const sex = parts[3]?.trim();
          const type = parts[4]?.trim();
          return { slot, breeder, strain, sex, type, case: name };
        });
      } catch (err) {
        console.error(`Failed to fetch ${name}:`, err);
        return [];
      }
    })
  );

  return results.flat();
}
