import React from 'react';

const EmbeddedVideo = ({ videoUrl }) => {
  // Extract video ID from the URL
  const videoId = extractVideoId(videoUrl);
  console.log(videoId);
  // YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-container">
      {/* has a CSS */}
      <iframe
        width="630"
        height="332"
        src={embedUrl}
        title="Embedded YouTube Video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const extractVideoId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v(?:\/|=)|(?:.*\/)?))(.*?)(?:[&?].*)?$/);
  return match && match[1];
};
export default EmbeddedVideo;
