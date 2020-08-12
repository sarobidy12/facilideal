import React , {useEffect, useState} from 'react';
import Moment from 'react-moment';
import 'moment/locale/fr';
import axios from 'axios';
import localhost from '../../_config';
const Temoignage=()=>{

    const [count, setCount] = useState(1);
    const [stop,setStop]=useState(0);

    const [temoignage,setTemaignage] = useState([]);

    useEffect(()=>{

        if(count == 1){
            document.getElementById('All-carousel-temoignage').scrollTo(0,0);
        }else if(count == 2){
            document.getElementById('All-carousel-temoignage').scrollTo(1000,0);
        }else if(count == 3){
            setCount(1);
        } 

            for(var i=0;i < document.getElementsByClassName('btn-fast-temoignage').length;i++){
                document.getElementsByClassName('btn-fast-temoignage')[i].style["background-color"]='#aaa';
            }

                if(document.getElementById('io-'+count)){
                    document.getElementById('io-'+count).style.backgroundColor='rgb(7, 249, 178)';
                }

                setTimeout(()=>{
                    setCount(count + 1);
                },5000)

            getCategorie();
    })

    const getCategorie = function getCategorie(){
        let formData= new FormData();
        formData.append("text",'text');
        const url= localhost+'/controleur.php?p=getTemoignage'; 
        axios.post(url,formData)
        .then((res)=>{

            if(stop === 0){
                setTemaignage(res.data);
                setStop(1)
            }
        });
    }
 
    const all = function all(){

        var data = [];
        for(var i =0; i< temoignage.length;i++){
            data.push(
                <div id='temoignage-content' data-aos='fade-up'>
                        <center>
                            <img src='/img/apostroph.png'/>
                        </center>
                        <ul>
                            {viewStart(temoignage[i].nbr_start)}
                        </ul>
                        <p>
                            {temoignage[i].text_Avis}
                        </p>
                        <h2>
                            {temoignage[i].name_users}
                        </h2>
                        <b>
                            {'le '} 
                            <Moment  fromNow>
                                {temoignage[i].date}
                            </Moment>
                        </b>
                </div>
            )
        }
        return data;
    }

    const viewStart=function viewStart(e){

        var  element=[];
        for(var i=0;i <= 6;i++){
            if(i <= e){
               element.push(
                   <li style={{color:'yellow'}}>
                   <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                   </li>
               )
       
            }else{
               element.push(
                   <li style={{color:'#aaa'}}>
                   <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                   </li>
               )
       
            }
        }
   
        return element;
           
       } 
    return (
            <div>
                 <div className='container'>
                        <div id='temoignage'>
                         <h1><span><img src="/img/commentaire.png"/></span>Retour d'utilisateur</h1>

                        <div id='All-carousel-temoignage'>
                            <div id='carousel-temoignage'>
                                {all()}
                            </div>
                        </div>
                        </div>
                 </div>
                   
            </div>
        ); 
  }
export default Temoignage;

