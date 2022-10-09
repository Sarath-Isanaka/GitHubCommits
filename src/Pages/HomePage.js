import React, { useEffect } from "react";
import { Octokit } from "@octokit/core";
import "./home.css";

function Home() {
  const octokit = new Octokit({ auth: `` });
  
  useEffect(() => {
    fetchGitData();
  }, []);

  async function fetchGitData(){
    const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: 'Sarath-Isanaka',
      repo: 'Covid-Tracker'
    })
    console.log(response)
  }
  return (
    <React.Fragment>
      <div className="center">

      </div>
    </React.Fragment>
  );
}

export default Home;
