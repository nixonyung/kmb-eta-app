# KMB ETA App

A mobile application to smoothly display real-time KMB estimated time of arrival (ETA) data.

Using [React Native](https://github.com/facebook/react-native),
[React Navigation V6](https://github.com/react-navigation/react-navigation),
[Typescript](https://github.com/Microsoft/TypeScript),
[React Query](https://github.com/tanstack/query), [Zustand](https://github.com/pmndrs/zustand),
[AsyncStorage](https://github.com/react-native-async-storage/async-storage),
[RecyclerListView](https://github.com/Flipkart/recyclerlistview).

## Get started

1. Clone this repository.
2. Run `yarn install` (if there is any issues related to dependencies, try
   `expo doctor --fix-dependencies`?)
3. Connect your mobile device (Android / iOS) to your computer.
4. Run `yarn android` / `yarn ios` / `yarn start`. Either way, you can then:
   - press `a` to reconnect Android devices,
   - press `i` to reconnect iOS devices,
   - press `r` to reload all connected devices).

## Features

- Auto update real-time KMB ETA data, and reload on app focus.
- Support dark mode.
- Persist your favorite routes.

## User Guide

The app itself is pretty self-explanatory.

At the "Routes" tab, simply enter the route to search for. You can then click on an item to see the
route's estimated time of arrival (ETA) data.

You can then save a route's stop to your favorites for later reference, e.g. simple view them at the
"Favorites" page.

You can also toggle dark mode at the navbar. There is also a reload button to refresh routes and
favorites data, just in case.
