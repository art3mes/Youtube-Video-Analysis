import React, {useState} from "react";

const extractVideoId = (url) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v(?:\/|=)|(?:.*\/)?))(.*?)(?:[&?].*)?$/);
  return match && match[1];
};


const SuggestedVids =  ({videoURL}) => {
  // Extract video ID from the URL
  const videoId = extractVideoId(videoURL);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const videoCOPYURL = `https://www.youtube.com/watch?v=${videoId}`;
  
    // Function to handle copy-to-clipboard
//   const copyToClipboard = () => {
//         // Create a new textarea element (off-screen)
//         const textarea = document.createElement('textarea');
//         textarea.value = videoCOPYURL;
//         document.body.appendChild(textarea);

//         // Select the textarea and copy the text
//         textarea.select();
//         document.execCommand('copy');

//         // Clean up: remove the textarea from the DOM
//         document.body.removeChild(textarea);

//         // Optionally provide user feedback (e.g., alert or toast)
//         alert('URL copied to clipboard!');
//     };
const copyToClipboard = () => {
  const videoCOPYURL = `https://www.youtube.com/watch?v=${videoId}`;

  // Create a new textarea element (off-screen)
  const textarea = document.createElement('textarea');
  textarea.value = videoCOPYURL;
  document.body.appendChild(textarea);

  // Select the textarea and copy the text
  textarea.select();
  document.execCommand('copy');

  // Clean up: remove the textarea from the DOM
  document.body.removeChild(textarea);

  // Show tooltip "copied" above the pointer
  const tooltip = document.createElement('div');
  tooltip.textContent = 'Copied';
  tooltip.style.position = 'absolute';
  tooltip.style.top = `${window.event.clientY - 30}px`; // Position above the pointer
  tooltip.style.left = `${window.event.clientX}px`; // Align with the pointer
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Black background with opacity
  tooltip.style.color = 'white';
  tooltip.style.padding = '4px 8px';
  tooltip.style.borderRadius = '4px';
  tooltip.style.zIndex = '9999';
  document.body.appendChild(tooltip);

  // Automatically hide the tooltip after a brief interval (e.g., 1 second)
  setTimeout(() => {
    document.body.removeChild(tooltip);
  }, 1000); // Adjust the duration as needed (1000 milliseconds = 1 second)
};


    return (
        <div className="suggestedVideo-body"> {/* has a CSS */}
            <div className="suggestedVideo">
                <iframe
                width="350"
                height="180"
                src={embedUrl}
                title="Embedded YouTube Video"
                allowFullScreen
            ></iframe>
            </div>
            <div className="suggestedVideoURL" onClick={copyToClipboard}>{videoCOPYURL}</div>
        </div>
    );
}

export default SuggestedVids;