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
import { Hamburger } from '../Burger/Burger';

function App() {
  return (
    <>
      <MantineProvider theme={{ colorScheme: 'light' }}>
        <Hamburger />
        <AppShell
          padding="md"
          navbar={
            <Navbar width={{ base: 300 }} height={500} p="xs">
              <Navbar.Section mt="xs">
                <Anchor component={Link} to="/room">
                  Join a Room
                </Anchor>
              </Navbar.Section>
            </Navbar>
          }
          header={<Header height={60} p="xs">{<NavHeader />}</Header>}
        >{
            <Outlet />
          }
        </AppShell>
      </MantineProvider>

    </>

  );
}

export default App;
