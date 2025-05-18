export async function fetchSeedData() {
  const results = await Promise.all(
    docUrls.map(async ({ name, url }) => {
      try {
        const res = await fetch(url);
        const text = await res.text();
        const lines = text.split("\n");

        return lines.map((line) => {
          const parts = line.split(" - ");
          const rawSlot = line.match(/^\d+/)?.[0];
          const slot = rawSlot ? parseInt(rawSlot) : null;

          const breeder = parts[1]?.trim();
          const strain = parts[2]?.trim();
          const typeSex = parts[3]?.trim() || "";

          let sex = "";
          let type = "";

          if (typeSex.toLowerCase().includes("fem")) sex = "Feminized";
          if (typeSex.toLowerCase().includes("reg")) sex = "Regular";
          if (typeSex.toLowerCase().includes("photo")) type = "Photoperiod";
          if (typeSex.toLowerCase().includes("auto")) type = "Autoflower";

          const alias = normalizeAlias(breeder);
          const rawWithAlias = `${line.trim()} ${alias !== breeder ? alias : ''}`;

          return {
            slot,
            breeder,
            strain,
            sex,
            type,
            alias,
            case: name,
            raw: rawWithAlias.trim(),
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
