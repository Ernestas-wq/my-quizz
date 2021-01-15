import React from 'react';
import { FaHome } from 'react-icons/fa';
import { GiNetworkBars } from 'react-icons/gi';

export const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
    icon: <FaHome />,
  },
  {
    id: 2,
    url: '/highscores',
    text: 'highscores',
    icon: <GiNetworkBars />,
  },
];
