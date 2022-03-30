import { useState } from 'react';
import { Burger } from '@mantine/core';

export const Hamburger = () => {
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';

  return <>
    <Burger
      size="lg"
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
    />
    </>
}