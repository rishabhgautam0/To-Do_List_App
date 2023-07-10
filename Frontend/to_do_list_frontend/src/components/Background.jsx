import React from 'react';
import video from "../asset/video/bg-video.mp4";

const Background = () => {
  return (
    <div><video autoplay muted loop id="background-video" src={video}>
</video></div>
  )
}

export default Background;