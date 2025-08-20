import React from 'react'
import Save from './Save'
function AnotherPage1({passingThings}) {
  return (
    <div>
        This Is From AnothePage 1
      <Save passingThings={passingThings}/>
    </div>
  )
}

export default AnotherPage1
