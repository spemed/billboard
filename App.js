import React, { Component } from 'react';
import configAppNavigator from './src/pages/nav';
import UserStorage from "./src/utils/token"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }

  async componentDidMount() {
    this.setState({
      isLoggedIn:await UserStorage.getToken() === "" ? false : true
    })
  }

  render() {
    const { isLoggedIn } = this.state;
    const AppNavigator = configAppNavigator(isLoggedIn);
    return (
        <AppNavigator/>
    )
  }
}


