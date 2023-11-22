import React, {useState} from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from 'axios';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import IMAGE from "../components/tempImage.png";

function CreateArea(props) {
    const [url,
        setURL] = useState({content: ""});
    const [isCLicked,
        setClick] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;

        setURL((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    }
    // function addNote(event) {
    //     if (url.content !== "") {
    //         props.onAdd(url);
            
    //         sendData();
    //     }
    //     setURL({content: ""});
    //     event.preventDefault();
    // }
    // async function sendData() {
    //     try {
    //   //const res = await axios.post("http://localhost:3001/recieve", {
        
    //     const res = await axios.post("http://localhost:8000/sentiment?URL=", {
    //     //await axios.post("https://minor-project-backend-d9m5.onrender.com", {
    //         content: url.content
    //       });
    //     console.log(res);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    async function sendData() {
        // try {
        //     const response = await axios.post("http://localhost:8000/sentiment?URL=", {
        //         content: url.content
        //     });

        //     console.log("Response:", response.data);
        // } catch (error) {
        //     console.error("Error:", error.message);

        //     if (error.response) {
        //         console.error("Response data:", error.response.data);
        //         console.error("Response status:", error.response.status);
        //         console.error("Response headers:", error.response.headers);
        //     }
        // }
    }

      //PLEASE SOMEONE KILL ME IVE HAD ENOUGH
    function handleClick() {
        setClick(true);
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
                    placeholder="Enter the URL of the youtube video"
                    rows={isCLicked
                    ? 2
                    : 1}/>
                <Zoom  in={isCLicked}>
                    <Fab onClick={sendData}><TroubleshootIcon/></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;