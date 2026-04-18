import {Box, Typography, styled} from '@mui/material'
import { Search, MoreVert } from '@mui/icons-material'
import { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider'

const HeaderBox = styled(Box)`
  height: 44px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #e9edef;
  background-color: #ededed;
`
const Image = styled('img')({
  width: 40,
  height: 40,
  objectFit: 'cover',
  borderRadius: '50%',
  marginRight: 15,
});

const NameContainer = styled(Box)`
  flex: 1;
`;

const Name = styled(Typography)`
  font-weight: 500;
  font-size: 16px;
  color: #111b21;
  line-height: 1.2;
`;

const Status = styled(Typography)`
  font-weight: 400;
  font-size: 13px;
  color: #667781;
  line-height: 1.2;
`;

const RightContainer = styled(Box)`
  display: flex;
  align-items: center;
  & > svg {
    padding: 8px;
    font-size: 24px;
    color: #54656f;
    cursor: pointer;
    &:hover {
      color: #128c7e;
      background-color: #f0f2f5;
      border-radius: 50%;
      transition: all 0.2s ease;
    }
  }
`;

const ChatHeader = ({person }) => {

const {activeUsers} = useContext(AccountContext);
  return (
    <HeaderBox>
      <Image src={person.picture} alt="dp"/>
      <NameContainer>
        <Name>{person.name}</Name>
        <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'online' : 'offline'}</Status>
      </NameContainer>
      <RightContainer>
        <Search/>
        <MoreVert/>
      </RightContainer>
    </HeaderBox>
  )
}

export default ChatHeader