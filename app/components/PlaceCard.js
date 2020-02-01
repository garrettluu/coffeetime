import React, {Component} from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

export default class PlaceCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View backgroundColor='white' style={styles.view}>
                <Text style={{position: 'absolute', alignSelf:'center'}}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        position: 'absolute',
        alignSelf: 'center',
        height: 64,
        width: (Dimensions.get('window').width - 20),
        marginLeft: 10,
        marginRight: 10,
        top: Dimensions.get('window').height - 80
    }
});
