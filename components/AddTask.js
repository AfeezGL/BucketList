import React from 'react'
import {useState} from 'react'
import {View, TextInput, TouchableOpacity, Text, AsyncStorage, StyleSheet, Alert} from 'react-native'
import {Link} from 'react-router-native'
import Icon from '@expo/vector-icons/FontAwesome'

const AddTask = ({baseUrl}) => {
    const [text, setText] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    //update the text state when tnput changes
    const updateText = (textValue) => {
        setText(textValue)
    }

    //function for creating new task
    const submitForm = async () => {
        if (!text) {
            Alert.alert("Error", "Task can't be empty", [{text: "Ok"}], {cancelable: true})
            return
        }
        let deviceId = await AsyncStorage.getItem("uuid")
        fetch(`${baseUrl}/api/todo/`, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "text": text,
                "uuid": deviceId
            })
        })
        .then(response => response.json())
        .then(() => {
            setText("")
            setShowAlert(!showAlert)
            setTimeout(() => {
                setShowAlert(false)
            }, 1000)
        }).catch(error => {
            Alert.alert("Error", `${error.message}`, [{text: "Ok"}], {cancelable: true})
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Link to="/" style={styles.backBtn}>
                    <Icon name="arrow-left" size={27} color="black" />
                </Link>
                <Text style={styles.text}> Add New</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.text}>Target</Text>
                <TextInput value={text} onChangeText={updateText} style={styles.input}/>
                <TouchableOpacity onPress={()=>submitForm()} style={styles.btn}>
                    <Text style={styles.btnText}>ADD</Text>
                </TouchableOpacity>
                {showAlert && <Text style={styles.text}>Task Added</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
    },
    header: {
        flexDirection: "row",
    },
    backBtn:{
        width:30
    },
    text: {
        fontSize: 27
    },
    input: {
        fontSize: 21.6,
        padding: 10,
        backgroundColor: "white",
        marginTop: 18,
        borderRadius: 6,
        borderColor: "black",
        borderWidth: 1
    },
    form: {
        height: 500,
        justifyContent: "center",
    },
    btn: {
        backgroundColor: "#273049",
        color: "white",
        flexDirection: "row",
        alignSelf: "flex-end",
        justifyContent: "center",
        borderRadius: 6,
        marginTop: 18
    },
    btnText: {
        fontSize: 18,
        color: "white",
        width: 108,
        padding: 9,
        textAlign: "center"
    }
})

export default AddTask