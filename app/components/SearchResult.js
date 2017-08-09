import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native'; 
import { ListItem, Thumbnail, Body, Text } from 'native-base';
import material from './../../native-base-theme/variables/material';

export default class SearchResult extends PureComponent {

    onPress = () => {
        this.props.onPressItem(this.props.property);
    }

    render(){
        const property = this.props.property;
        const price = property.price_formatted.split(' ')[0];
        return (
            <ListItem onPress={this.onPress}>
              <Thumbnail square source={{ uri: property.img_url }}/>
              <Body>
                <View style={styles.textContainer}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
                </View>
              </Body>
            </ListItem>
        )
    }
}


const styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: material.brandPrimary
    },
    title: {
        fontSize: 16,
    }
});