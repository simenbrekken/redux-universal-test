import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Application from './components/Application';
import Frontpage from './containers/Frontpage';
import Category from './containers/Category';
import NotFound from './components/NotFound';

const routes = (
  <Route path="/" component={Application}>
    <IndexRoute component={Frontpage} />

    <Route path="categories/:categoryId" component={Category} />

    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
