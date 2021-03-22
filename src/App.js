import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Users from "./components/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          {/* <Route exact path="/" component={App} /> */}
          <section className="container">
            <Switch>
              <Route exact path="/" component={Register} />
              <Route exact path="/users" component={Users} />
            </Switch>
          </section>
        </div>
      </Router>
 
    </>
  );
}

export default App;
