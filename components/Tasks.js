import React from 'react'
const axios = require("axios").default
import Task from './Task'
import {useState, useEffect} from 'react'
import {View, Text, StyleSheet, AsyncStorage, FlatList, Dimensions, ScrollView} from 'react-native'
import {Link} from 'react-router-native'
import Icon from '@expo/vector-icons/FontAwesome'


const Tasks = ({baseUrl}) => {
    const [loading, setLoading] = useState(false)
    const [allTasks, setAllTasks] = useState([])
    const [tasks, setTasks] = useState([])
    const [completed, setCompleted] = useState([])

    // get users tasks from the backend when the component mounts
    const getTasks = async () => {
        let deviceId = await AsyncStorage.getItem("uuid")
        axios.get(`${baseUrl}/api/usertodos/${deviceId}`)
        .then((response)=> {
            const results = response.data
            setAllTasks(results)
            const incomplete = results.filter(task => !task.completed)
            setTasks(incomplete)
            const completedTasks = results.filter(task => task.completed)
            setCompleted(completedTasks)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    useEffect(() => {
        setLoading(true)
        getTasks()
    }, [])

    //function to set a task as completed
    const completeTask = (id) => {
        fetch(`${baseUrl}/api/todo/${id}/`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            mode: "same-origin",
            body: JSON.stringify({
                "completed": true
            })
        })
        .then(res => res.json())
        .then(() => {
            getTasks()
        })
        .catch(error => alert(error.message))
    }


    return (
        <View style={styles.container}>
            <View style={styles.padding}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Targets</Text>
                </View>
                <ScrollView style={styles.scroll}>
                    <FlatList data={tasks} renderItem={({item}) => <Task task = {item} clickFunction={completeTask}/>} keyExtractor={item => item.id.toString()} scrollEnabled={false}/>
                    <FlatList data={completed} renderItem={({item}) => <Text style={{textDecorationLine: "line-through", fontSize: 18}}>{item.text}</Text>} keyExtractor={item => item.id.toString()} scrollEnabled={false}/>
                    {!loading && allTasks<1 && <Text style={styles.no}>No Tasks</Text>}
                </ScrollView>
            </View>
            <View>
                <Link to="/add" style={styles.footer}>
                    <Text style={styles.footerLink}><Icon name="plus" size={18}/> ADD NEW</Text>
                </Link>
            </View>
        </View>
    )
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        height: ScreenHeight+6,
        justifyContent: "space-between"
    },
    padding: {
        paddingLeft: 18,
        paddingRight:18
    },
    header: {
        paddingTop: 18,
        paddingBottom: 18
    },
    headerText: {
        fontSize: 30,
        color: "black"
    },
    scroll: {
        height: ScreenHeight-125
    },
    footer: {
        backgroundColor: "#273049",
        alignItems: "center",
        textAlign: "center",
        padding: 18,
    },
    footerLink: {
        color: "white",
        fontSize: 18
    },
    no: {
        fontSize: 18
    }
})
export default Tasks