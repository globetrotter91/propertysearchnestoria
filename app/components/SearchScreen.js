import React, { Component } from 'react'; 
import { StyleSheet, View, Image } from 'react-native'; 
import getTheme from './../../native-base-theme/components';
import { StyleProvider, Container, Header, Title, Left, Right, Body, Content, Item, Input, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';
import material from './../../native-base-theme/variables/material';

function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;

    const querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'https://api.nestoria.co.uk/api?' + querystring;
}


class SearchScreen extends Component {

    constructor(props){
        super(props); 
        this.state = {
            searchText: '', 
            isLoading: false, 
            message: '', 
            listings: []
        }
    }   

    onChange = (event) => {
        this.setState({ searchText: event.nativeEvent.text });
    }

    handleResponse = (response) => {
        this.setState({ isLoading: false , message: '' });
        if (response.application_response_code.substr(0, 1) === '1') {
            console.log('Properties found: ' + response.listings.length);
            this.props.navigation.navigate('SearchResultsScreen', {listings: response.listings});
        } else {
            this.setState({ message: 'Location not recognized; please try again.'});
        }
    };

    queryResults = (searchText) => {
        this.setState({ isLoading: true });
        fetch(searchText)
            .then(response => response.json())
            .then(json => this.handleResponse(json.response))
            .catch(error =>
                this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error
            }));
    }

    searchPressed = () => {
        if(this.state.searchText!==''){
            const searchText =  urlForQueryAndPage('place_name', this.state.searchText, 1);;
            this.queryResults(searchText);
        }
    }


    render(){
        const { navigation } = this.props ; 
        return(
            <StyleProvider  style={getTheme(material)}>                
                <Container>        
                    <Header>
                        <Left />
                        <Body>
                            <Title style={styles.headerText}>Search Properties</Title>
                        </Body>                        
                    </Header>                        
                <Content padded>
                    <View style={styles.container}>
                        <Image source={require('./../../Resources/house.png')} style={styles.image}/>
                        <Text style={styles.description}>Search properties for purchase in UK</Text>
                        <Item >
                            <Input  
                                style={styles.searchInput}                          
                                placeholder='Place, Zip'
                                value={this.state.searchText} 
                                onChange={this.onChange}/>
                        </Item>
                        <Item style={styles.spinnerItem}> 
                            {this.state.isLoading ? <Spinner /> : null}
                        </Item>
                        <Text style={styles.description}>{this.state.message}</Text>
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                    <Button full onPress={this.searchPressed}>
                        <Text style={{color: '#fff'}}>Search</Text>
                    </Button>
                    </FooterTab>
                </Footer>
                </Container>
            </StyleProvider> 
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    headerText:{
        fontSize: 18
    }, 
    description:{
        marginBottom: 20,
        marginTop: 40,
        fontSize: 16,
        textAlign: 'center',
    }, 
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        marginTop: 20,
        height: 40,
        padding: 4,
        flexGrow: 1,
        fontSize: 16,
    }, 
    image: {
        height: 300, 
        width: 320        
    }, 
    spinnerItem: {
        borderBottomWidth: 0
    }
})

SearchScreen.navigationOptions = {
  title: 'Welcome',
  header: null
};

export default SearchScreen;