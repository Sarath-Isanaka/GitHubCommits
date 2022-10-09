import React, { useEffect, useRef } from "react";
import { Octokit } from "@octokit/core";
import "./home.css";
import { useState } from "react";
import moment from "moment";

function Home() {
  const [commitData, setCommitData] = useState([]);
  const [count, setCount] = useState(30);
  const [token, setToken] = useState("");
  const tokenRef = useRef();

  useEffect(() => {
    fetchPersonalTokenFromStorage();
    token && fetchGitData();
  }, [token]);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    } else {
      fetchGitData();
      setCount(30)
    }
  }, [count]);

  async function fetchPersonalTokenFromStorage() {
    const localToken = await localStorage.getItem("personal token");
    await setToken(localToken);
  }

  function tokenSubmitHandler(e) {
    localStorage.setItem("personal token", tokenRef.current.value);
    setToken(tokenRef.current.value);
  }

  async function fetchGitData() {
    const octokit = new Octokit({
      auth: `${token}`,
    });

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: "Sarath-Isanaka",
        repo: "GitHubCommits",
      }
    );
    await setCommitData([...response.data]);
  }

  return (
    <React.Fragment>
      {token ? (
        <div className="center">
          {commitData.map((commit, index) => (
            <React.Fragment key={index}>
              <div className="container">
                <h3>{commit.commit.message}</h3>
                <p>
                  {moment(commit.commit.committer.date).format("LLL")}{" "}
                  <b>by {commit.commit.committer.name}</b>{" "}
                </p>
              </div>
              <div className="gradient"></div>
            </React.Fragment>
          ))}
          <div>
            <button onClick={fetchGitData}>Refresh Commits</button>
            <span className="counter">{count}</span>
          </div>
        </div>
      ) : (
        <div className="inputToken">
          <h2 className="tokenHeader">Personal Token Key</h2>
          <input ref={tokenRef}></input>
          <button onClick={tokenSubmitHandler}>Submit</button>
        </div>
      )}
    </React.Fragment>
  );
}

export default Home;
