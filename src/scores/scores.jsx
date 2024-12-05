import React from 'react';

import './scores.css';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);

  // Demonstrates rendering an array with React
  // const scoreRows = [];
  // if (scores.length) {
  //   for (const [i, score] of scores.entries()) {
  //     scoreRows.push(
  //       <tr key={i}>
  //         <td>{i}</td>
  //         <td>{score.name.split('@')[0]}</td>
  //         <td>{score.score}</td>
  //         <td>{score.date}</td>
  //       </tr>
  //     );
  //   }
  // } else {
  //   scoreRows.push(
  //     <tr key='0'>
  //       <td colSpan='4'>Be the first to score</td>
  //     </tr>
  //   );
  // }

  return (
    <main>
          <span id="top-secret">
            <img src="Top_Secret.png" alt="Top Secret" width="600" height="100" />
          </span>
            <div style="position: relative; display: flex; align-items: center;">
            <h1 style="position: absolute; z-index: 1; margin: 0;">Open Your Eyes</h1>
            </div>
            <div>
                <form id="home-search">
                    <div className="form-group">
                      <input className="form-control" id="theme_input_field" placeholder="Enlighten me about..." />
                    </div>
                    <button type="submit" href="generator.html" class="btn btn-primary" id="show-me-btn">Show Me</button>
                  </form>
            </div>

            <div id="recent-disc-sec">
                <h2 id="recent-disc-text">Recent Discoveries</h2>
                <div className="theory-text">
                  <h3>Area 51</h3>
                  <p>Area 51 is a top-secret military base in the Nevada desert. It is the most famous secret military installation in the world. The base has been shrouded in secrecy, with many conspiracy theories surrounding its purpose. Some believe that the base is used to store and study alien technology, while others think it is a testing ground for experimental aircraft. The truth is still unknown, as the US government has never officially acknowledged the base's existence.</p>  
                </div>
                <div className="theory-text">
                  <h3>Chemtrails</h3>
                  <p>Chemtrails are the white streaks that form behind airplanes in the sky. Some believe that these streaks are actually chemicals being sprayed into the atmosphere for nefarious purposes. The most common theory is that the government is using chemtrails to control the weather or manipulate the population. However, scientists have debunked these claims, stating that chemtrails are simply contrails, which are formed when water vapor condenses and freezes in the cold air at high altitudes.</p>  
                </div>
                <div className="theory-text">
                  <h3>Flat Earth</h3>
                  <p>The flat Earth theory is the belief that the Earth is flat, rather than a sphere. This theory has been around for centuries, but has gained popularity in recent years due to the rise of the internet and social media. Proponents of the flat Earth theory claim that the Earth is a disc, with the North Pole at the center and the continents spread out around it. However, this theory has been debunked by scientists, who have provided overwhelming evidence that the Earth is round.</p>  
                </div>
            </div>
        </main>
    
  );
}
