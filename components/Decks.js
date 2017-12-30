import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/helpers'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { initDecks } from '../actions'

function Deck ({ title, questions, index }) {
  return (
    <Card>
      <Text>{title}</Text>
      <Text>{questions.length} cards</Text>
    </Card>
  );
}

class Decks extends React.Component {
  componentDidMount() {
    getDecks().then((data) => {
      this.props.dispatch(initDecks(data));
    });
  }

  renderItem = ({ item }) => {
    return (<TouchableOpacity
      key={item}
      onPress={() => this.props.navigation.navigate(
               'DeckDetail',
               { id: item[0], title: item[1].title }
             )}>
      <Deck {...item[1]} />
    </TouchableOpacity>);
  }

  render() {
    const { decks } = this.props
    const decksA = Object.entries(decks);
    return (
      <View style={styles.container}>
        { decksA.length ?
          (
            <FlatList
              data={decksA}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index}
            />
          ) : (
            <View style={styles.empty}>
              <Text> No Decks Created </Text>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  empty: {
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
)(Decks);
