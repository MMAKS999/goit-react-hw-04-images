import { Component } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

export class SearchBar extends Component {
  state = {
    search: '',
  };
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  // відслідковування введення і запис в стейт
  handleChange = ev => {
    const { value } = ev.currentTarget;
    this.setState({ search: value.toLowerCase().trim() });
  };
  // передача значень форми в Арр
  handleSubmit = ev => {
    ev.preventDefault();
    const { search } = this.state;
    if (search.trim() === '') {
      Swal.fire('Please enter a request');
      return;
    }
    this.props.onSubmit(search);
    this.setState({ search: '' });
  };

  render() {
    const { search } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm " onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
