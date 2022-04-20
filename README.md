# `react-global-state-hooks-debugger`

[![NPM](https://img.shields.io/npm/v/react-global-state-hooks-debugger?color=red)](https://www.npmjs.com/package/react-global-state-hooks-debugger)
[![MIT License](https://img.shields.io/github/license/EthicDevs/react-global-state-hooks-debugger.svg?color=blue)](https://github.com/EthicDevs/react-global-state-hooks-debugger/blob/master/LICENSE)
[![Travis CI Build](https://img.shields.io/travis/com/EthicDevs/react-global-state-hooks-debugger.svg)](https://travis-ci.com/EthicDevs/react-global-state-hooks-debugger)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=EthicDevs/react-global-state-hooks-debugger)](https://dependabot.com)
[![Average issue resolution time](https://isitmaintained.com/badge/resolution/EthicDevs/react-global-state-hooks-debugger.svg)](https://isitmaintained.com/project/EthicDevs/react-global-state-hooks-debugger)
[![Number of open issues](https://isitmaintained.com/badge/open/EthicDevs/react-global-state-hooks-debugger.svg)](https://isitmaintained.com/project/EthicDevs/react-global-state-hooks-debugger)

A small WebSocket based debugger for use with the [react-global-state-hooks](https://github.com/EthicDevs/react-global-state-hooks) library.

## Installation

```shell
$ yarn add @ethicdevs/react-global-state-hooks-debugger
# or
$ npm i @ethicdevs/react-global-state-hooks-debugger
```

## Usage

Add a script in your project to launch the debugger server:

```json
{
  "scripts": {
    // Run the app with logger configured to send state changes, dispatched actions, etc
    "start:rgsh": "RGSH_DEBUG=1 run-s start:dev",
    // Local debug server that receives the logs, and display them
    "start:rgsh:server": "rgsh-debugger -r ./state -p 3123"
  }
}
```

then in the `App` component where you provide the `GlobalStateContext` add something like this:

```ts
+ import { makeGetDebuggerLogger } from "@ethicdevs/react-global-state-hooks-debugger";

+ const getDebuggerLogger = makeGetDebuggerLogger({
+   wsUri: 'ws://localhost:8080', // default: ws://10.0.2.2 (so it works with react-native on remote device by default)
+ });

+ const getLogger = process.env.NODE_ENV === 'development'
+   ? getDebuggerLogger
+   : getCustomLogger; // | undefined to use built-in getConsoleLogger

const AppWithProviders = () => {

  return (
    <>
      <GlobalStateProvider
        initialState={initialState}
+       getLogger={getLogger}
        rootReducer={
          rootReducer as unknown as Reducer<FluxBaseState, FluxStandardAction>
        }
      >
        <AuthProvider>
          <AppearanceProvider>
            <App />
          </AppearanceProvider>
        </AuthProvider>
      </GlobalStateProvider>
    </>
  );
};
```

## Configuration

## License

[MIT](https://github.com/EthicDevs/react-global-state-hooks-debugger/blob/master/LICENSE) - Made with ❤️ by [François Best](https://francoisbest.com) - [Donations welcome](https://paypal.me/francoisbest?locale.x=fr_FR) 🙏
