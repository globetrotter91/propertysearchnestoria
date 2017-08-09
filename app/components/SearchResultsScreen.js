'use strict';

import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'; 
import getTheme from './../../native-base-theme/components';
import { StyleProvider, Container, Header, Title, Left, Body, Content, Item, Button, Icon, Text, List } from 'native-base';
import material from './../../native-base-theme/variables/material';

import SearchResult from './SearchResult';

class SearchResultsScreen extends Component {
    onPressItem = (property) => {
        this.props.navigation.navigate('SearchDetailScreen', {selectedProperty: property});
    };
    renderItem = (item, index) => {
        return (
         <SearchResult
            property={item}
            index={index}
            onPressItem={this.onPressItem}
        />
        );
    };



    render(){
        const { params } = this.props.navigation.state; 
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
                            <Title style={styles.headerText}>Search Results</Title>
                        </Body>                        
                    </Header>                        
                    <Content padded>
                        <List 
                            dataArray={params.listings}
                            itemDivider={true}
                            renderRow={this.renderItem}
                        />
                    </Content>
                </Container>
            </StyleProvider> 
        )
    }
}


const styles = StyleSheet.create({
    headerText:{
        fontSize: 18
    }
});

SearchResultsScreen.navigationOptions = {
  title: 'Search Results',
  header: null
};


export default SearchResultsScreen;