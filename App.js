import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableNativeFeedback, ToastAndroid, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Madoka } from 'react-native-textinput-effects';
import Stack from './src/Stack';

export default class Calculator extends Component {
    constructor(props) {
        super(props)
        this.state = { valueX: "", valueY: "", valueZ: "", valueT: "", valueFormula: "", result: "" }
    }

    _onPressButton = () => {
        Keyboard.dismiss();

        const stack = new Stack(this.state.valueFormula, this.state.valueX, this.state.valueY, this.state.valueZ, this.state.valueT);
        if (stack.validator() == 0) {

            this.setState({ result: parseFloat(stack.calculate()) })

        }
        else {
            this.setState({ result: "-" })
            if (stack.validator() == 4) {
                ToastAndroid.show("You should enter a number into every variable box.", ToastAndroid.SHORT)
            }
            if (stack.validator() == 1) {
                ToastAndroid.show("Formula includes invalid symbol. Valid symbols are 'x,y,z,t,+,-,*,/'.", ToastAndroid.LONG)
            }
            if (stack.validator() == 2) {
                ToastAndroid.show("Invalid form for formula. You should use one and only one operator between each variable.", ToastAndroid.LONG)
            }
            if (stack.validator() == 3) {
                ToastAndroid.show("You should use every variable in formula.", ToastAndroid.SHORT)
            }

        }


    }

    render() {
        return (

            <LinearGradient colors={['#21D4FD', '#B721FF']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }} style={styles.container} contentContainerStyle={styles.content}>
                <KeyboardAvoidingView
                    behavior="position"  >
                    <View style={styles.form}>
                        <Text style={styles.title}>Four Input Formula Calculator</Text>
                        <View style={styles.varInputs}>
                            <Madoka
                                style={styles.input}
                                label={'X'}
                                borderColor={'#aee2c9'}
                                labelStyle={styles.placeholder}
                                inputStyle={{ color: '#f4a197' }}
                                keyboardType={"numeric"}

                                onChangeText={(val) => { this.setState({ valueX: val.trim() }) }}
                            />
                            <Madoka
                                style={styles.input}
                                label={'Y'}
                                borderColor={'#aee2c9'}
                                labelStyle={styles.placeholder}
                                inputStyle={{ color: '#f4a197' }}
                                keyboardType={"numeric"}
                                onChangeText={(val) => { this.setState({ valueY: val.trim() }) }}
                            />
                            <Madoka
                                style={styles.input}
                                label={'Z'}
                                borderColor={'#aee2c9'}
                                labelStyle={styles.placeholder}
                                inputStyle={{ color: '#f4a197' }}
                                keyboardType={"numeric"}
                                onChangeText={(val) => { this.setState({ valueZ: val.trim() }) }}
                            />
                            <Madoka
                                style={styles.input}
                                label={'T'}
                                borderColor={'#aee2c9'}
                                labelStyle={styles.placeholder}
                                inputStyle={{ color: '#f4a197' }}
                                keyboardType={"numeric"}
                                onChangeText={(val) => { this.setState({ valueT: val.trim() }) }}
                            />

                        </View>
                        <View style={styles.formulaContainer}>
                            <Madoka
                                style={styles.formulaInput}
                                label={'Formula'}
                                borderColor={'#aee2c9'}
                                labelStyle={styles.placeholder}
                                inputStyle={{ color: '#f4a197' }}
                                onChangeText={(val) => { this.setState({ valueFormula: val.replace(/\s/g, '') }) }}
                            />

                        </View>
                        <Text style={styles.title}>Result</Text>
                        <Text style={styles.title}>{this.state.result}</Text>
                        <View >
                            <LinearGradient colors={['#f78ca0', '#f9748f']}

                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 0 }} style={styles.SubmitButtonStyle}>
                                <TouchableNativeFeedback
                                    onPress={this._onPressButton}
                                    //  </LinearGradient>
                                    background={TouchableNativeFeedback.SelectableBackground()}>
                                    <View style={styles.gradientButton} >
                                        <Text style={styles.TextStyle} >Calculate</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </LinearGradient>
                        </View>
                    </View>
                </KeyboardAvoidingView >
            </LinearGradient >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
        backgroundColor: 'white',
    },
    content: {
        paddingBottom: 300,
    },
    form: {
        padding: 16,

    },
    input: {
        width: 60,
        marginTop: 4,
        marginRight: 20
    },
    formulaInput: {
        marginTop: 4,
    },
    formulaContainer: {
        flexDirection: "column",

    },
    gradientButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        paddingTop: 15,
        paddingBottom: 15,

    },
    title: {
        paddingBottom: 16,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        opacity: 0.8,
    },
    SubmitButtonStyle: {
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 40,
        marginRight: 40,
        borderColor: "transparent"
    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        opacity: 0.8,
    },

    placeholder: {
        color: '#fff',
        fontWeight: 'bold',
        opacity: 0.8,
    },

    varInputs: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});