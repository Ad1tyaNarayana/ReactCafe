import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "https://cafereactserver.onrender.com/",
});

export default class Cafes extends Component {
  state = {
    Posts: [],
  };

  constructor() {
    super();
    this.getCafes();
  }

  getCafes = async () => {
    let data = await api.get("/links").then(({ data }) => data);
    if (this._mounted) {
      this.setState({ Posts: data });
    }
  };

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }
  render() {
    const Cafes = this.state.Posts.map((cafe) => {
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
    });
    return (
      <div>
        <div>
          <div
            style={{ height: "60vh", backgroundColor: "#32533d" }}
            className="bannerFondo bg-left-top bg-auto bg-repeat-x"
          ></div>
          <div className="-mt-64 ">
            <div className="w-full text-center">
              <h1 className="font-bold text-5xl text-white">Cafe React </h1>
            </div>
          </div>
          <section className="py-20">
            <div className="flex justify-evenly">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Cafes}
              </div>
            </div>
          </section>
        </div>
        <a rel="noreferrer" href="https://adityanarayana.netlify.app/">
          <p className="text-center text-gray-500 text-xs">© Aditya Narayana</p>
        </a>
      </div>
    );
  }
}
