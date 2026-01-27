// src/components/seedUtils.jsx

export const docUrls = [
  {
    name: "Total Health Connections",
    url: "https://docs.google.com/document/d/1FSxo3B5Sw4oNX8eD6akMLmLQi_8gL7quxWvT4k8-dlk/export?format=txt",
  },
  {
    name: "Autoflower Case",
    url: "https://docs.google.com/document/d/11Fi5ux2DBa7bP20V6U8ZqzZM_L-7O0S4SuWZCTXEOO0/export?format=txt",
  },
  {
    name: "Red/Black Case",
    url: "https://docs.google.com/document/d/1J2jWK6EEERu834e2wR--hoABcgxrpppkpNk2r_H8V-0/export?format=txt",
  },
  {
    name: "Blue Case Photos",
    url: "https://docs.google.com/document/d/1qoE2gM291GBNlX5pP9dtnNqqNF-aZzb4P-_w-DLUvZ8/export?format=txt",
  },
  {
    name: "Black Case Photoperiods",
    url: "https://docs.google.com/document/d/1f2JwxGy_xlhVbYW11NCP06t6qXbai_lKHC_UCrWsNgM/export?format=txt",
  },
  {
  name: "Chronic Worm Farmer",
  url: "https://docs.google.com/document/d/1UWskJERde9hip9FgKonDmP21GOHIcDJZS217VWGIeCc/export?format=txt",
},
  {
    name: "Purple/Black Case",
    url: "https://docs.google.com/document/d/1OsmB_L8Ou-S7vlT4jFNb_s-_fGCuxPJfLDVp4cO2h5U/export?format=txt",
  },
];

export const fetchSeedData = async () => {
  const allData = [];

  for (const { name, url } of docUrls) {
    try {
      // IMPORTANT: fetch through API proxy to avoid Google Docs CORS issues
      const res = await fetch(
        `/api/seedlist?url=${encodeURIComponent(url)}`
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const text = await res.text();

      const lines = text
        .split("\n")
        .map((line) => line.trim())
        // Only remove header lines that START with "slot"
        .filter((line) => line && !/^slot\b/i.test(line));

      for (const line of lines) {
        allData.push({
          slot: "",
          breeder: "",
          strain: "",
          sex: "",
          type: "",
          case: name,
          raw: line,
        });
      }
    } catch (err) {
      console.error(`Failed to load ${name}:`, err);
    }
  }

  return allData;
};
