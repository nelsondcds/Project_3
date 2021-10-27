// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Container } from "semantic-ui-react";

// import "semantic-ui-css/semantic.min.css";
// import "./App.css";

// import { AuthProvider } from "./context/auth";
// import AuthRoutes from "./util/AuthRoute";

// import MenuBar from "./components/MenuBar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Container>
//           <MenuBar />
//           <Route exact path="/" component={Home} />
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/register" component={Register} />
//         </Container>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Navbar from "./pages/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Create from "./pages/Create";

import Auth from "./util/auth";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            {Auth.loggedIn() ? (
              <>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/create" component={Create} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/login" component={Dashboard} />
                <Route exact path="/register" component={Dashboard} />
                <Route component={Footer} />
              </>
            ) : (
              <>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Login} />
                <Route exact path="/create" component={Login} />
                <Route exact path="/favorites" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={Footer} />
              </>
            )}
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
