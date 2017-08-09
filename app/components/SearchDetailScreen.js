'use strict';

import React, { Component } from 'react'
import { StyleSheet, View, Image} from 'react-native'; 
import getTheme from './../../native-base-theme/components';
import { StyleProvider, Container, Header, Title, Left, Body, Content, Item, Button, Icon, Text, List } from 'native-base';
import material from './../../native-base-theme/variables/material';



class SearchDetailScreen extends Component {
    
    render(){
        const { selectedProperty } = this.props.navigation.state.params; 
        const { navigation } = this.props;  
        return (
            <StyleProvider  style={getTheme(material)}>                
                <Container>        
                    <Header>
                        <Left>
                            <Button transparent onPress={() => navigation.goBack(null)}>
                                <Icon name='md-arrow-back'/>
                            </Button>
                        </Left>
                        <Body>
                            <Title style={styles.headerText}>Property Detail</Title>
                        </Body>                        
                    </Header>                        
                    <Content padded>
                        <View style={styles.container}>
                            <Image source={{ uri: selectedProperty.img_url }} style={styles.image}/>
                            <Text style={styles.propertyType}>{selectedProperty.property_type.toUpperCase()}</Text>
                            <Text style={styles.propertyTitle}>{selectedProperty.title}</Text>
                            <Text style={styles.summary}>{selectedProperty.summary}</Text>
                            <Text style={styles.elements}>{selectedProperty.bathroom_number} Bedrooms, {selectedProperty.bathroom_number} Bathrooms, {selectedProperty.car_spaces} Car Spaces</Text>
                            <Text style={styles.price}>{selectedProperty.price_formatted}</Text>
                            
                        </View>
                    </Content>
                </Container>
            </StyleProvider> 
        )
    }
}


const styles = StyleSheet.create({
    propertyType: {
        fontSize: 18, 
        marginTop: 10, 
        
    },
    propertyTitle:{
        fontSize: 20, 
        marginTop: 10
    },
    summary:{
        fontSize: 14, 
        marginTop:5, 
        marginBottom: 10
    },
    elements:{
        fontSize: 16, 
        marginTop: 10
    },
    price: {
        fontSize: 22, 
        fontWeight: 'bold',
        marginTop: 20
    },
    container: {
        padding: 5,
        marginTop: 1,
        alignItems: 'center'
    },
    headerText:{
        fontSize: 18
    },
    image: {
        width: 400,
        height: 300,
    },
});

SearchDetailScreen.navigationOptions = {
  title: 'Property Details',
  header: null
};


export default SearchDetailScreen;