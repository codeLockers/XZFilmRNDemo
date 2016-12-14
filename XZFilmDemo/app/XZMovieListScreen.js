import React, {
  Component,
} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Navigator,
  DeviceEventEmitter,
  ListView,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import XZMovieDetailScreen from './XZMovieDetailScreen'
import XZMovieListCell from './XZMovieListCell'
import XZSearchBar from './XZSearchBar'

var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
var API_KEY = '7waqfqbprs7pajbz28mqf6vz';


class XzMovieListScreen extends Component {

  //Life_Circle
  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      // isLoading : false,
      isLoading: false,
      queryNumber: 1,
      queryArray: [],
      name: '',
      query: '',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  componentDidMount() {
    this._searchMovies('', 1)
  }

  //Private_Methods
  getDataSource(movies) {
    return this.state.dataSource.cloneWithRows(movies)
  }

  //API_Methods
  //生成请求的URL
  _urlForQueryAndPage(query, pageNumber) {

    let url = ''
    if (query) {
      url = API_URL + 'movies.json?apikey=' + API_KEY + '&q=' +
        encodeURIComponent(query) + '&page_limit=20&page=' + pageNumber
    } else {
      url = API_URL + 'lists/movies/in_theaters.json?apikey=' + API_KEY +
        '&page_limit=20&page=' + pageNumber
    }
    console.log(url)
    return (url)
  }

  _searchMovies(query, page) {

    console.log(query + '---' + page)

    this.state.query = query
    this.state.isLoading = true

    fetch(this._urlForQueryAndPage(this.state.query, page))
      .then((response) => response.json())
      .then((responseData) => {

        console.log('response successfully')

        if (page == 1) {
          this.state.queryArray.length = 0
        }

        console.log(responseData.movies.length)

        this.state.queryArray = [...this.state.queryArray, ...Array.from(responseData.movies)]

        this.setState({
          dataSource: this.getDataSource(this.state.queryArray)
        })

        this.state.isLoading = false
      })
      .catch((error) => {
        console.warn(error);
      });

  }

  _pressCell(movie) {

    this.props.navigator.push({

      title: movie.title,
      component: XZMovieDetailScreen,
      leftButtonTitle: '返回',
      movie: movie
    })

  }

  //ListView_Methods
  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key = {sectionID + rowID + adjacentRowHighlighted} 
        style = {{marginLeft : 5, height : 0.5 ,backgroundColor:'rgb(233,233,233)'}}>
      </View>
    );
  }

  _renderRow(movie, sectionID, rowID) {

    return (
      <XZMovieListCell 
      movie = {movie}
      pressed = {() => this._pressCell(movie)}
      />
    );
  }

  _renderFooter() {

    if (!this.state.isLoading) {
      return (
        <View style ={styles.container}></View>
      )
    }

    return (
      <ActivityIndicator style = {{backgroundColor:'white',marginVertical:20}}/>
    )
  }

  _onEndReached() {

    if (this.state.isLoading) {
      return
    }

    this.state.queryNumber += 1
    this._searchMovies(this.state.query, this.state.queryNumber)
  }

  render() {

    return (
      <View style = {{flex:1}}>
          <XZSearchBar search = {this._searchMovies.bind(this)}/>
          <ListView
          style = {{backgroundColor:'white',flex:1}}
          dataSource = {this.state.dataSource}
          renderSeparator = {this._renderSeparator}
          renderRow = {this._renderRow.bind(this)}
          renderFooter = {this._renderFooter.bind(this)}
          onEndReached = {this._onEndReached.bind(this)}
          iosautomaticallyAdjustContentInsets = {true}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },

});

//导出使得外部可以访问使用
export default XzMovieListScreen