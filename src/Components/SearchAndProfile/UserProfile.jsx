import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "https://cafereactserver.onrender.com/",
  headers: {
    "X-Auth-Token": window.sessionStorage.getItem("token"),
  },
});

class UserProfile extends Component {
  state = {
    Posts: [],
    user: "",
    alerts: "",
    UserInfo: "",
  };

  getUser = () => {
    api
      .post("/user", {
        id: this.props.match.params.profile,
      })
      .then((response) => {
        this.setState({
          user: {
            id: response.data._id,
            username: response.data.username,
            following: response.data.following,
            followers: response.data.followers,
          },
        });
      });
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

  follow = () => {
    api
      .post("/follow", {
        userId: window.sessionStorage.getItem("userId"),
        followId: this.props.match.params.profile,
      })
      .then((response) => {
        this.setState({ alerts: response.data });
        window.location.reload();
      });
  };

  getCafes = async () => {
    let data = await api.get("cafe/").then(({ data }) => data);
    if (this._mounted) {
      this.setState({ Posts: data });
    }
  };

  componentDidMount() {
    this._mounted = true;
    this.getCafes();
    this.getUser();
    this.UserInfo();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    let postCount = 0;
    const Posts = this.state.Posts.map((post) => {
      if (post.author.id === this.props.match.params.profile) {
        postCount++;
        return (
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="block bg-transparent-700 mt-5 rounded-md overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1">
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
                </div>
              </div>
            </div>
          </Link>
        );
      } else return null;
    });

    const Liked = this.state.Posts.map((post) => {
      if (
        window.sessionStorage.getItem("loggedIn") === "True" &&
        this.props.match.params.profile ===
          window.sessionStorage.getItem("userId")
      ) {
        let likeCheck = 0;
        post.likes.forEach((like) => {
          if (this.props.match.params.profile === like.id) {
            likeCheck++;
          }
        });
        if (likeCheck > 0) {
          return (
            <Link key={post._id} to={`/post/${post._id}`}>
              <div className="block bg-transparent-700 mt-5 rounded-md overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1">
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
                  </div>
                </div>
              </div>
            </Link>
          );
        } else return null;
      } else return null;
    });

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

    const checkFollow = () => {
      if (
        window.sessionStorage.getItem("loggedIn") === "True" &&
        this.props.match.params.profile !==
          window.sessionStorage.getItem("userId")
      ) {
        try {
          let followCheck = 0;
          this.state.UserInfo.following.forEach((follow) => {
            if (this.props.match.params.profile === follow.id) {
              followCheck++;
            }
          });
          if (followCheck > 0) {
            return (
              <button
                onClick={this.follow}
                style={{ maxHeight: "2rem" }}
                className="inline bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                UnFollow
              </button>
            );
          } else {
            return (
              <button
                onClick={this.follow}
                style={{ maxHeight: "2rem" }}
                className="inline bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Follow
              </button>
            );
          }
        } catch {
          return null;
        }
      } else {
        return null;
      }
    };

    const UserCheckLiked = () => {
      if (
        this.props.match.params.profile ===
        window.sessionStorage.getItem("userId")
      ) {
        return <h5 className="text-3xl text-center">Liked Posts</h5>;
      } else return null;
    };

    const NoPostCheck = () => {
      if (postCount === 0) {
        return <p className="text-center text-gray-500">No Posts Yet</p>;
      } else return null;
    };

    const followers = () => {
      let followerCount = 0;
      try {
        this.state.user.followers.forEach((follower) => {
          followerCount++;
        });
      } catch (err) {}
      return followerCount;
    };
    const following = () => {
      let followingCount = 0;
      try {
        this.state.user.following.forEach((following) => {
          followingCount++;
        });
      } catch (err) {}
      return followingCount;
    };

    return (
      <div style={{ marginTop: "5rem" }}>
        <div className="flex items-center justify-center">
          <div
            style={{ minWidth: "80vw" }}
            className="bg-white shadow-xl rounded-lg font-bold"
          >
            {alert()}
            <div className="flex flex-col p-5 items-center text-center border-gray-300 text-gray-700">
              <h5 className="text-5xl text-center w-full">
                {this.state.user.username}
              </h5>
              {checkFollow()}
            </div>
            <div className="flex p-4 border-t border-b justify-around border-gray-300 text-gray-700">
              <p className="ml-1 mr-1 text-purple-800 text-xl font-semibold py-1">
                {followers()} Followers
              </p>
              <p className="ml-1 mr-1 text-blue-700 text-xl font-semibold py-1">
                {following()} Following
              </p>
            </div>
            <div
              style={{ maxHeight: "60vh" }}
              className="p-4 overflow-y-auto text-gray-700"
            >
              {UserCheckLiked()}
              <div
                style={{ maxHeight: "60vh" }}
                className="flex justify-evenly overflow-y-auto"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Liked}
                </div>
              </div>
            </div>
            <div className="p-10 text-gray-700">
              <h5 className="text-3xl text-center">Posts</h5>
              <div
                style={{ maxHeight: "60vh" }}
                className="flex justify-evenly overflow-y-auto"
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Posts}
                </div>
              </div>
              <br />
              {NoPostCheck()}
            </div>
            <a rel="noreferrer" href="https://adityanarayana.netlify.app/">
              <p className="text-center mb-1 text-gray-500 text-xs">
                © Aditya Narayana
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
