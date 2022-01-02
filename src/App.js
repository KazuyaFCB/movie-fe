import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";


function App() {
  const ffmpeg = createFFmpeg({
    //corePath: "./node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
    corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
    //corePath: "https://unpkg.com/@ffmpeg/ffmpeg@0.9.0/dist/ffmpeg.min.js",
    //corePath: "ffmpeg-core.js",
    //corePath: "http://localhost:3000/public/ffmpeg-core.js",
    log: true
  });
  const videoUrl =
    '"https://rr3---sn-4g5e6nsz.googlevideo.com/videoplayback?expire=1641151414&ei=VqfRYb6sDoSO1gLhlr6ICg&ip=116.202.238.188&id=o-AFImcDyGKltVbSMMwmea-ok_txz6pgzJxJKTB6sXSTyq&itag=299&aitags=133%2C134%2C135%2C136%2C160%2C242%2C243%2C244%2C247%2C278%2C298%2C299%2C302%2C303&source=youtube&requiressl=yes&mh=tu&mm=31%2C29&mn=sn-4g5e6nsz%2Csn-4g5edn6r&ms=au%2Crdu&mv=u&mvi=3&pl=24&vprv=1&mime=video%2Fmp4&ns=BkaRdBidT555k27OW-49Kd0G&gir=yes&clen=10828889&otfp=1&dur=30.433&lmt=1625360743720869&mt=1641129507&fvip=3&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=6216224&n=U0jcRn6vthGo5t3f&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cotfp%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAJPOThL595H_c3A_f8HjWe9iiSBzYF_Tc1yyobbUuWB6AiAsBlOog-R80X-WrrGdDc9o1atxw7D9Ejnr5S74o8BRaQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AG3C_xAwRgIhAK_uAxQvxv00k_AzHHpoh1j4KlmslWKHPQEjzyrKI-L0AiEAyTN7tJecvweiC6jWWuuEbNuHiH9yYgrh9doJCiiTL-E%3D"';
  const audioUrl =
    '"https://rr3---sn-4g5e6nsz.googlevideo.com/videoplayback?expire=1641151414&ei=VqfRYb6sDoSO1gLhlr6ICg&ip=116.202.238.188&id=o-AFImcDyGKltVbSMMwmea-ok_txz6pgzJxJKTB6sXSTyq&itag=140&source=youtube&requiressl=yes&mh=tu&mm=31%2C29&mn=sn-4g5e6nsz%2Csn-4g5edn6r&ms=au%2Crdu&mv=u&mvi=3&pl=24&vprv=1&mime=audio%2Fmp4&ns=BkaRdBidT555k27OW-49Kd0G&gir=yes&clen=494184&otfp=1&dur=30.487&lmt=1625360723347068&mt=1641129507&fvip=3&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=6211224&n=U0jcRn6vthGo5t3f&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cotfp%2Cdur%2Clmt&sig=AOq0QJ8wRQIgMUvIMaFc6QVKQ38iHVIuu3k7MUT1bSFlc0uOmel9B0ECIQDgUI4xtBqZZTXo01bu9OWCak9zX81yTz6OXzRHSBYMDg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AG3C_xAwRgIhAK_uAxQvxv00k_AzHHpoh1j4KlmslWKHPQEjzyrKI-L0AiEAyTN7tJecvweiC6jWWuuEbNuHiH9yYgrh9doJCiiTL-E%3D"';

  async function doTranscode() {
    //console.log("dirname: " + __dirname);
    await ffmpeg.load();
    console.log("ready");

    // mergeMedia(videoUrl, audioUrl, "/test.mp4", function (err) {
    //   if (!err) console.log("conversion complete");
    // });

    //await runCommand();


    await ffmpeg.run("-ss","3","-i", videoUrl,"-ss","3","-i",audioUrl,
      "-c","copy","-map","0:0","-map","1:0","-to","20","output.mp4");

    //await ffmpeg.run("-i", "https://www.youtube.com/watch?v=RWo5Z66VIWY", "output.mp4");
    const data = ffmpeg.FS("readFile", "output.mp4");
    //let data = await fetchFile(videoUrl);

    console.log("run successfully");
    const video = document.getElementById("player");
    video.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    //process.exit(0);
  }

  useEffect(() => {

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={doTranscode}>Start</button>
          <video id="player" controls></video>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
