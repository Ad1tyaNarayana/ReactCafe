import React, { Component } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://cafereactapi.herokuapp.com/cafe",
  headers: {
    "X-Auth-Token": window.sessionStorage.getItem("token"),
    "X-Auth-id": window.sessionStorage.getItem("userId"),
  },
});

export default class Cafe extends Component {
  state = {
    comment: "",
    alerts: "",
  };

  getComment = async () => {
    api
      .get(
        `/${this.props.match.params.id}/comments/${this.props.match.params.comment}/edit`
      )
      .then((comment) => {
        this.setState({ comment: comment.data.text });
      });
  };

  componentDidMount() {
    this.getComment();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handlesubmit = (e) => {
    e.preventDefault();
    this.editComment();
  };

  editComment = async () => {
    api
      .put(
        `/${this.props.match.params.id}/comments/${this.props.match.params.comment}`,
        {
          comment: this.state.comment,
        }
      )
      .then((response) => {
        if (response.data === "Successfully Edited Comment") {
          this.setState({ alerts: response.data });
          setTimeout(() => {
            window.location.href = `#/post/${this.props.match.params.id}`;
          }, 1000);
        } else {
          this.setState({ alerts: response.data });
        }
      });
  };

  render() {
    const alert = () => {
      if (this.state.alerts) {
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
              <h1 className="font-bold text-5xl text-white">Edit Comment</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              action="/"
              className="bg-transparent blur shadow-lg rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={this.handlesubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-100 text-md font-bold mb-2"
                  htmlFor="name"
                >
                  Comment
                </label>
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                  id="comment"
                  type="text"
                  value={this.state.comment}
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Edit Comment
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
