import React from 'react'
import About from './About'
function AnotherPage({passingThings}) {
  return (
    <div>
        This is From AnotherPage
      <About PassingToAbout={passingThings}
      name="hello this is from name 1"
      isTrue={false}/>
      <About PassingToAbout={passingThings}
      name="hello this is from name 2"
      isTrue={false}/>
      <About PassingToAbout={passingThings}
      name="hello this is from name 3"
      isTrue={false}/>
      
    </div>
  )
}

export default AnotherPage
