function App() {
  const [selectedCase, setSelectedCase] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedCase) return;
    fetch(`/api/seedlist?url=${encodeURIComponent(CASES[selectedCase])}`)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        const entries = lines.map(line => ({ text: line, case: selectedCase }));
        setData(entries);
        setError(null);
      })
      .catch(err => setError({ error: true, message: err.message }));
  }, [selectedCase]);

  const filtered = search
    ? data.filter(entry => {
        const lower = entry.text.toLowerCase();
        const alias = ALIASES[search.toLowerCase()] || search.toLowerCase();
        return lower.includes(alias);
      })
    : data;

  // Return JSX below here (e.g. dropdown, input, results...)
}
// ... all the code above ...

export default App;
