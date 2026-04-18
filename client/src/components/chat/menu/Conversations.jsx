import { useEffect , useState, useContext} from "react"
import { getUsers } from "../../../service/api";
import {Box, styled, Divider} from '@mui/material';
import {AccountContext} from '../../../context/AccountProvider';

import Convo from "./Convo";

const Component = styled(Box)`
  height: 81vh;
  overflow:overlay;

`

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background: #e9edef;
  opacity: .6;
`

const Conversations = ({text}) => {

    const [users, setUsers] = useState([]);

    const {account, socket, setActiveUsers} = useContext(AccountContext);

useEffect(() => {
    const fetchData = async () =>{
      let response =  await getUsers();
      if (response && Array.isArray(response)) {
        const filteredUsers = response.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
        setUsers(filteredUsers);
      } else {
        setUsers([]);
      }
    }
    fetchData();
}, [text]);

useEffect(() => {
  socket.current.emit("addUsers", account);
  socket.current.on("getUsers", users => {
    setActiveUsers(users);
  })
}, [account])

  return (
    <Component>
      {
        users.map(user =>(
          user.sub!== account.sub &&
          <div key={user.sub}>
          <Convo user= {user}/>
          <StyledDivider/>
          </div>
        ))
      }
    </Component>
  )
}

export default Conversations
