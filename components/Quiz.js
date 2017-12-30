import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends React.Component {
  state = {
    count: 0,
    index: 0,
    reveal: false,
    done: false,
  }

  reveal = () => {
    this.setState({ reveal: true });
  }

  hide = () => {
    this.setState({ reveal: false });
  }

  correct = (length) => {
    let { count, index } = this.state;
    index += 1;
    count += 1;
    if ( index === length ) {
      this.setState({ done: true, count });
      clearLocalNotification()
        .then(setLocalNotification);
    } else {
      this.setState({ index, count });
    }
  }

  incorrect = (length) => {
    let { index } = this.state;
    index += 1;
    if ( index === length ) {
      this.setState({ done: true });
      clearLocalNotification()
        .then(setLocalNotification);
    } else {
      this.setState({ index });
    } 
  }

  render() {
    const { id } = this.props.navigation.state.params;
    const { count, done, reveal, index } = this.state;
    const { decks } = this.props;
    const deck = decks[id];
    const length = deck.questions.length;
    const card = length ? deck.questions[this.state.index] : {};
    console.log("the decks: ", id, decks);
    const total = length ? count/length : 1;
    return (
      <View style={styles.wrapper}>
        { done || length === 0 ? (
          <View style={styles.container}>
            <Text>Results </Text>
            <Text>Correct: {count}/{length}</Text> 
            <Text>Score: {total * 100}%</Text> 
          </View>
        ) :
        (<View style={styles.wrapper}>
          <View>
            <Text>Questions: {index+1}/{length}</Text>
          </View>
          <View style={styles.container}>
            { reveal ? (
              <View>
                <Text>{card.answer}</Text>
                <TouchableOpacity onPress={this.hide}>
                    <Text style={styles.btnText}>Question</Text>
                </TouchableOpacity>
              </View>) :
              (
                <View>
                  <Text>{card.question}</Text>
                  <TouchableOpacity onPress={this.reveal}>
                      <Text style={styles.btnText}>Answer</Text>
                  </TouchableOpacity>
                </View>
              ) }
          </View>
          <View style={styles.container}>
          <Button title='Correct' backgroundColor='#8bc151'
            onPress={() => this.correct(length)}
            style={styles.button} />
          <Button title='Incorrect' backgroundColor='red'
            onPress={() => this.incorrect(length)}/>
          </View>
        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  btnText: {
    color: 'red',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Quiz);
