import { useState } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const query = encodeURIComponent(searchQuery);
    const url = `https://www.google.com/search?q=${query}`;
    window.open(url, "_blank");
  };

  return (
    <div className="search-container">
      <h1>Google検索</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="検索キーワードを入力"
      />
      <button onClick={handleSearch}>検索</button>
    </div>
  );
}

export default App;
