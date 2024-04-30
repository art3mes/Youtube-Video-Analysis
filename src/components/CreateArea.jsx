import React, { useState } from "react";
import axios from 'axios';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import IMAGE from "../components/images/mainImage.png";
import DIVIDER from "../components/images/divider.png"
import EmbeddedVideo from './EmbeddedVideo';
import CanvasJSReact from '@canvasjs/react-charts';
import SuggestedVids from "./SuggestedVids";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CreateArea() {
    const [url, setURL] = useState({ content: "" });
    const [responseResult, setResponseResult] = useState(null);
    const [options, setOptions] = useState(null);
    const [showEmbeddedVideo, setShowEmbeddedVideo] = useState(false);
    const suggestedVideoURLs = ["https://www.youtube.com/watch?v=iRAXbyPUmMs", "https://www.youtube.com/watch?v=nFnytqPhH9E",
        "https://www.youtube.com/watch?v=S1tFT4smd6E", "https://www.youtube.com/watch?v=Xzv84ZdtlE0", "https://www.youtube.com/watch?v=iRAXbyPUmMs", "https://www.youtube.com/watch?v=nFnytqPhH9E",
        "https://www.youtube.com/watch?v=S1tFT4smd6E", "https://www.youtube.com/watch?v=Xzv84ZdtlE0"];

    function handleChange(event) {
        const { name, value } = event.target;
        setURL((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    async function sendData(event) {
        event.preventDefault();
        try {
            const response = await axios.get("http://localhost:8000/sentiment", {
                params: { URL: url.content }
            });
            console.log(url.content);
            console.log("Response:", response.data.Result);


            // Update the state with the response data
            setResponseResult(JSON.stringify(response.data.Result));
            setOptions(
                {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "Sentiment Analysis Result",
                        verticalAlign: "top", // Align title to the top
                        padding: 10, // Add margin (spacing) around the title
                        fontSize: 20,
                        fontColor: "#1B3C73",

                    },
                    axisY: {
                        includeZero: true,
                        maximum: 100, // Set the maximum scale to 100
                        gridThickness: 0.5, // Hide the grid lines on the Y-axis
                        tickLength: 0, // Hide the tick marks on the Y-axis
                    },
                    data: [{
                        indexLabelFontColor: "#5A5757",
                        indexLabelPlacement: "outside",
                        type: "column",
                        dataPoints: [
                            { label: "Positive", y: response.data.Result.positive, color: "#1EAE98" },
                            { label: "Neutral", y: response.data.Result.neutral, color: "#9AB3F5" },
                            { label: "Negative", y: response.data.Result.negative, color: "#FA7070" }
                        ]
                    }]
                }
            )
        } catch (error) {
            console.error("Error:", error.message);

            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
        }
        setShowEmbeddedVideo(true);
    }
    const renderSuggestedVideos = () => {
        return suggestedVideoURLs.map((videoURL, index) => (
            <SuggestedVids key={index} videoURL={videoURL} />
        ));
    };

    return (
        <div className="mainContent">
            <div className="mainContent-left">
                <div className="main-screen-image">
                    {showEmbeddedVideo ? (
                        <div className="embedVideo"><EmbeddedVideo videoUrl={url.content} /></div>
                    ) : (
                        <img src={IMAGE} alt="Logo" />
                    )}
                </div>
                <div className="main-body">
                    <form className="searchBar">
                        <textarea
                            onChange={handleChange}
                            value={url.content}
                            name="content"
                            placeholder="Enter the URL of the YouTube video"
                            rows={1}
                        />
                    </form>
                    <button className="form-button" onClick={sendData}><TroubleshootIcon /></button>
                </div>
                {responseResult && (
                    <div className="result">
                        <CanvasJSChart options={options} />
                    </div>
                )}
            </div>
            <div className="mainContent-middle">
                {/* <img src={DIVIDER} alt="divider" /> */}
            </div>
            <div className="mainContent-right">{renderSuggestedVideos()}</div>
        </div>
    );
}

export default CreateArea;

