import { Box, Typography, styled } from "@mui/material"
import { defaultProfilePicture } from "../../../constants/data.js"

import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { setConversation, getConversation } from "../../../service/api";
import {formatDate} from "../../utils/common-utils"


const Component = styled(Box)`
   display: flex;
   height: 45px;
   padding: 13px 0;
   cursor: pointer;
`;

const Image = styled('img')({
    width:50,
    height:50,
    borderRadius:'50%',
    padding:'0 14px',   
    objectFit:'cover'
})

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const TimeStamp = styled(Typography)`
  font-size: 12px;
  color: #00000099;
  margin-left: auto;
  margin-right:20px;
`;
const  Text = styled(Typography)`
  font-size: 14px;
  color: rgba(0,0,0,0.6);
`;

const Convo = ({user}) => {
  const {setPerson, account, newMessageFlag} = useContext(AccountContext);
  const [message, setMessages] = useState({});


  useEffect(()=>{
    const getConversationDetails = async () => {
      if (!account?.sub || !user?.sub) return;
      console.log('Convo fetching for user:', user.sub, 'newMessageFlag:', newMessageFlag);
      const data = await getConversation({senderId: account.sub, receiverId: user.sub});
      console.log('Convo received data:', data);
      setMessages({text: data?.messages, timestamp: data?.updatedAt});
    }
    getConversationDetails();
  }, [newMessageFlag, account?.sub, user?.sub])


  const getUser = async () =>{    
    setPerson(user);
    await setConversation({senderId: account.sub, receiverId: user.sub})
  }


  const picture = user?.picture || defaultProfilePicture;
  return (
   <Component onClick = {() => getUser()}>
    <Box>
        <Image src={picture} alt= "dp"/>
    </Box>  
    <Box style = {{width:'100%'}}>
        <Container>
            <Typography>{user.name}</Typography>
            {
                message?.text &&
                <TimeStamp>{formatDate(message?.timestamp)}</TimeStamp>
            }
        </Container>
        <Box>
            <Text>{message?.text?.includes('localhost')? 'media': message?.text}</Text>
        </Box>
    </Box>
   </Component>
  )
}

export default Convo
