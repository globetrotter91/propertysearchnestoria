import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import SearchScreen from './app/components/SearchScreen';
import SearchResultsScreen from './app/components/SearchResultsScreen';
import SearchDetailScreen from './app/components/SearchDetailScreen';

import { StackNavigator } from 'react-navigation';

const AppRoutes = StackNavigator({
  SearchScreen: { 
    screen: SearchScreen, 
    headerMode: 'none' 
  },
  SearchResultsScreen: {
    screen: SearchResultsScreen, 
    headerMode: 'none' 
  }, 
  SearchDetailScreen: {
    screen: SearchDetailScreen, 
    headerMode: 'none' 
  }  
});

AppRegistry.registerComponent('PropertySearchNestoria', () => AppRoutes);
