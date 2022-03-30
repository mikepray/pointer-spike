import { useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { Anchor, AppShell, Burger, Header, MantineProvider, MediaQuery, Navbar, Text } from '@mantine/core';

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
            width={{ sm: 100, lg: 300, md: 200}}
            >
            <Navbar.Section mt="xs">
              <Anchor component={Link} to="/room">
                Join a Room
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

              <Text>Planning Poker</Text>
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
