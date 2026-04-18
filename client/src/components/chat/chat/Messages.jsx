import { Box,styled } from "@mui/material"

import Footer from "./Footer"
import Message from "./Message";

import { useContext, useEffect, useState, useRef } from "react";

import{AccountContext} from "../../../context/AccountProvider";

import {newMessage, getMessages} from "../../../service/api";

const Wrapper = styled(Box)`
background-image:url(${`https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png`});
`;
const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;
  
const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({person, conversation}) => {

  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  
 
  const [file, setFile] = useState();
  const [image, setImage] = useState('');
  const[incomingMessage, setIncomingMessage] = useState(null);


  const {account, socket, newMessageFlag, setNewMessageFlag} = useContext(AccountContext);

  useEffect(() =>{
    socket.current.on('getMessage', data => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now()
      });
      setNewMessageFlag(prev => !prev);
    });
  }, [socket])
  const scrollRef = useRef();

  useEffect(() => {
    const getMessageDetails = async() => {
      if(!conversation || !conversation._id) return;
      console.log('Fetching messages for conversation:', conversation._id);
      let data = await getMessages(conversation._id);
      console.log('Received messages:', data);  
      setMessages(data);
    }
    conversation && conversation._id && getMessageDetails();
  }, [person?._id, conversation?._id, conversation, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  useEffect(() => {
 incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
 setMessages(prev => [...prev, incomingMessage]);
  }, [incomingMessage, conversation])


const sendText = async(e) => {
    const code = e.keyCode || e.which;
    console.log('sendText called, keyCode:', code, 'file:', file, 'image:', image, 'value:', value);
    if(code === 13){
      let message={};
    
        if(!conversation || !conversation._id){
            console.log('Conversation not available');
            return;
        }
        if(!value || value.trim() === ''){
            return;
        }
          if (!file){
        message = {
          senderId:account.sub,
          receiverId:person.sub,
         conversationId:conversation._id,
         type:'text',
         text:value.trim()
        }
      }else {
        message = {
          senderId:account.sub,
          receiverId:person.sub,
         conversationId:conversation._id,
         type:'file',
         text:image
        }
      }


      socket.current.emit('sendMessage', message)


       await newMessage(message);

       // Add the new message to local state immediately
       setMessages(prev => [...prev, {...message, _id: Date.now().toString()}]);

       setValue('');
       setFile('');
       setImage('');
       setNewMessageFlag(prev => !prev);
    }
}

  return (
    <Box>
    <Wrapper>
      <Component>
         {
          messages && messages.map(message => (
            <Container key={message._id} ref={scrollRef}>
              <Message message={message}/>
            </Container>
          ))
         }
         </Component>
    </Wrapper>
      <Footer sendText={sendText}
      setValue={setValue}
      file={file}
      setFile={setFile}
      setImage={setImage}
      />
      
    </Box>
  )
}

export default Messages
