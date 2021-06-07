import React from 'react';
import '../test.css';
import luck from '../../assets/goodluck.jpg'
const Start = ({ onQuizStart }) => {

  return(
    <div className="card" style={{ background : 'white' ,width:'700px',textAlign: 'center'}}>
      <div className="card-content"  >
        <div className="content">
          <br></br>          <br></br>
          <br></br>
          <br></br>
          <img style={{  width:'350px' ,borderStyle:'outset'}} src={luck} alt='hamma'></img>
          <br></br>
          <br></br>

          <h1>Start the quiz</h1>
          <p>Good luck!</p>
          <br></br>

          <button  style={{ color : 'white' , fontSize:'13px',lineHeight:'1.7',marginLeft:'115px' }} className="btn" onClick={onQuizStart
}>Start</button>
<br></br><br></br>
<br></br>

        </div>
      </div>
    </div>
  );
}

export default Start;