import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text,TextInput,TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {addToDo, updateTodo} from "../actions";
import {Actions} from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

class NewTodo extends Component {
    constructor(props){
        super(props);

        this.state ={
            title: (props.edit) ? props.todo.title : "",
            description: (props.edit) ? props.todo.description: ""
        };

        this.generateID = this.generateID.bind(this);
        this.addToDo = this.addToDo.bind(this);

    }

    generateID() {
        let d = new Date().getTime();
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(5);
        });

        return id;
    }

    addToDo() {
        if (this.props.edit){
            let todo = this.props.todo;
            todo['title'] = this.state.title;
            todo['description'] = this.state.description;
            this.props.updateTodo(todo);
        }else{
            let id = this.generateID();
            let todo = {"id": id, "title": this.state.title, "description": this.state.description};
            this.props.addToDo(todo);
        }
        //go back to last screen
        Actions.pop();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                    <TextInput
                        onChangeText={(text) => this.setState({title: text})}
                        placeholder={"Title"}
                        autoFocus={true}
                        style={[styles.title]}
                        value={this.state.title}
                    />
                    <TextInput
                        multiline={true}
                        onChangeText={(text) => this.setState({description: text})}
                        placeholder={"Enter a Description"}
                        style={[styles.description]}
                        value={this.state.description}
                    />
                </View>
                <TouchableOpacity style={[styles.saveBtn]}
                                  disabled={(this.state.title.length > 0 && this.state.description.length > 0) ? false : true}
                                  onPress={this.addToDo}>
                    <Text style={[styles.buttonText,
                        {
                            color: (this.state.title.length > 0 && this.state.description.length > 0) ? "#FFF" : "rgba(255,255,255,.5)"
                        }]}>
                        Save
                    </Text>
                </TouchableOpacity>
                <KeyboardSpacer />
            </View>
        );
    }
}

export default connect(null, {addToDo, updateTodo})(NewTodo);

var styles = StyleSheet.create({
    saveBtn:{
        width: windowWidth,
        height: 44,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:"#6B9EFA"
    },

    buttonText:{
        fontWeight: "500",
    },

    description: {
        fontSize: 17,
        lineHeight: 38,
        fontFamily: 'Roboto',
        color: "#333333",
        padding: 16,
        paddingLeft:0,
        flex:1,
        height: 200,
        marginBottom:50,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)",
    },

    title: {
        fontWeight: "400",
        lineHeight: 22,
        fontSize: 16,
        fontFamily: 'Roboto',
        height:25+32,
        padding: 16,
        paddingLeft:0
    },
});