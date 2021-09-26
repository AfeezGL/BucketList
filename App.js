import React from 'react';
import {useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import { StyleSheet, View, AsyncStorage} from 'react-native';
import {NativeRouter, Switch, Route, BackButton} from 'react-router-native'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

export default function App() {
  const baseUrl = "https://todoprj.herokuapp.com"

  useEffect(() => {
    //set uuid if uuid does not exist in AsyncStorage
    const handleUuid = async () => {
      const onDeviceUuid = await AsyncStorage.getItem("uuid")
      if (onDeviceUuid === null || onDeviceUuid === undefined ) {
        const presaveUuid = uuidv4()
        await AsyncStorage.setItem("uuid", presaveUuid)
      }
    }
    handleUuid()    
  }, [])


  return (
    <NativeRouter>
      <View style={styles.container}>
        <BackButton />
        <View>
          <Switch>
            <Route path="/" exact render={() => (<Tasks baseUrl={baseUrl}/>)}/>
            <Route path="/add" render={() => (<AddTask baseUrl={baseUrl}/>)}/>
          </Switch>
        </View>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#E3E9F0",
    fontFamily: "Montserrat, sans-serif",
    position: "relative",
    lineHeight: 27
  }
});