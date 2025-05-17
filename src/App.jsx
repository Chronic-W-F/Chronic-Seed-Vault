useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch("/api/seedlist");
      const text = await res.text();
      const lines = text.split("\n").filter(line => line.trim().length > 0);
      setEntries(lines);
    } catch (err) {
      setEntries([`{"error":true,"message":"${err.message}"}`]);
    }
  }
  fetchData();
}, []);
