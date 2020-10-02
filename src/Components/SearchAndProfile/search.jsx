import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "https://cafereactapi.herokuapp.com/",
});

class Search extends Component {
  state = {
    Posts: [],
    users: "",
    search: "",
  };

  getUser = () => {
    api.get("/users").then((response) => {
      this.setState({ users: response.data });
    });
  };

  getCafes = async () => {
    let data = await api.get("cafe/links").then(({ data }) => data);
    if (this._mounted) {
      this.setState({ Posts: data });
    }
  };

  handleChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  componentDidMount() {
    this._mounted = true;
    this.getCafes();
    this.getUser();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const Users = () => {
      try {
        let Users = this.state.users.map((user) => {
          if (this.state.search !== "") {
            const regex = new RegExp(this.state.search, "gi");
            if (user.username.match(regex)) {
              return (
                <Link
                  key={user._id}
                  className="rounded-full m-4 h-32 w-32 flex items-center justify-center bg-purple-100 shadow-lg"
                  to={`/user/${user._id}`}
                >
                  <p className="text-gray-900">{user.username}</p>
                </Link>
              );
            } else {
              return null;
            }
          } else {
            return null;
          }
        });
        return Users;
      } catch {
        return null;
      }
    };

    const Cafes = this.state.Posts.map((cafe) => {
      if (this.state.search !== "") {
        const regex = new RegExp(this.state.search, "gi");
        if (cafe.name.match(regex)) {
          return (
            <Link key={cafe.id} to={`/post/${cafe.id}`}>
              <div className="block bg-transparent-700 mt-5 rounded-md overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                <div className="max-w-xs w-full bg-blue-600">
                  <div className="flex items-center justify-center overflow-hidden">
                    <img
                      src={cafe.image}
                      style={{ maxHeight: "35vh", width: "100%" }}
                      alt="post"
                    />
                  </div>
                  <div className="py-2 px-3 text-center text-sm">
                    <h3 className="text-white text-lg">{cafe.name}</h3>
                  </div>
                </div>
              </div>
            </Link>
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    });

    return (
      <div style={{ marginTop: "5rem" }}>
        <div className="flex items-center justify-center">
          <div
            style={{ minWidth: "80vw" }}
            className="bg-white shadow-xl rounded-lg font-bold p-10"
          >
            <h5 className="text-5xl text-gray-700 text-center">Search</h5>
            <div className="p-5 justify-center text-center text-gray-700">
              <form>
                <div className="inline relative text-gray-600 focus-within:text-gray-400">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      className="p-1 focus:outline-none focus:shadow-outline"
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </span>
                  <input
                    type="search"
                    onChange={this.handleChange}
                    className="py-3 pr-1 text-sm text-white bg-gray-900 rounded-full pl-10 focus:outline-none focus:bg-gray-300 focus:text-gray-900"
                    placeholder="Search"
                    autoComplete="off"
                  />
                </div>
              </form>
              <div className="p-5 text-gray-700">
                <div
                  style={{ maxHeight: "40vh" }}
                  className="overflow-y-auto flex justify-evenly"
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Users()}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border-gray-300 text-gray-700">
              <div className="flex justify-evenly">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Cafes}
                </div>
              </div>
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

export default Search;
