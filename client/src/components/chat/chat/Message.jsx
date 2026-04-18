import {useContext} from "react";
import { Box, Typography, styled } from "@mui/material";
import { formatDate, downloadMedia } from "../../utils/common-utils";
import { AccountContext } from "../../../context/AccountProvider";
import GetAppIcon from '@mui/icons-material/GetApp';
import {iconPdf} from '../../../assets/icons';

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left:auto;
  padding:5px;
  width:fit-content;
  display:flex;
  border-radius:10px;
  word-break:break-word;

`
const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;

  padding:5px;
  width:fit-content;
  display:flex;
  border-radius:10px;
  word-break:break-word;
  `;

  const Text = styled(Typography)`
    font-size: 14px;
    padding: 0 25px 0 5px;
    word-break: break-word;
  `;

const Time = styled(Typography)`
    font-size: 10px;
    padding: 0 25px 0 5px;
    color:#919191;
    margin-top:6px;
    opacity: 0.7;
    word-break:keep-all;
`;

export const Message = ({message}) => {
    const {account} = useContext(AccountContext);
    console.log('Account sub:', account?.sub, 'Message senderId:', message.senderId, 'Match:', account?.sub === message.senderId);
    return (
        <>
        {
            account?.sub === message.senderId ? 
                <Own>
                {
                    message.type === 'file' ?<ImageMessage message = {message}/> : <TextMessage message={message} />
                }
                    
                </Own>
           :
             <Wrapper>
                {
                    message.type === 'file' ?<ImageMessage message = {message}/> : <TextMessage message={message} />
                }
                </Wrapper>
           
}
        </>

    )

}
const ImageMessage = ({message}) =>{
    return(
        <Box style={{position:'relative'}}>
            {
                message?.text?.includes('.pdf') ? 
                <Box style={{display:'flex', alignItems:'center', gap:10}}>
                    <img src={iconPdf} alt="pdf"  style={{width: 80}}/>
                    <Typography style={{fontSize:14}}>{message.text.split('/').pop()}</Typography>
                    </Box> : 
                <img style={{maxWidth:'300px', maxHeight:'200px', objectFit:'cover'}} src={message.text} alt="message" />
            }
            <Time style={{position:'absolute', bottom:0, right:0}}>
                <GetAppIcon
                onClick={(e) => downloadMedia(e,message.text)}
                style={{marginRight:10, border:'1px solid #919191', borderRadius:5, padding:2,fontSize:'12px'}}
                />
                {formatDate(message.createdAt)}</Time>
        </Box>
    )
}
const TextMessage = ({message}) => {
    return (
        <>
            <Text>{message.text}</Text>
            <Time>{formatDate(message.createdAt)}</Time>
        </>
    )
}

export default Message;