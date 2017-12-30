import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { addCardToDeck } from '../utils/helpers'
import { addCardDispatch  } from '../actions'

class AddCard extends React.Component {
  state = {
    question: '',
    answer: '',
  }

  addCard = () => {
    const { question, answer } = this.state;
    addCardToDeck(this.props.navigation.state.params.id,
      { question, answer } );
    this.props.dispatch(addCardDispatch(this.props.navigation.state.params.id,
      { question, answer } ));
    this.props.navigation.goBack(); 
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput placeholder="Question" onChangeText={(question) => this.setState({question})}  style={styles.input} />
        </View>
        <View style={styles.row}>
          <TextInput placeholder="Answer" onChangeText={(answer) => this.setState({answer})} style={styles.input}/>
        </View>
        <Button title='Submit' backgroundColor='#2b98f0'
          onPress={this.addCard} />
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
)(AddCard);
