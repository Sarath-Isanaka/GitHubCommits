import React, { useEffect } from "react";
import { Octokit } from "@octokit/core";
import "./home.css";
import { useState } from "react";
import moment from 'moment'

function Home() {
  const [commitData, setCommitData] = useState([]);
  const octokit = new Octokit({
    auth: `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`,
  });

  useEffect(() => {
    fetchGitData();
  }, []);

  async function fetchGitData() {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: "Sarath-Isanaka",
        repo: "Covid-Tracker",
      }
    );
    console.log(response.data);
    console.log(response.data[0].commit.message);
    console.log(response.data[0].commit.committer.date)
    var a = await moment(response.data[0].commit.committer.date).format('LLL')
    console.log(a)
    await setCommitData([...response.data]);
  }
  return (
    <React.Fragment>
      <div className="center">
        {commitData.map((commit) => (
          <>
          <h2>{commit.commit.message}</h2>
          <p>{moment(commit.commit.committer.date).format('LLL')} <b>by {commit.commit.committer.name}</b> </p>
          </>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Home;
