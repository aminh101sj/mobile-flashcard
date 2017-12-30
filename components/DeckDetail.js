import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../utils/helpers'
import { Button } from 'react-native-elements'

class DeckDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params

    return {
      title: `${title}`
    }
  }

  render() {
    const { id } = this.props.navigation.state.params;
    const { decks } = this.props;
    const deck = decks[id];

    return (
      <View style={styles.container}>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} cards</Text>
        <Button title='Add Card' backgroundColor='#2b98f0' style={styles.button}
          onPress={() => this.props.navigation.navigate(
                   'AddCard',
                   { id: id, title: deck.title }
                 )}/>
        <Button title='Start Quiz' backgroundColor='#8bc151'
          onPress={() => this.props.navigation.navigate(
                   'Quiz',
                   { id: id }
                 )}/>
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
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
});


function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckDetail);
