import React, { Component, } from 'react'
import { View,Text ,Navigator,ScrollView,Image} from 'react-native'

class XzMovieDetailScreen extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount(){
    
//     console.log('didMount')
    
  }
  
  
  //  _pressButton(){

  //    console.log(this.props.movie.id)

  //   if(this.props.navigator){

  //     const { navigator } = this.props
  //      navigator.pop()
  //   }
  // }
  
  render() {

    return (
      <ScrollView style = {{flex : 1 ,paddingTop:64}}>
            <IntroduceView movie = {this.props.movie}/>
            <View style = {{backgroundColor:'black',height:1}}></View>
            <ContentView synopsis={this.props.movie.synopsis}/>
            <View style = {{backgroundColor:'black',height:1}}></View>
            <CastView cast={this.props.movie.abridged_cast}/>
      </ScrollView>
      
    )
  }
}

class IntroduceView extends Component{

  render(){

    return(

      <View style = {{height:230,flexDirection:'row'}}>
        <View style = {{margin:5,width:150,backgroundColor:'green'}}>
          <Image style = {{flex:1}}
                 source ={{uri:this.props.movie.posters.original}}
          />
        </View>
        <View style = {{flex:1,margin:5,marginLeft:0}}>
          <Text>{this.props.movie.title}</Text>
          <Text>{this.props.movie.year}</Text>
          <Text style = {{marginTop:5,padding:2, alignSelf: 'flex-start',borderColor: 'black',borderWidth: 1}}>{this.props.movie.mpaa_rating}</Text>
          <View style = {{marginTop:5,flex:1}}>
            <View style = {{flex:1,justifyContent:'flex-end'}}>
              <Text>Critics</Text>
              <Text style = {{fontSize:20,color:'green'}}>{this.props.movie.ratings.critics_score}%</Text>
            </View>
            <View style = {{flex:1,justifyContent:'flex-end'}}>
              <Text>Audience</Text>
              <Text style = {{fontSize:20,color:'green'}}>{this.props.movie.ratings.audience_score}%</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

class ContentView extends Component{

  static propTypes = {}

  static defaultProps = {
  }

  constructor(props) {
    super(props)
  }


  render(){

    return(
      <View>
        <Text style = {{margin:5,fontSize:15}}>{this.props.synopsis}</Text>
      </View>
      )
  }
}

class CastView extends Component{

  render(){
    console.log(this.props.cast)
    return(
      <View>
      <Text style={{marginLeft:5}}>Actors</Text>
        {this.props.cast.map((x,i) => 
          <Text key={i} style={{marginLeft:5}}>&bull; {x.name}</Text>)}
      </View>
    )
  }
}

export default XzMovieDetailScreen