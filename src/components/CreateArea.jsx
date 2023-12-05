import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from 'axios';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import IMAGE from "../components/tempImage.png";
import EmbeddedVideo from './EmbeddedVideo';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function CreateArea(props) {
    const [url, setURL] = useState({ content: "" });
    const [isClicked, setClicked] = useState(false);
    const [responseResult, setResponseResult] = useState(null);
    const [options,setOptions]=useState(null);

    function handleChange(event) {
        const { name, value } = event.target;

        setURL((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    async function sendData() {
        try {
            const response = await axios.get("http://localhost:8000/sentiment", {
                params: { URL: url.content }
            });
            console.log(url.content);
            console.log("Response:", response.data.Result);

            // Update the state with the response data
            setResponseResult(JSON.stringify(response.data.Result));
            setOptions(
                {animationEnabled: true,
                        theme: "light2",
                title: {
                    text: "Semantic Analysis Result"
                },
                axisY: {
                    includeZero: true,
                    maximum: 100, // Set the maximum scale to 100
                },
                data: [{
                    indexLabelFontColor: "#5A5757",
                            indexLabelPlacement: "outside",
                    type: "column",
                    dataPoints: [
                    { label: "Positive",  y: response.data.Result.positive },
                    { label: "Neutral", y: response.data.Result.neutral  },
                    { label: "Negative", y:response.data.Result.negative  }
                    ]
                }]}
            )
        } catch (error) {
            console.error("Error:", error.message);

            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
        }
    }

    function handleClick() {
        setClicked(true);
    }

    return (
        <div className="mainContent">
            <div className="main-screen-image"><img src={IMAGE} alt="Logo" /></div>
            <form className="create-note">
                <textarea
                    onChange={handleChange}
                    onClick={handleClick}
                    value={url.content}
                    name="content"
                    placeholder="Enter the URL of the YouTube video"
                    rows={isClicked ? 2 : 1}
                />
                <Zoom in={isClicked}>
                    <Fab onClick={sendData}><TroubleshootIcon /></Fab>
                </Zoom>
            </form>
            <div className="result">
                {responseResult && <div><EmbeddedVideo videoUrl={url.content} /><CanvasJSChart options = {options}/></div>}
            </div>
        </div>
    );
}

export default CreateArea;
