import React, { Component, } from 'react'
import { View,Text ,TextInput} from 'react-native'

class XZSearchBar extends Component{

  static propTypes = {}

  static defaultProps = {
    query:'ssss'
  }

  constructor(props) {
    super(props)
  }

  _textChanged(text){
    // console.log(text)
  }

  _submitBtnPress(text){

    this.props.search(text,1)
  }

  render() {

    return (
      <View style = {{height:50,marginTop:64}}>
        <TextInput
          style = {{flex:1,paddingLeft:10}}
          placeholder = 'search a movie'
          placeholderTextColor = 'gray'
          onChange={(event) => this._textChanged(event.nativeEvent.text)} 
          returnKeyType = 'search'
          onSubmitEditing = {((event) => this._submitBtnPress(event.nativeEvent.text)).bind(this)}
        />
        <View style = {{height:1,backgroundColor:'gray'}}></View>
      </View>
    )
  }
}

export default XZSearchBar