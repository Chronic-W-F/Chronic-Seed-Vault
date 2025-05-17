export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://docs.google.com/document/d/1FSxo3B5Sw4oNX8eD6akMLmLQi_8gL7quxWvT4k8-dlk/export?format=txt"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch document");
    }
    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
}
