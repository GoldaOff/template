import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchFormProps {
  initialQuery?: string;
}

/**
 * Форма поиска с вводом строки и обработкой отправки
 */
export const SearchForm: React.FC<SearchFormProps> = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for artists or tracks..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}; 