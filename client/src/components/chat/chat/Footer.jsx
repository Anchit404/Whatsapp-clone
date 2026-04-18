import { Box,styled } from "@mui/material"
import{EmojiEmotionsOutlined,AttachFile, Mic} from '@mui/icons-material'
import {InputBase} from '@mui/material'
import {useEffect} from "react";
import { uploadFile } from '../../../service/api'; 


const Container = styled(Box)`
height:55px;
background-color:#f0f2f5;
display:flex;
width:100%;
justify-content:space-between;
align-items:center;
padding:0 16px;
&>*{
    color:#54656f;
    margin:0 8px;
    cursor:pointer;
   
}
`;

const Search=styled(Box)`
background-color:#ffffff;
border-radius:18px;
width:calc(100% - 120px);
padding:0 15px;
display:flex;
align-items:center;
border:1px solid #e9edef;
`;

const Input=styled(InputBase)`
width:100%;
font-size:15px;
color:#3b4a54;
&::placeholder{
    color:#8696a0;
}
& input{
    padding:8px 0;
    font-size:15px;
}
`;

const ClipIcon=styled(AttachFile)`
transform:rotate(45deg);
font-size:24px;
`;

const EmojiIcon=styled(EmojiEmotionsOutlined)`
font-size:24px;
`;

const MicIcon=styled(Mic)`
font-size:20px;
margin-right:40px;
`;


const Footer = ({sendText, setValue, value, file, setFile, setImage}) => {

    useEffect(() => {
       const getImage = async () => {
        if (file){
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            
            let response = await uploadFile(data);
            setImage(response);
        }
       }
       getImage();
    }, [file]);

   const onFileChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);
};

    return (
        <Container>
            <EmojiIcon/>
           <label htmlFor="fileInput">
            <ClipIcon />
             </label>
             <input id="fileInput" type="file" 
             style={{display:'none'}}
             onChange={(e) => onFileChange(e)}
             />
            
           
            <Search>
                <Input
                 placeholder={"Type a message"} 
                onChange={(e)=>setValue(e.target.value)}
                onKeyPress={(e) => sendText(e)}
                value={value}
                />
            </Search>
            <MicIcon/>
        </Container>
    )
}
export default Footer