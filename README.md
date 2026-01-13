# Auth0POC

This is a POC app made in React Native for login with OTP using the Auth0 API.

## Features

There are two methods for login:
1.  **Integrated Auth0 Webapp**: Uses the standard Auth0 web authentication flow.
2.  **Manual Method**: Uses a custom form inside the application to interact with the Auth0 API directly.

## UI Flow & Screenshots

The application follows a specific flow depending on the chosen login method.

### Default Screen
The entry point of the application.
![Home Screen](./screenshots/home.png)

### Option 1: Auth0 Integrated Login
If the user selects the standard Auth0 login:

1.  **Login Screen**:
    ![Auth0 Login](./screenshots/auth0-login.png)
2.  **OTP Verification**:
    ![Auth0 OTP](./screenshots/auth0-otp.png)
3.  **Logged In State**:
    ![Auth0 Logged](./screenshots/auth0-logged.png)

### Option 2: Manual Login
If the user selects the manual custom form login:

1.  **Manual Login Screen**:
    ![Manual Login](./screenshots/manual-login.png)
2.  **OTP Verification**:
    ![Manual OTP](./screenshots/manual-otp.png)
3.  **Logged In State**:
    ![Manual Logged](./screenshots/manual-logged.png)

### Authenticated State
Once logged in via either method:

*   **Home (Logged)**: Shows the home screen with the logged-in user's name.
    ![Home Logged](./screenshots/home-logged.png)

### Logout
*   **Logout Screen**: This is the same screen as the Manual Login, but reflects the state if the user is already logged in (or handles the logout process).
    ![Logout](./screenshots/logout.png)

---

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

```sh
pod cache clean --all
pod install
```

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```
