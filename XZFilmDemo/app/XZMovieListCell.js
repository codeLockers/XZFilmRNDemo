import React, { Component, } from 'react'
import { View, Text,Image,TouchableOpacity} from 'react-native'

class XzMovieListCell extends Component {

  static propTypes = {}

  static defaultProps = {
    
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  _test(){

    console.log('xuzhang ')
  }


  render() {

    return (
      <TouchableOpacity
        onPress = {this.props.pressed}>
        <View style = {{flexDirection:'row'}}>
        
          <View style={{width : 50 , height : 75,marginLeft:5,marginBottom:5,marginTop:5}}>
            <Image style = {{flex : 1}}
                  source = {{uri : this.props.movie.posters.original}}
            ></Image>
          </View>
          <View style = {{flex:1,marginLeft:5,marginRight:5,marginBottom:5,marginTop:5,flexDirection:'column'}}>
            <Text style = {{fontSize:15,color:'black',flex: 1}}>{this.props.movie.title}</Text>
            <Text style = {{fontSize:12,color:'rgb(210,210,210)'}}>
              {this.props.movie.year}
              {' '}
              <Text style = {{fontSize:12,color:'green'}}>Critics {this.props.movie.ratings.critics_score}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default XzMovieListCell