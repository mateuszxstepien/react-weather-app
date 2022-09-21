import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";
import "./App.css";

const APIKey = "42c086438389e5d3ec7452c7613036b9";

class App extends Component {
  state = {
    value: "",
    city: "",
    date: "",
    sunrise: "",
    sunset: "",
    temp: "",
    wind: "",
    pressure: "",
    error: false,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // handleButtonClick = (e) => {
  //   e.preventDefault();

  //   const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;

  //   fetch(API)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       throw Error(response.status);
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const date = new Date().toLocaleString();
  //       this.setState((prevState) => ({
  //         city: prevState.value,
  //         date,
  //         sunrise: data.sys.sunrise,
  //         sunset: data.sys.sunset,
  //         temp: data.main.temp,
  //         wind: data.wind.speed,
  //         pressure: data.main.pressure,
  //         error: false,
  //       }));
  //     })
  //     .catch(
  //       (err) => console.log(err),
  //       this.setState((prevState) => ({
  //         city: prevState.value,
  //         error: true,
  //       }))
  //     );
  // };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error(response.status);
        })
        .then((response) => response.json())
        .then((data) => {
          const date = new Date().toLocaleString();
          this.setState((prevState) => ({
            city: prevState.value,
            date,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            wind: data.wind.speed,
            pressure: data.main.pressure,
            error: false,
          }));
        })
        .catch(
          (err) => console.log(err),
          this.setState((prevState) => ({
            city: prevState.value,
            error: true,
          }))
        );
    }
  }

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          // submit={this.handleButtonClick}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
