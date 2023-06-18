import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export const SearchBar = ( {onSubmit} ) => {
  const [search, setSearch] = useState('');

    // відслідковування введення і запис в стейт
   const handleChange = ev => {
      const { value } = ev.currentTarget;
      setSearch(value.toLowerCase().trim());
    };
    // передача значень форми в Арр
    const handleSubmit = ev => {
      ev.preventDefault();
      if (search === '') {
        Swal.fire('Please enter a request');
        return;
      }
      onSubmit(search);
      setSearch('')
  };
  return (
      <header className="Searchbar">
        <form className="SearchForm " onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={handleChange}
          />
        </form>
      </header>
    );
};
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
