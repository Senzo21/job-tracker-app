// src/components/SearchBar.tsx
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [input, setInput] = useState('');

  // Trigger live filtering
  useEffect(() => {
    onSearch(input);
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  const handleClear = () => {
    setInput('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search links..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
};

export default SearchBar;
