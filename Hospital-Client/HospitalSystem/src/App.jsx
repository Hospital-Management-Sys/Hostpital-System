import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Appointment from './components/Appointment'
import Booking from './components/Booking'
 import FindDrs from './components/FindDrs'
  import Doctors from './components/Doctors'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
    <Booking />
     {/* <FindDrs />    */}
    {/* <Doctors /> */}
    {/* <Appointment /> */}
    </div>
  )
}

export default App
