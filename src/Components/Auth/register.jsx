import ReCAPTCHA from "react-google-recaptcha";
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
    verified: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handlesubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    if (this.state.verified === true) {
      if (this.state.username === this.state.password) {
        this.setState({ alerts: "Password cannot be the same as User Name" });
      } else {
        this.createUser();
      }
    } else {
      this.setState({ alerts: "Verify that you are human" });
    }
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
          window.location.href = `/`;
        } else {
          this.setState({ alerts: response.data });
        }
      });
  };

  Verify = (response) => {
    this.setState({
      verified: true,
    });
  };

  render() {
    const alert = () => {
      if (this.state.alerts !== "") {
        return (
          <div className="p-2 flex justify-center">
            <div className="inline-flex bg-white leading-none text-purple-800 rounded-full p-2 shadow text-teal text-md">
              <span className="inline-flex px-2">{this.state.alerts}</span>
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
              className="bg-transparent blur shadow-lg rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={this.handlesubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-100 text-md font-bold mb-2"
                  htmlFor="username"
                >
                  User Name
                </label>
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="User Name"
                  maxlength="15"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-100 text-md font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  minlength="8"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 rounded-full  hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="flex justify-center ">
              <ReCAPTCHA
                sitekey="6Lc8Z9EZAAAAAFDnXf1n9233_szUX8FZp03TE7JG"
                onChange={this.Verify}
              />
            </div>
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
