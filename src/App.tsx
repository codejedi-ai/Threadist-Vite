import { h } from "preact";
import Router from "preact-router";
import Home from "./pages/Home";
import Navbar from "./components/navbar";

import LeftSidebar from "./components/sidebar/LeftSidebar";
function About(props: { path?: string }) {
  return <h1>{props.path} Welecome to the about page</h1>;
}

export default function App() {
  return (
    <div id="app">
      <Navbar />
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </div>
  );
}
