import Activity from "../activity"
import Merchants from "../merchants"
import Personal from "../personal"
import SignUp from "../signUp"
import Goto from "../goto"
import TaskDetail from "../taskDetail"
import GoodsDetail from "../goodsDetail"
import Address from "../address"
import AddAddress from "../address/add"
import ModifyAddress from "../address/modify"
import Myself from "../myself"
import Test from "../test/geo"
import Publish from "../publish"
import ActivityCompleted from "../activity/completed"
import ActivityDetail from "../activity/detail"
import ExchangeRecord from "../exchangeRecord"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Colors from "../../constants/colors"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from "../login";

export const BottomTab = createAppContainer(
  createBottomTabNavigator(
    {
      /*Page1路由*/
      Activity: {
        /*Page1页面*/
        screen: Activity,
        /*屏幕导航选项,可以定制导航器显示屏幕的方式（头部标题，选项卡标签等）*/
        navigationOptions: {
          /*导航标签名*/
          tabBarLabel: '活动中心',
          /*导航呈现的图标*/
          tabBarIcon: ({tintColor, focused}) => (
            /*第三方图标库（图标名称，图标大小，图标样式*/
            <MaterialIcons
              name={'home'}
              size={26}
              style={{ color: Colors.tab.activeColor }}
            />
          ),
        },
      },
      Merchants: {
        screen: Merchants,
        navigationOptions: {
          tabBarLabel: '商家列表',
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
              name={'location-on'}
              size={26}
              style={{ color: Colors.tab.activeColor }}
            />
          ),
        },
      },
      SignUp: {
        screen: SignUp,
        navigationOptions: {
          tabBarLabel: '我要打卡',
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
              name={'assignment'}
              size={26}
              style={{color: Colors.tab.activeColor}}
            />
          ),
        },
      },
      Personal: {
        screen: Personal,
        navigationOptions: {
          tabBarLabel: '个人主页',
          tabBarIcon: ({tintColor, focused}) => (
            <MaterialIcons
              name={'perm-identity'}
              size={26}
              style={{color: Colors.tab.activeColor}}
            />
          ),
        },
      },
    },
    {
      tabBarOptions: {
        /*设置活动选项卡标签的颜色*/
        activeTintColor: Platform.OS === 'ios' ? '#06C1AE' : Colors.tab.activeColor,
        indicatorStyle:{
            backgroundColor: "red",
            height:5
        },
        // labelStyle:{
        //     backgroundColor:"black"
        // },
        style:{
            backgroundColor:"white",
        }
      },
    },
  ),
);

const StackRouter = createStackNavigator({
  Home: {
    screen: BottomTab,
    navigationOptions: {
      headerShown: false, 
    },
  },
  Merchants: {
    screen: Merchants,
    navigationOptions: {
      headerShown: false, 
    },
  },
  Goto: {
    screen: Goto,
    navigationOptions: {
      headerShown: false, 
    },
  },
  TaskDetail: {
    screen: TaskDetail,
    navigationOptions: {
      headerShown: false, 
    },
  },
  GoodsDetail: {
    screen: GoodsDetail,
    navigationOptions: {
      headerShown: false, 
    },
  },
  Address: {
    screen: Address,
    navigationOptions: {
      headerShown: true,
      title:"地址",
    },
  },
  Myself: {
    screen: Myself,
    navigationOptions: {
      headerShown: true,
      title:"个人信息",
    },
  },
  Publish: {
    screen: Publish,
    navigationOptions: {
      headerShown: true,
      title: "发表感想",
    },
  },
  AddAddress: {
    screen: AddAddress,
    navigationOptions: {
      headerShown: true,
      title: "添加收货地址",
    },
  },
  ModifyAddress:{
    screen: ModifyAddress,
    navigationOptions: {
      headerShown: true,
      title: "编辑收货地址",
    },
  },
  ExchangeRecord:{
    screen: ExchangeRecord,
    navigationOptions: {
      headerShown: false,
    },
  },
  Activity:{
    screen:Activity,
    navigationOptions: {
      headerShown: false,
    },
  },
  ActivityCompleted:{
    screen:ActivityCompleted,
    navigationOptions: {
      headerShown: false,
    },
  },
  ActivityDetail:{
    screen:ActivityDetail,
    navigationOptions: {
      headerShown: false,
    },
  }
});


export default function configAppNavigator(isLoggedIn) {
  const Nav = createAppContainer(
    createSwitchNavigator(
      {
        Login: {
          screen: Login,
          navigationOptions: {
            headerShown: false, 
          },
        },
        StackRouter:{
          screen: StackRouter,
          navigationOptions: {
            headerShown: false, 
          },
        },
        Test: {
          screen: Test,
          navigationOptions: {
            headerShown: false, 
          },
        },
        ExchangeRecord:{
          screen: ExchangeRecord,
          navigationOptions: {
            headerShown: false,
          },
        }
        // Myself: {
        //   screen: Myself,
        //   navigationOptions: {
        //     headerShown: true,
        //     title:"个人信息",
        //   },
        // },
      },
      {
        //initialRouteName: !isLoggedIn ? 'Login' : 'StackRouter',
        initialRouteName: !isLoggedIn ? 'Login' : 'StackRouter',
      },
    ),
  );
  return Nav
};

