import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <h1>HOME PAGE</h1>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <h1>Search Page</h1>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <Signin />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
          </>
        )}

        <Route
          path="*"
          element={
            <Layout>
              <h1>ROUTE NOT FOUND...</h1>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
