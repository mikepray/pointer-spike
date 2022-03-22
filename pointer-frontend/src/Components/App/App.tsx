import React from 'react';
import { Outlet, Route, Routes } from 'react-router';
import NoPage from '../NoPage/noPage';
import Layout from '../Layout/layout';
import Contact from '../Contact/contact';

import Room from '../Room/Room';
import { BrowserRouter, Link } from 'react-router-dom';
import JoinRoom from '../JoinRoom/JoinRoom';
import { Anchor, AppShell, Header, MantineProvider, Navbar } from '@mantine/core';
import NavHeader from '../NavHeader/NavHeader';

function App() {
  return (
    <>
      <MantineProvider theme={{ colorScheme: 'light' }}>
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ base: 300 }} height={500} p="xs">
              <Navbar.Section mt="xs">
                <Anchor component={Link} to="/create">
                  Create a Room
                </Anchor>
              </Navbar.Section>
              <Navbar.Section mt="xs">
                <Anchor component={Link} to="/room">
                  Join a Room
                </Anchor>
              </Navbar.Section>
              <Navbar.Section mt="xs">
                <Anchor component={Link} to="/contact">
                  Contact Us
                </Anchor>
              </Navbar.Section>
            </Navbar>
          }
          header={<Header height={60} p="xs">{<NavHeader />}</Header>}
        // styles={(theme) => ({
        //   main: { backgroundColor: theme.colorScheme === 'light' ? theme.colors.dark[8] : theme.colors.gray[0] },
        // })}
        >{
            <Outlet />
          }
        </AppShell>
      </MantineProvider>

    </>

  );
}

export default App;
