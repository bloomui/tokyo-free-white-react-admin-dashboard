import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import * as serviceWorker from 'src/serviceWorker';

ReactDOM.render(
  <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
