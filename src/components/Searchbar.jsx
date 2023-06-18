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
      if (search.trim() === '') {
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
// export class SearchBar extends Component {
//   state = {
//     search: '',
//   };
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   // відслідковування введення і запис в стейт
//   handleChange = ev => {
//     const { value } = ev.currentTarget;
//     this.setState({ search: value.toLowerCase().trim() });
//   };
//   // передача значень форми в Арр
//   handleSubmit = ev => {
//     ev.preventDefault();
//     const { search } = this.state;
//     if (search.trim() === '') {
//       Swal.fire('Please enter a request');
//       return;
//     }
//     this.props.onSubmit(search);
//     this.setState({ search: '' });
//   };

//   render() {
//     const { search } = this.state;
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm " onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>
//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={search}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
