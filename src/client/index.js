import 'isomorphic-fetch';

if (process.env.NODE_ENV === 'production') {
  require('./production');
} else {
  require('./development');
}
