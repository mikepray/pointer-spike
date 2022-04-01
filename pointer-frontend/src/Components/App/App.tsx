import { useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { Anchor, AppShell, Burger, Center, Header, MantineProvider, MediaQuery, Navbar, Space, Text, ThemeIcon } from '@mantine/core';
import SaiLogo from './SAI_temp-logo_dteal.svg'
import MeetupLogo from './Turq_Meetups_1.svg'

import './App.css';

const App = () => {

  const [burgerOpened, setBurgerOpened] = useState(false);

  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        padding="md"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!burgerOpened}
            width={{ sm: 100, lg: 300, md: 200 }}
          >
            <Navbar.Section mt="xs">
              <Anchor component={Link} to="/poker/room">
                {/* <img className="Meetup-icon" src={MeetupLogo} /> */}
                <Center>
                <ThemeIcon variant="outline" size="lg">
                  <img src={MeetupLogo} />
                </ThemeIcon>
                <Space w="xs" />
                Join a Room
                </Center>
              </Anchor>
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={burgerOpened}
                  onClick={() => setBurgerOpened((o) => !o)}
                  size="sm"
                  mr="xl"
                />
              </MediaQuery>
              <img className="App-logo" src={SaiLogo} />
              <Space w="md" />
              <Text size="xl">Planning Poker</Text>
            </div>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
