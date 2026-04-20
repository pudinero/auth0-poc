import Config from 'react-native-config';

const config = {
  clientId: Config.AUTH0_CLIENT_ID || '',
  clientSecret: Config.AUTH0_CLIENT_SECRET || '',
  domain: Config.AUTH0_DOMAIN || '',
  audience: Config.AUTH0_AUDIENCE || '',
};

export default config;
