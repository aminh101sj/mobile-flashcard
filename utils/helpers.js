import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DB_KEY = 'Deck:DB';
const NOTIFICATION_KEY = 'Deck:notifications'

export async function getDecks() {
  try {
    const decks = await AsyncStorage.getItem(DB_KEY);
    return JSON.parse(decks);
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function getDeck(id) {
  const decks = await AsyncStorage.getItem(DB_KEY);
  return decks[id];
}

export async function saveDeckTitle(title) {
  const ret = await AsyncStorage.getItem(DB_KEY);
  const decks = JSON.parse(ret) || {};
  decks[title] = { title: title, questions: [] };
  AsyncStorage.setItem(DB_KEY, JSON.stringify(decks)); 
}

export async function addCardToDeck(title, card) {
  const ret = await AsyncStorage.getItem(DB_KEY);
  const decks = JSON.parse(ret) || {};
  decks[title].questions.push(card);
  await AsyncStorage.setItem(DB_KEY, JSON.stringify(decks)); 
}

function createNotification () {
  return {
    title: 'Study your Decks!',
    body: "👋  don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
