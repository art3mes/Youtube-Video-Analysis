import React, {useState} from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from 'axios';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import IMAGE from "../components/tempImage.png";

function CreateArea(props) {
    const [note,
        setNote] = useState({title: "", content: ""});
    const [isCLicked,
        setClick] = useState(false);

    function handleChange(event) {
        const {name, value} = event.target;

        setNote((preValue) => {
            return {
                ...preValue,
                [name]: value
            };
        });
    }
    function addNote(event) {
        if (note.title !== "") {
            props.onAdd(note);
            
            sendData();
        }
        setNote({title: "", content: ""});
        event.preventDefault();
    }
    async function sendData() {
        try {
          const res = await axios.post("http://localhost:4000/", {
            //await axios.post("https://keeper-app-backend-dyr1.onrender.com", {
            title: note.title,
            content: note.content
          });
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      }
      
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
                    value={note.content}
                    name="content"
                    placeholder="Enter the URL of the youtube video"
                    rows={isCLicked
                    ? 2
                    : 1}/>
                <Zoom  in={isCLicked}>
                    <Fab onClick={addNote}><TroubleshootIcon/></Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
