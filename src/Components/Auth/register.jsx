import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://cafereactapi.herokuapp.com/",
});

export default class Cafe extends Component {
  state = {
    username: "",
    password: "",
    alerts: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handlesubmit = (e) => {
    e.preventDefault();
    this.createUser();
  };

  createUser = async () => {
    api
      .post("/register", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        if (response.data.Success === "Successfully Signed In") {
          this.setState({ alerts: response.data.Success });
          this.props.LogIn(response.data);
          setTimeout(() => {
            window.location.href = `/`;
          }, 1000);
        } else {
          this.setState({ alerts: response.data });
        }
      });
  };

  render() {
    const alert = () => {
      if (this.state.alerts !== "") {
        return (
          <div class="p-2 flex justify-center">
            <div class="inline-flex bg-white leading-none text-purple-800 rounded-full p-2 shadow text-teal text-md">
              <span class="inline-flex px-2">{this.state.alerts}</span>
            </div>
          </div>
        );
      }
    };
    return (
      <div>
        <div>
          <div
            style={{ height: "60vh", backgroundColor: "#32533d" }}
            className="bannerFondo bg-800 bg-left-top bg-auto bg-repeat-x"
          />
          <div className="-mt-64 ">
            {alert()}
            <div className="w-full text-center">
              <h1 className="font-bold text-5xl text-white">Sign Up</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={this.handlesubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  User Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="username"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            <a rel="noreferrer" href="https://adityanarayana.netlify.app/">
              <p className="text-center text-gray-500 text-xs">
                © Aditya Narayana
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
