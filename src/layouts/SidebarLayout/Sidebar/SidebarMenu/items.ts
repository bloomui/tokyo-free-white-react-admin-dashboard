import { ReactNode } from 'react';

import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import DesignServicesTwoToneIcon from '@material-ui/icons/DesignServicesTwoTone';

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
  {
    heading: '',
    items: [
      {
        name: 'Overview',
        link: '/overview',
        icon: DesignServicesTwoToneIcon
      }
    ]
  },
  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Crypto',
        link: '/dashboards/crypto',
        icon: DesignServicesTwoToneIcon
      },
      {
        name: 'Messenger',
        icon: QuestionAnswerTwoToneIcon,
        link: '/dashboards/messenger'
      },
    ]
  },
  {
    heading: 'Management',
    items: [
      {
        name: 'Transactions',
        icon: QuestionAnswerTwoToneIcon,
        link: '/management/transactions'
      },
      {
        name: 'User Profile',
        icon: ErrorTwoToneIcon,
        link: '/management/profile',
        items: [
          {
            name: 'Profile Details',
            link: '/management/profile/details'
          },
          {
            name: 'User Settings',
            link: '/management/profile/settings'
          }
        ]
      }
    ]
  },
  {
    heading: 'Components',
    items: [
      {
        name: 'Buttons',
        link: '/components/buttons'
      },
      {
        name: 'Modals',
        link: '/components/modals'
      },
      {
        name: 'Accordions',
        link: '/components/accordions'
      },
      {
        name: 'Tabs',
        link: '/components/tabs'
      },
      {
        name: 'Badges',
        link: '/components/badges'
      },
      {
        name: 'Tooltips',
        link: '/components/tooltips'
      },
      {
        name: 'Avatars',
        link: '/components/avatars'
      },
      {
        name: 'Cards',
        link: '/components/cards'
      },
      {
        name: 'Forms',
        link: '/components/forms'
      },
    ]
  },
  {
    heading: 'Extra Pages',
    items: [
      {
        name: 'Status',
        icon: ErrorTwoToneIcon,
        link: '/status',
        items: [
          {
            name: 'Error 404',
            link: '/status/404'
          },
          {
            name: 'Error 500',
            link: '/status/500'
          },
          {
            name: 'Maintenance',
            link: '/status/maintenance'
          },
          {
            name: 'Coming Soon',
            link: '/status/coming-soon'
          }
        ]
      }
    ]
  }
];

export default menuItems;
