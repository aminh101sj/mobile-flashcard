import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/helpers';
import { Button } from 'react-native-elements'
import { addDeck } from '../actions'

class AddDeck extends React.Component {
  state = {
    title: '',
  }

  add = () => {
    saveDeckTitle(this.state.title);
    this.props.dispatch(addDeck(this.state.title));
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <View style={styles.row}>
          <TextInput placeholder="Deck Title"
            onChangeText={(title) => this.setState({title})}
            style={styles.input} 
          />
        </View>
        <Button title='Add Deck' backgroundColor='#2b98f0' style={styles.button}
          onPress={this.add} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 22,
    flex: 1,
    textAlign: 'center',
  }
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(AddDeck);
