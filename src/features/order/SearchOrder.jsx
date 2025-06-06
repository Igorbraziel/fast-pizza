import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder={"Search Order"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-3 py-2 text-sm transition-all duration-500 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 sm:w-72 sm:focus:w-80"
      />
    </form>
  );
}

export default SearchOrder;
