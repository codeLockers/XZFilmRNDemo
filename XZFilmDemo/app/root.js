import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  NavigatorIOS,
  TouchableOpacity
} from 'react-native';

import XZMovieListScreen from './XZMovieListScreen'


export default class XZFilmDemo extends Component {

  _renderNavBar() {
    const styles = {
      title: {
        flex: 1,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
      },
      button: {
        flex: 1,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '400'
      }
    }

    var routeMapper = {
      RightButton(route, navigator, index, navState) {

      },
      LeftButton(route, navigator, index, navState) {
        if (index > 0) {

          return (
            <TouchableOpacity 
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}>{route.leftButtonTitle}</Text>
            </TouchableOpacity>
          );
        }

      },
      Title(route, navigator, index, navState) {
        return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20, color: '#FFFFFF',textAlign:'center',maxWidth:250}}
                  numberOfLines = {1}
            >{route.title}</Text>
          </View>
        );
      }
    }

    return ( < Navigator.NavigationBar style = {
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#55ACEE',
        }
      }
      routeMapper = {
        routeMapper
      }
      />
    );
  }

  render() {
    return ( < Navigator style = {
        styles.container
      }
      initialRoute = {
        {
          component: XZMovieListScreen,
          title: '电影列表'
        }
      }

      renderScene = {
        (route, navigator) => {
          return <route.component {...route} navigator={navigator} />
        }
      }
      navigationBar = {
        this._renderNavBar()
      }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('XZFilmDemo', () => XZFilmDemo);