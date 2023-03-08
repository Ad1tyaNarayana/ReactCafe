import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "https://cafereactserver.onrender.com/",
  headers: {
    "X-Auth-Token": window.sessionStorage.getItem("token"),
    "X-Auth-id": window.sessionStorage.getItem("userId"),
  },
});

export default class Cafe extends Component {
  state = {
    Post: { comments: [] },
    author: {
      id: "",
    },
    comments: "",
    user: "",
    alerts: "",
  };

  getUser = () => {
    api
      .post("/user", {
        id: window.sessionStorage.getItem("userId"),
      })
      .then((response) => {
        this.setState({
          user: {
            id: window.sessionStorage.getItem("userId"),
            username: response.data.username,
          },
        });
      });
  };

  getCafe = async () => {
    if (this._mounted) {
      let data = await api
        .get(`cafe/${this.props.match.params.id}`)
        .then(({ data }) => data);
      this.setState({ Post: data, author: data.author });
    }
  };

  deleteCafe = () => {
    api.delete(`cafe/${this.props.match.params.id}`).then((response) => {
      if (response.data === "Successfully Deleted Cafe") {
        this.setState({ alerts: response.data });
        setTimeout(() => {
          window.location.href = `/`;
        }, 1000);
      } else {
        this.setState({ alerts: response.data });
      }
    });
  };

  addComment = () => {
    api
      .post(`cafe/${this.props.match.params.id}/comments`, {
        comment: this.state.comments,
        id: this.state.user.id,
        username: this.state.user.username,
      })
      .then(function (response) {
        if (response.data === "No Token") {
          window.location.href = "/login";
        }
        window.location.reload();
      });
  };

  deleteComment = (e) => {
    api
      .delete(
        `cafe/${this.props.match.params.id}/comments/${e.currentTarget.id}`
      )
      .then((response) => {
        if (response.data === "Successfully Deleted Comment") {
          this.setState({ alerts: response.data });
          window.location.reload();
        } else {
          this.setState({ alerts: response.data });
        }
      });
  };

  likePost = () => {
    api
      .post(`cafe/${this.props.match.params.id}/like`, {
        id: this.state.user.id,
      })
      .then(function (response) {
        if (response.data === "No Token") {
          window.location.href = "/login";
        }
        window.location.reload();
      });
  };

  handleChange = (e) => {
    this.setState({
      comments: e.target.value,
    });
  };

  componentDidMount() {
    this._mounted = true;
    this.getCafe();
    this.getUser();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const checkPostOwnerShip = () => {
      if (this.state.author.id === window.sessionStorage.getItem("userId")) {
        return (
          <React.Fragment>
            <Link to={`/post/${this.props.match.params.id}/edit`}>
              <button className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">
                Edit
              </button>
            </Link>
            <button
              onClick={this.deleteCafe}
              className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Delete
            </button>
          </React.Fragment>
        );
      } else {
        return <div></div>;
      }
    };

    const checkCommentOwnerShip = (data) => {
      try {
        if (data.author.id === window.sessionStorage.getItem("userId")) {
          return (
            <div>
              <Link className="hover:underline" to={`/user/${data.author.id}`}>
                <p className="text-gray-700">{data.author.username}</p>
              </Link>
              <div className="flex p-2 border-t border-gray-300 text-gray-700">
                <Link
                  className="ml-2 mr-2 bg-transparent hover:bg-blue-500
                text-blue-700 font-semibold hover:text-white py-1 px-4 border
                border-blue-500 hover:border-transparent rounded"
                  to={`/post/${this.props.match.params.id}/comments/${data._id}`}
                >
                  Edit
                </Link>
                <button
                  id={data._id}
                  onClick={this.deleteComment}
                  className="ml-2 mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <Link className="hover:underline" to={`/user/${data.author.id}`}>
                <p className="text-gray-700">{data.author.username}</p>
              </Link>
            </div>
          );
        }
      } catch (err) {}
    };

    const Comments = () => {
      try {
        let comments = this.state.Post.comments.map((comment) => {
          return (
            <div className="p-2 mt-2 bg-gray-300 rounded" key={comment._id}>
              <p className="text-gray-900">{comment.text}</p>
              {checkCommentOwnerShip(comment)}
            </div>
          );
        });
        return comments;
      } catch {
        window.location.href = "/404";
      }
    };

    const likes = () => {
      let likeCount = 0;
      try {
        let likes = this.state.Post.likes;
        likes.forEach((like) => {
          likeCount++;
        });
      } catch (err) {}
      return likeCount;
    };

    const LikeButtonCheck = () => {
      if (window.sessionStorage.getItem("loggedIn") === "True") {
        try {
          let LikeCheck = 0;
          this.state.Post.likes.forEach((like) => {
            if (window.sessionStorage.getItem("userId") === like.id) {
              LikeCheck++;
            }
          });
          if (LikeCheck > 0) {
            return (
              <button
                onClick={this.likePost}
                className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                UnLike
              </button>
            );
          } else {
            return (
              <button
                onClick={this.likePost}
                className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Like
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
        <div
          style={{ marginTop: "3rem" }}
          className="flex items-center justify-center min-h-full"
        >
          <div className="w-full sm:w-2/3 lg:w-2/5 py-6 px-3">
            {alert()}
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <img
                style={{ width: "100%" }}
                className="rounded-lg inline-block shadow-2xl"
                src={this.state.Post.image}
                alt=""
              />
              <div className="p-4">
                <p className="text-xl text-gray-800">{this.state.Post.name}</p>
                <p className="text-gray-700">{this.state.Post.description}</p>
                <Link
                  className="hover:underline"
                  to={`/user/${this.state.author.id}`}
                >
                  <p className="text-gray-900">{this.state.author.username}</p>
                </Link>
              </div>
              <div className="flex p-4 border-t border-gray-300 text-gray-700">
                <p className="ml-1 mr-1 text-blue-700 font-semibold py-1">
                  {likes()} Likes
                </p>
                {LikeButtonCheck()}
                {checkPostOwnerShip()}
              </div>
              <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
                <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">
                  Comments
                </div>
                <form onSubmit={this.addComment}>
                  <input
                    id="comment"
                    type="text"
                    className="Commentinput bg-gray-400"
                    onChange={this.handleChange}
                  />
                  <button className="CommentButton bg-gray-400">Add</button>
                </form>

                {Comments()}
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
