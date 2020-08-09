import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,

} from 'react-native';

class HomeScreen extends Component {
       render() {
       
        return (
            <View style={styles.container}>
         <Text style={styles.text}>Please click on  Launch button to start the Application</Text>
        <TouchableOpacity style={styles.button}
         onPress={()=>this.props.navigation.navigate('Detail')}>
           
            <Text>LAUNCH</Text>

            </TouchableOpacity>
            </View>
        );
    }
}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontWeight:"bold",
        margin:20,
        textAlign:"center"

    },
    button:{
        backgroundColor:"green",
        padding:10
    }
  
})




