import {InputBase, Box, styled} from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"


const Component = styled(Box)`
   background: #fff;
   height: 40px;
   border-bottom: 1px solid #F2F2F2;
   display: flex;
   aling-items: center;
`

const Wrapper = styled(Box)`
   background-color: #f0f2f5;
   position: relative;
   margin: 0 22px;
   width: 100%;
   border-radius: 10px
`

const Icon = styled(Box)`
   position: absolute;
   height: 100%;
   padding: 10px 10px;
   color: #919191;
`

const InputFeild = styled(InputBase)`
   width: 100%;
   padding: 16px;
   padding-left: 55px;
   height: 40px;
   font-size: 14px;

`

const Search = ({setText}) => {
  return (
    <Component>
        <Wrapper>
            <Icon>
                <SearchIcon  
                fontSize="small"/>
            </Icon>
            <InputFeild  placeholder = "Search or start a new chat" onChange={(e) => setText(e.target.value)}/>  
        </Wrapper>
      
    </Component>
  )
}

export default Search
