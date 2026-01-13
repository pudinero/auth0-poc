jest.mock('react-native-auth0', () => {
  return {
    Auth0Provider: ({children}) => children,
    useAuth0: () => ({
      authorize: jest.fn(),
      clearSession: jest.fn(),
      user: {name: 'Test User'},
      error: null,
      isLoading: false,
    }),
  };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  const {EventEmitter} = require('events');
  return class MockNativeEventEmitter extends EventEmitter {
    constructor() {
      super();
    }
    addListener = jest.fn(() => {
      return {
        remove: jest.fn(),
      };
    });
    removeListener = jest.fn();
    removeAllListeners = jest.fn();
  };
});

jest.mock('react-native-safe-area-context', () => {
  const actual = jest.requireActual('react-native-safe-area-context');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    ...actual,
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaView: jest.fn(({ children }) => children),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
    initialWindowMetrics: {
      frame: { x: 0, y: 0, width: 390, height: 844 },
      insets: inset,
    },
  };
});

jest.mock('react-native-screens', () => {
  const actual = jest.requireActual('react-native-screens');
  return {
    ...actual,
    enableScreens: jest.fn(),
  };
});

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Animated = {
    ...rn.Animated,
    Value: jest.fn(() => ({
      setValue: jest.fn(),
      setOffset: jest.fn(),
      flattenOffset: jest.fn(),
      addListener: jest.fn(() => 'mockId'),
      removeListener: jest.fn(),
      removeAllListeners: jest.fn(),
      stopAnimation: jest.fn(),
      interpolate: jest.fn(() => ({})),
    })),
    timing: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
    spring: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
    decay: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
    event: jest.fn(),
  };
  return rn;
});
