import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { Home, CreatePost } from "./page";
import Gpt from "./page/Gpt";

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <div className="text-3xl font-extrabold">CelestaGen</div>
      </Link>
      <div>
        <Link
          to="/gpt"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md mr-4"
        >
          ConversaAI
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Generate Images
        </Link>
      </div>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/gpt" element={<Gpt />} />
      </Routes>
    </main>
    {/* <Gpt/> */}
  </BrowserRouter>
);

export default App;
