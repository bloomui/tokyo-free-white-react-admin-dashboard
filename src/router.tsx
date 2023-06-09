import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/ui/components/SuspenseLoader';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Dashboards

const Dashboard = Loader(lazy(() => import('src/ui/pages/dashboards/Dashboard')));

// Applications

const DatabaseTable = Loader(
  lazy(() => import('src/ui/pages/database-table/DatabaseTable'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/db-t/:sensorName',
        element: <DatabaseTable />
      }
    ]
  }
];

export default routes;
