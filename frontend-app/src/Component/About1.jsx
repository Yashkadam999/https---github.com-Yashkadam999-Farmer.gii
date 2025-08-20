import React from 'react'
import AnotherPage1 from './AnotherPage1'
function About1({passingThings}) {
  return (
    <div>
        This Is From About 
      <AnotherPage1 PassingToAbout={passingThings}/>
    </div>
  )
}

export default About1
