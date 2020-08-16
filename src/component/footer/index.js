import React , {  useEffect,useState }from 'react';
import axios from 'axios';
import localhost from '../../_config'
import { Link } from 'react-router-dom';
const Hero=()=>{

    const [redirecturl,setRedirect]=useState(false);
    const [disabled,Setdisabled] =useState(0);
 
    const Submit = function Submit(e){
        
        e.preventDefault();


                var data = [
                    document.getElementById('name_').value,
                    document.getElementById('Mail_').value
                ];

                if(
                    document.getElementById('name_').value != '' &&
                    document.getElementById('Mail_').value != ''
                ){
                    Setdisabled(1);

                    let formData= new FormData();
                    formData.append("text",JSON.stringify(data));
                    const url= localhost+'/controleur.php?p=addNewLetter'; 
                    axios.post(url,formData)
                    .then((res)=>{
                        console.log(res.data)
                        
                        if(res.data === 'add-new-letter-success'){
                            Setdisabled(2);
                        }

                    })
                }
    }

    const btn = function btn(){
        if(disabled === 0){
            return <button   className='btn_login'>S'inscrire</button>
        }else if(disabled === 2){
            return <div className='response-new-letter'><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>Vous ete maintenant abone au new Letter</div>
        }else{
            return <center><img src='/img/gif_footer.gif' style={{width:'5vh'}}/></center>
        }
    }


    const stop=function stop(){
        if(window.location.pathname.split('/')[1] != 'administration'){
            return  <footer>
                <div className='container'>
                    <div className='row'>

                        <div className='col-md-4'>
                            <div className='logo'>
                                <h1>
                                    Facilideal.com
                                </h1>
                            </div>
                        </div>

                        <div className='col-md-3'>
                            <h2>
                                Plan du site 
                            </h2>
                            <ul>
                                <li>
                                    <Link to='/'>
                                        Accuille
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/Boutique'>
                                    Boutique
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/Gagnants'>
                                    Gagnants
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/Contact'>
                                    Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/inscription'>
                                    inscription
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/connexion'>
                                    connexion
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/politique-de-confidentialiter'>
                                     Politique de confidentialiter
                                    </Link>
                                </li>


                            </ul>
                        </div>


                        <div className='col-md-5'>
                            <div className='newLetter'>
                                    <h1>New Letter</h1>
<p>
Votre nom
Votre address mail
Si vous souhaitez vous connecter avec nous, abonnez-vous par e-mail
</p>
                                    <form method="POST" onSubmit={(e)=>{Submit(e)}}>

                                            <label>
                                                Nom
                                            </label>
                                            <input type='text' id="name_"/>

                                            <label>
                                                E-mail
                                            </label>
                                            <input type='email'  id="Mail_"/>

                                        {btn()}

                                    </form>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </footer>
        }
    }

    return (
            <div> 
                {stop()}
            </div>
        ); 
  }
export default Hero;

