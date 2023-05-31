import { Component } from 'react';
import s from '../styles.module.scss'

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.input);
  };

  render() {
    return (
      <header className={s.searchbar} onSubmit={this.handleSubmit}>
        <form className={s.searchForm}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={e => {
              this.setState({ input: e.target.value });
            }}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
