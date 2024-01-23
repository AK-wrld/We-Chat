"use client";
import { Avatar, Badge, Box, Grid, Tab, Tabs} from '@mui/material'
import React,{ ReactNode, useEffect, useState} from 'react'
import SearchBar from '../../../../Components/Dashboard/SearchBar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfileAvatar from '../../../../Components/Dashboard/ProfileAvatar';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import CallIcon from '@mui/icons-material/Call';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import SearchBox from '../../../../Components/Dashboard/SearchBox';
import Contacts from '../../../../Components/Dashboard/Contacts';
import Groups from '../../../../Components/Dashboard/Groups';
import Calls from '../../../../Components/Dashboard/Calls';
import { StyledGrid } from '../../../../StyledComponents/Styled';
type LayoutProps = {
    children: ReactNode;
  };
const Layout = ({children}:LayoutProps) => {
    const [value, setValue] = useState(0);
  const [open,setOpen] = useState(false);
  const [searchVal,setSearchVal] = useState('');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue)
    setValue(newValue);
  };
  useEffect(()=> {
    console.log(open)
  },[open])
  return (
    <>
        <Grid container>
    <Grid item xs={4} >
      <Box sx={{ flexGrow: 1,height:"100px" }}>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:'space-around'}}>
      <Avatar src='/logo.png'></Avatar>
      <SearchBar setOpen={setOpen} searchVal={searchVal} setSearchVal={setSearchVal}/>
      <Badge badgeContent={4} color="success">
      <NotificationsIcon color="action" />
    </Badge>
      <ProfileAvatar/>
      </Box>
      <TabContext value={value.toString()}>
      <Tabs value={value} onChange={handleChange} variant='fullWidth' textColor={'secondary'} indicatorColor={'secondary'} sx={{justifyContent:"space-around"}} aria-label="icon label tabs example">
        <Tab icon={<PersonIcon />} label="PERSON" value={0} />
        <Tab icon={<GroupsIcon />} label="GROUPS" value={1} />
        <Tab icon={<CallIcon />} label="CALL LOGS" value={2} />
      </Tabs>
      <TabPanel value="0">
        <SearchBox open={open} value={value} setOpen={setOpen}/>
        <Contacts/>
      </TabPanel>
      <TabPanel value="1">
      <SearchBox open={open} value={value} setOpen={setOpen}/>
        <Groups/>
      </TabPanel>
      <TabPanel value="2">
      <SearchBox open={open} value={value} setOpen={setOpen}/>
       <Calls/>
      
      </TabPanel>
    </TabContext>
        </Box>
    </Grid>
    <StyledGrid item xs={8}>
    {children}
    </StyledGrid>
    </Grid>
    </>
  )
}

export default Layout