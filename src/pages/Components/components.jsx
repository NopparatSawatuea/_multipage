
import React from 'react'




import './components.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Timer from '../../components/Timer/Timer';
import Add from '../../components/Add/Add';
import Counter from '../../components/Counter/Counter';
import Temperatures from '../../components/Temperatures/Temperatues';


function Component() {
  // const [count, setCount] = useState(0)

  return (
   <div className='main-container'>
      <h1 className='main-title'>REACT COMPONENTS</h1>
      <div><Counter name={'HELLO EVERYONE'} value={''}/> 
          <Timer/>
        <div><Add/></div>
      </div>
      <Temperatures/>
      
      <h3 className='main-footer'>นพรัตน์ สวัสดิ์เอื้อ รหัส 66050180</h3>                               

   </div>
  )
}

export default Component
