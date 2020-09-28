import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "https://cafereactapi.herokuapp.com/",
});

class Search extends Component {
  state = {
    Posts: [],
    UserInfo: "",
  };

  UserInfo = () => {
    api
      .post("/user", {
        id: window.sessionStorage.getItem("userId"),
      })
      .then((response) => {
        this.setState({
          UserInfo: response.data,
        });
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
    this.UserInfo();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const Posts = () => {
      try {
        const Posts = this.state.Posts.map((post) => {
          if (window.sessionStorage.getItem("loggedIn") === "True") {
            let followCount = 0;
            if (
              post.authorId === this.state.UserInfo.following[followCount].id
            ) {
              return (
                <Link key={post.id} to={`/post/${post.id}`}>
                  <div className="block bg-transparent-700 mt-5 rounded-md overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <div className="max-w-xs w-full bg-blue-600">
                      <div className="flex items-center justify-center overflow-hidden">
                        <img
                          src={post.image}
                          style={{ maxHeight: "35vh", width: "100%" }}
                          alt="post"
                        />
                      </div>
                      <div className="py-2 px-3 text-center text-sm">
                        <h3 className="text-white text-lg">{post.name}</h3>
                        <h3 className="text-white text-lg">
                          {post.authorName}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            } else return null;
          } else return null;
        });
        return Posts;
      } catch {
        return null;
      }
    };

    return (
      <div style={{ marginTop: "5rem" }}>
        <div className="flex items-center justify-center">
          <div
            style={{ minWidth: "50vw" }}
            className="bg-white shadow-xl rounded-lg font-bold p-10"
          >
            <h5 className="text-5xl text-gray-700 text-center">Feed</h5>
            <div className="p-5 border-gray-300 text-gray-700">
              <div className="flex justify-evenly">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Posts()}
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
