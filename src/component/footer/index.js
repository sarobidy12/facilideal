import React , {Component,  useEffect,useState }from 'react';
import axios from 'axios';
import localhost from '../../_config'
import { Link } from 'react-router-dom';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: 0,
            open:false
        };
    }
      
    Submit = function Submit(e){
        
        e.preventDefault();

                var data = [
                    document.getElementById('name_').value,
                    document.getElementById('Mail_').value
                ];

                if(
                    document.getElementById('name_').value != '' &&
                    document.getElementById('Mail_').value != ''
                ){

                    this.setState({
                        disabled:1
                    })

                    let formData= new FormData();
                    formData.append("text",JSON.stringify(data));
                    const url= localhost+'/controleur.php?p=addNewLetter'; 
                    axios.post(url,formData)
                    .then((res)=>{
                        
                        if(res.data === 'add-new-letter-success'){
                            this.setState({
                                disabled:2
                            })
                        }

                    })
                }

    }

    btn = function btn(){
        if(this.state.disabled === 0){
            return <button   className='btn_login'>S'inscrire</button>
        }else if(this.state.disabled === 2){
            return <div className='response-new-letter'><span class="glyphicon glyphicon-ok" aria-hidden="true"></span>Vous ete maintenant abone au new Letter</div>
        }else{
            return <center><img src='/img/gif_footer.gif' style={{width:'5vh'}}/></center>
        }
    }

    componentDidUpdate=()=>{
        if(this.state.open === false){
            $(findDOMNode(document.getElementById('plan'))).slideUp(1);
            $(findDOMNode(document.getElementById('newLetter'))).slideUp(1);
            $(findDOMNode(document.getElementById('apropos'))).slideUp(1);
       }
    }


    stop=function stop(){
        if(window.location.pathname.split('/')[1] != 'administration'){
            return  <footer>
                <div className='container'>

                            <div className='logo'>
                                <h1>
                                    Facilideal.com
                                </h1>
                            </div>

                        <div className='btn-footer' 
                                onClick={()=>{
                                    this.openPlan()
                                }}
                        >
                            <h2>
                                Plan du site 
                            </h2>
                            <span id='plan-gliph' class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </div>
                           
                            <div id='plan'>
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
                                


                            </ul>
                            </div>
                            <div className='btn-footer'
                                onClick={()=>{
                                    this.openPropos()
                                }}
                            >
                            <h2>
                              A propos 
                            </h2>
                            <span id='apropos-gliph' class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            </div>

                            <div id='apropos'>
                                <ul>
                                    <li>
                                        <Link to='/politique-de-confidentialiter'>
                                            Politique de confidentialiter
                                        </Link>
                                    </li>
                                </ul>

                            </div>

                            <div className='btn-footer'
                                onClick={()=>{
                                    this.openNew()
                                }}
                            >
                            <h2>
                                New letter
                            </h2>
                            <span id='new-gliph' class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        </div>
                        <div id='newLetter'>
                        <div className='newLetter'>
                                    <h1>New Letter</h1>
                                            <p>
                                            Votre nom
                                            Votre address mail
                                            Si vous souhaitez vous connecter avec nous, abonnez-vous par e-mail
                                            </p>
                                    <form method="POST" onSubmit={(e)=>{this.Submit(e)}}>

                                            <label>
                                                Nom
                                            </label>
                                            <input type='text' id="name_"/>

                                            <label>
                                                E-mail
                                            </label>
                                            <input type='email'  id="Mail_"/>

                                        {this.btn()}

                                    </form>
                        </div>
                        </div>


                        </div>
                    
            </footer>
        }
    }

    openPlan=()=>{

            const el= findDOMNode(document.getElementById('plan'));
             this.setState({
                 open:true
             })
             document.getElementById('plan-gliph').classList.toggle('rotate');
                $(el).slideToggle();
    }

    
    openNew=()=>{

        const el= findDOMNode(document.getElementById('newLetter'));
         this.setState({
             open:true
         })
         document.getElementById('new-gliph').classList.toggle('rotate');
            $(el).slideToggle();
    }

    openPropos=()=>{

        const el= findDOMNode(document.getElementById('apropos'));
         this.setState({
             open:true
         })
         document.getElementById('apropos-gliph').classList.toggle('rotate');
            $(el).slideToggle();
    }



    render() {

        return (
                <div> 
                    {this.stop()}
                </div>
            ); 
    }

}
export default Footer;

