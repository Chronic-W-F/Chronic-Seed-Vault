module.exports = async function handler(req, res) {
  try {
    const docUrl = req.query.url;
    if (!docUrl) {
      return res.status(400).send("Missing URL");
    }

    const response = await fetch(docUrl);
    if (!response.ok) throw new Error("Failed to fetch document");

    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};
