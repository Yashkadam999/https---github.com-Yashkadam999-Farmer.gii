import React from 'react'
import AnotherPage from './AnotherPage'
import CallingFun from './CallingFun'
import Main from './Interactive/Main'
import LightSwitch from './Interactive/LightSwitch'
import ColorSwitch from './Interactive/ColorSwitch'
import Color from './Color'
import Gallery from './Interactive/UseState'
import ObjectUpdate from './Interactive/ObjectUpdate'
import Scoreboard from './Interactive/Count'
import ShoppingCart from './Interactive/Array'
import UpdatatingArray from './Interactive/Update1'
import MainReducer from './Reducer/MainReducer'
import TaskReducder from './Reducer/TaskReducder'
import { useContext } from 'react'
import { ContextStore } from './Interactive/UseContext/ContextApi'
function Homes(passingThings) {
  const {passCon}=useContext(ContextStore)
  return (
    <div class Name='hello'>
      This Is Home Component
      {/* <AnotherPage passingThings={passingThings}/> */}
       {/* <CallingFun passingThings={passingThings}/> */}
       {/* <Main/> */}
       <h1>Light Toggle</h1>
      {/* <LightSwitch /> */}
      {/* <Color/> */}
      {/* <Gallery/> */}
      {/* <ObjectUpdate/> */}
      {/* <Scoreboard/> */}
      {/* <Canvas/> */}
      {/* <UpdatatingArray/> */}
      {/* <UpdatatingArray/> */}
      {/* <ShoppingCart/> */}
      {/* <TaskReducder/> */}
          </div>
  )
}

export default Homes
