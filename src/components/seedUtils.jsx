const docUrls = [
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
];

export const fetchSeedData = async () => {
  const allData = [];

  for (const { name, url } of docUrls) {
    try {
      const res = await fetch(url);
      const text = await res.text();

      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.toLowerCase().includes('slot'));

      for (const line of lines) {
        allData.push({
          slot: '',
          breeder: '',
          strain: '',
          sex: '',
          type: '',
          case: name,
          raw: line,
        });
      }
    } catch (err) {
      console.error(`Failed to load ${name}:`, err);
    }
  }

  return allData;
};      const res = await fetch(`${url}&_=${Date.now()}`, { cache: "no-store" });
      const text = await res.text();

      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.toLowerCase().includes("slot"));

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
};      const res = await fetch(`${url}&_=${Date.now()}`, { cache: "no-store" });
      const text = await res.text();

      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.toLowerCase().includes("slot"));

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
};      const res = await fetch(`${url}&_=${Date.now()}`, { cache: "no-store" });
      const text = await res.text();

      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.toLowerCase().includes("slot"));

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
};        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.toLowerCase().includes('slot'));

      for (const line of lines) {
        allData.push({
          slot: '',
          breeder: '',
          strain: '',
          sex: '',
          type: '',
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
