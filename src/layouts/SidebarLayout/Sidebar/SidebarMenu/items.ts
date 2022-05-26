import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@material-ui/icons/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@material-ui/icons/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@material-ui/icons/MmsTwoTone';
import TableChartTwoToneIcon from '@material-ui/icons/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone';
import BeachAccessTwoToneIcon from '@material-ui/icons/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@material-ui/icons/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@material-ui/icons/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@material-ui/icons/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@material-ui/icons/RedeemTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import TrafficTwoToneIcon from '@material-ui/icons/TrafficTwoTone';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import { FaDatabase } from "react-icons/fa"
import { VscAdd } from 'react-icons/vsc';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  // {
  //   heading: '',
  //   items: [
  //     {
  //       name: 'Overview',
  //       link: '/overview',
  //       icon: DesignServicesTwoToneIcon
  //     }
  //   ]
  // },
  {
    heading: 'MyChefsbase',
    items: [
      {
        name: 'Chefsbase',
        link: '/mychefsbase/chefsbase',
        icon: FaDatabase,
        items: [
          {
            name: 'Overzicht',
        link: '/mychefsbase/chefsbase',
        icon: FaDatabase,
          },
          // {
          //   name: 'Leverancier toevoegen',
          //   link: '/mychefsbase/addsupplier',
          //   icon: VscAdd
          // },
          {
            name: 'Product toevoegen',
            link: '/mychefsbase/addproduct',
            icon: VscAdd
          },
          {
            name: 'Ingredient toevoegen',
            link: '/mychefsbase/addingredient',
            icon: VscAdd
          },
          {
            name: 'Recept toevoegen',
            link: '/mychefsbase/addrecipe',
            icon: VscAdd
          },
          // {
          //   name: 'Gerecht toevoegen',
          //   link: '/mychefsbase/adddish',
          //   icon: VscAdd
          // },
          // {
          //   name: 'Menu toevoegen',
          //   link: '/mychefsbase/addmenu',
          //   icon: VscAdd
          // },
        ]
      },
      {
        name: 'Inventaris',
        icon: MmsTwoToneIcon,
        link: '/mychefsbase/inventaris'
      },
      {
        name: 'Bestellingen',
        icon: TableChartTwoToneIcon,
        link: '/mychefsbase/orders'
      },
    ]
  },
  {
    heading: 'Account',
    items: [
      {
        name: 'Account',
        icon: AccountCircleTwoToneIcon,
        link: '/management/profile',
        items: [
          {
            name: 'Profile Details',
            link: '/management/profile/details'
          },
        ]
      }
    ]
  },
  // {
  //   heading: 'Components',
  //   items: [
  //     {
  //       name: 'Buttons',
  //       icon: BallotTwoToneIcon,
  //       link: '/components/buttons'
  //     },
  //     {
  //       name: 'Modals',
  //       icon: BeachAccessTwoToneIcon,
  //       link: '/components/modals'
  //     },
  //     {
  //       name: 'Accordions',
  //       icon: EmojiEventsTwoToneIcon,
  //       link: '/components/accordions'
  //     },
  //     {
  //       name: 'Tabs',
  //       icon: FilterVintageTwoToneIcon,
  //       link: '/components/tabs'
  //     },
  //     {
  //       name: 'Badges',
  //       icon: HowToVoteTwoToneIcon,
  //       link: '/components/badges'
  //     },
  //     {
  //       name: 'Tooltips',
  //       icon: LocalPharmacyTwoToneIcon,
  //       link: '/components/tooltips'
  //     },
  //     {
  //       name: 'Avatars',
  //       icon: RedeemTwoToneIcon,
  //       link: '/components/avatars'
  //     },
  //     {
  //       name: 'Cards',
  //       icon: SettingsTwoToneIcon,
  //       link: '/components/cards'
  //     },
  //     {
  //       name: 'Forms',
  //       icon: TrafficTwoToneIcon,
  //       link: '/components/forms'
  //     },
  //   ]
  // },
  // {
  //   heading: 'Extra Pages',
  //   items: [
  //     {
  //       name: 'Status',
  //       icon: VerifiedUserTwoToneIcon,
  //       link: '/status',
  //       items: [
  //         {
  //           name: 'Error 404',
  //           link: '/status/404'
  //         },
  //         {
  //           name: 'Error 500',
  //           link: '/status/500'
  //         },
  //         {
  //           name: 'Maintenance',
  //           link: '/status/maintenance'
  //         },
  //         {
  //           name: 'Coming Soon',
  //           link: '/status/coming-soon'
  //         }
  //       ]
  //     }
  //   ]
  // }
];

export default menuItems;
