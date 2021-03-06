
import React ,{ forwardRef ,useDebugValue,useEffect,useState}  from 'react'
import logo from '../assets/pdp.png'
import Auxiliary from '../Auxiliary'
import './company.css'
import RatingPopup from './RatingPopup'

import '../Company/RatingPopup.css'
import {url} from '../BaseUrl'
import axios from 'axios' ;
import {FaStar} from "react-icons/fa";

const RatingCmp = forwardRef((props) => {
    const [posts, setPosts] = useState([])
   // const idCompany = localStorage.getItem('cmp')
   let nomCmp=props.location.pathname.split('/')[2];
   const userr = localStorage.getItem('user')
   const currentUser = JSON.parse(userr);

   useEffect(() => {
      
    axios.get(`${url}avis/e/${nomCmp}`).then( res => {
        console.log(res.data)
        setPosts(res.data)
       }) 

    
        
}        
,[])
 
      

        
const [buttonPopup,setButtonPopup] = useState(false);
   let s = 0;
   let l,avg = 0;
   let result ;

   const compare = () => {
    if (avg <= 1) {
        result = 1;
      } else if (avg <= 2) {
        result = 2;
      } else if (avg <= 3) {
        result = 3;
      } else if (avg <= 4) {
        result = 4;
      } else if (avg > 4) {
        result = 5;
      } else {
        result = 1;
      }
      return result
}
const [rating ,setRating] = useState(null);
const [hover,setHover] =useState(null);
const [comment, setComment] = useState('');
const [erreur, setErreur] = useState('');
const RateFn = (e) => {
 
    e.preventDefault();
    if((comment !=="")&&(rating>0))
    {
    axios.post(`${url}avis/newAvis`, {
        niveau: rating,
          commentaire: comment,
          entreprise: nomCmp,
          personne: currentUser.username
      })
    
      .then( (response)=>{
        setComment("")
      setRating(0)
        console.log(response.data)

      }
      , (error) => {
        console.log(error);
      });
    }

else{
  setErreur("Empty Comment or Stars !  ")
}

}
    return (
        
       <Auxiliary>
    
<div className='company_description' style={{height:'1000px'} }> 

        
         
<div className='absolute'> 
<h3>Rate this Company!</h3>
<form>
  
                  <div>
                      {[... Array(5)].map((star,i)=>
                      {
                          const ratingValue = i + 1;
                       return  (  <label ><input type="radio" name="rating" hidden="true" value ={ratingValue}
                        onClick={()=>(setRating(ratingValue))}
                       /> 
                       <FaStar className="star" color ={ratingValue <= (hover ||rating) ?"#ffc107":"#e4e5e9"}
                       size={15}
                       onMouseEnter={()=>setHover(ratingValue)}
                       onMouseLeave = {()=> setHover(null)}/>
                       </label>


    );}) }     
                    </div>
                  
                    <input value={comment} onChange={e => setComment(e.target.value)}  type="text"/>
               <br></br>  
                <input value={erreur} onChange={e => setErreur(e.target.value)}  type="text" style ={{border:'none',color:'red'}}disabled/>
                <br></br> <button type="submit" style={{ color : 'white' , fontSize:'13px',lineHeight:'1.7' }} className="btnAvis" onClick={
   
        
        (e)=>RateFn(e)}>rate</button>
<br></br>

                    </form>
       <RatingPopup
trigger={buttonPopup} setTrigger = {setButtonPopup}>
           <h3>Rating </h3>
       </RatingPopup>
        </div>       
  
<main>
      
        </main>

   
    
    <h6 className='hide'>  {posts.map(
        ({niveau }) =>
                      {
                          s+=niveau

                          l=posts.length




                       
                      
                         
                      })  }</h6>
  
  <h6 className='hide'> 

  {avg = s/l ,compare()  }</h6>
 

    

    <h3><div> Total Ratings:    
                      {[... Array(result)].map((star,i)=>
                      {
                          const ratingValue = i + 1;
                       return  (  <label >
                         
                       <FaStar className="star" color ="#ffc107"
                       size={15}
                     />
                       </label>


    );}) }   

                    </div>
                    <br></br>
                    Comments  :</h3>
                    
                   
    
    {posts.map(
        ({commentaire,niveau ,personne}) =>
                      {
                         



                       
                      
                         
                       return  (  <p id = "comment" style={{borderRadius:'8px',height:'95px',width:'230px',paddingLeft:'50px'}}>
<h3> 
                        
<img className=' imgCircleComment' src={logo} style={{width:'25%'} }></img>&nbsp;&nbsp;

{personne} </h3>


<div className='starsComment'>
                      {[... Array(niveau)].map((star,i)=>
                      {
                          const ratingValue = i + 1;
                       return  (  <label >
                       <FaStar className="star" color ="#ffc107"
                       size={15}
                     />
                       </label>


    );}) }   
                    </div>   
                    <br></br>                      {commentaire}</p>
                       
                       


    );})  }
  
        
 
    
  
</div>
  
        
 
</Auxiliary>
    

    )

})


export default  RatingCmp