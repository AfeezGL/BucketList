import React from 'react'
import {TouchableOpacity, Text, StyleSheet, Button, View} from 'react-native'

const Task = ({task, clickFunction}) => {
    return (
        <View style={styles.task}>
            <Text style={styles.text}>{task.text}</Text>
            <TouchableOpacity title="" style={styles.button} onPress={() => clickFunction(task.id)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    task: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 18,
        borderRadius: 18/3,
        marginBottom: 18,
    },
    text: {
        fontSize: 18,
        color: "black"
    },
    button: {
        width: 21.6,
        height:21.6,
        backgroundColor: "white",
        borderColor: "#273049",
        borderWidth: 1,
        borderRadius: 10.8
    }
})

export default Task
