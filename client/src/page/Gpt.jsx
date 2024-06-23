import React, { useState } from "react";
import "../App.css";
import lens from "../assets/lens.png";
import loadingGif from "../assets/loading.gif";

function Gpt() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const sendPrompt = async () => {
    if (prompt.trim() === "") {
      setAnswer("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      };

      const response = await fetch("http://localhost:9000/ask", requestOptions);

      console.log(response);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { message } = await response.json();
      console.log(message);
      setAnswer(message);
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app bg-transparent min-h-[80vh] border">
      <div className="app-container">
        <div className="spotlight__wrapper">
          <input
            type="text"
            className="spotlight__input"
            placeholder="Ask me anything..."
            disabled={loading}
            style={{
              backgroundImage: loading ? `url(${loadingGif})` : `url(${lens})`,
            }}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
          />
          {error && <div className="error">{error}</div>}
          <div className="spotlight__answer">{answer && <p>{answer}</p>}</div>
        </div>
      </div>
    </div>
  );
}

export default Gpt;
