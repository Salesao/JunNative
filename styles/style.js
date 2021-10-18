import {StyleSheet} from 'react-native';

export const Gstyle = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 15,
    padding: 10,
    borderColor: 'silver',
    borderRadius: 5,
    fontSize:20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    color:'black'
  },
  body: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
});
