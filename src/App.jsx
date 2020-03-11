import React, { Component } from "react";
import "./style.scss";

class App extends Component {
  state = { artist: "Chainsmokers", song: "Closer", lyrics: "" };
  render() {
    return (
      <div className="main">
        <form className="form">
          <label htmlFor="artist" onClick={this.expandPanel}>
            Artist
            <input
              type="text"
              name="artist"
              placeholder="Chainsmokers"
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="song" onClick={this.expandPanel}>
            Song
            <input
              type="text"
              name="song"
              placeholder="Closer"
              onChange={this.handleChange}
            />
          </label>
          <button
            id="submit"
            type="submit"
            onClick={this.handleClick.bind(this)}
          >
            Search
          </button>
        </form>
        <pre className="lyrics">{this.state.lyrics}</pre>
      </div>
    );
  }

  handleChange = e => {
    let newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  handleClick(e) {
    e.preventDefault();
    fetch(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.song}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ lyrics: res.lyrics });
      });

    document.querySelector(".form").style.height = "4rem";
  }

  expandPanel() {
    document.querySelector(".form").style.height = "35rem";
  }
}

export default App;
