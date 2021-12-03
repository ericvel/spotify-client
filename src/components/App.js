import React, { useEffect, useState } from "react";

const style = {
  maxWidth: "1440px",
  margin: "auto",
  fontFamily: "sans-serif"
};

function App() {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    getTopTracks();
  }, []);

  const getTopTracks = () => {
    fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0",
      {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer BQAmcw8RD79jKTJBGq_ptNspOb169kNZXCiWBIjVg_R-aF3J9iiGCXGfgsadXQsPj15WV6hXhdtB-YCn85i2YI6AidIw8agP26u-Y0OP9-vcpiXvC0Hb9ZoR1TZCaSpCNlYM39ZpgoA5IaaAHyzN",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let tracks = [];
        data.items.forEach((track) => {
          // const artistName = track.artists.join();
          const trackName = track.name;
          const artists = [];
          track.artists.forEach((artist) => artists.push(artist.name));

          const trackObj = { name: trackName, artists: artists.join(", ") };
          console.log(trackObj);
          tracks.push(trackObj);
        });
        // console.log(data.items)

        setTopTracks(tracks);
      })
      .catch((error) => console.log("There was an error: ", error));
  };

  return (
    <div style={style}>
      <h1>Top 50 tracks - last 6 months</h1>
      {topTracks.map((track, index) => (
        <p key={index}>
          {index + 1}. {track.name} - {track.artists}
        </p>
      ))}
    </div>
  );
}

export default App;
