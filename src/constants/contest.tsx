'use client';

import BlueLogoIcon from 'assets/contestLabels/blue_Logo.png';
import BlueNameIcon from 'assets/contestLabels/blue_Name.png';
import BlueTaglineIcon from 'assets/contestLabels/blue_Tagline.png';
import LogoIcon from 'assets/contestLabels/Logo.png';
import NameIcon from 'assets/contestLabels/Name.png';
import TaglineIcon from 'assets/contestLabels/Tagline.png';

export const SINGLE_BUNDLES = [
  {
    describe: 'Get up and running with the perfect name.',
    header: 'Name',
    icons: [[NameIcon, BlueNameIcon]],
  },
  {
    describe: 'Kickstart your venture with a unique, memorable logo.',
    header: 'Logo',
    icons: [[LogoIcon, BlueLogoIcon]],
  },
  {
    describe:
      'Connect deeply with your target audience with an on-target tagline.',
    header: 'Tagline',
    icons: [[TaglineIcon, BlueTaglineIcon]],
  },
];
export const COMBO_BUNDLES = [
  {
    describe:
      'Get the essentials needed to establish your brand together and save.',
    header: 'Name+Logo',
    icons: [
      [NameIcon, BlueNameIcon],
      [LogoIcon, BlueLogoIcon],
    ],
  },
  {
    describe: 'Communicate your vision with the perfect Name/Tagline combo.',
    header: 'Name+Tagline',
    icons: [
      [NameIcon, BlueNameIcon],
      [TaglineIcon, BlueTaglineIcon],
    ],
  },
  {
    describe: 'Description for Logo + Tagline will come here.',
    header: 'Tagline+Logo',
    icons: [
      [LogoIcon, BlueLogoIcon],
      [TaglineIcon, BlueTaglineIcon],
    ],
  },
  {
    describe: 'Establish your entire brand identity and save with this bundle.',
    header: 'Name+Tagline+Logo',
    icons: [
      [NameIcon, BlueNameIcon],
      [LogoIcon, BlueLogoIcon],
      [TaglineIcon, BlueTaglineIcon],
    ],
  },
];
