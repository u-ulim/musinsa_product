import React, { useState } from "react";
// import Home from "./pages/Home";
// import About from "./pages/About";
import { styled, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProductAll from "./pages/ProductAll";
import ProductDetail from "./pages/ProductDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
const GlobalStyles = createGlobalStyle`

  ${reset}

  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout authenticate={authenticate} setAuthenticate={setAuthenticate} />
      ), // 여기에서 Layout 내부에 중복된 Router가 없는지 확인
      children: [
        {
          // path: "/",
          index: true,
          element: <ProductAll />,
        },
        {
          path: "/login",
          element: (
            <Login
              authenticate={authenticate}
              setAuthenticate={setAuthenticate}
            />
          ),
        },
        {
          path: "/products/:id",
          element: <PrivateRoute authenticate={authenticate} />,
        },
      ],
    },
  ]);

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} /> {/* 여기에만 Router 사용 */}
    </>
  );
}

export default App;
