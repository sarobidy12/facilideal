import React , {  useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";
import localhost from '../../_config'
import Empiler from "../cashback/loader/empiler";
import MetaTags from 'react-meta-tags';
import Footer from '../footer/index';

const Contact=()=>{
        
     

     
    return (
            <div> 
                <MetaTags>
                    <title> Contact</title>
                </MetaTags>
                <div id='login_register'>
                    <div className='container'>
                        <div className='row'>
                   
                            <div className='col-md-6' data-aos='fade-in'>
                                    <img src='/img/contact.png'/>
                            </div>

                            <div className='col-md-6' data-aos='fade-in'>

                                <div className='contact'>
                                    <h1>
                                        Nous contacter
                                    </h1>

                                        <div className='row'>

                                            <div className='col-md-6'>
                                                    <label>Objet</label>
                                                    <div className='form-group'>
                                                        <input type='text' style={{width:'100%',border:'1px solid block'}} name='email' />
                                                    </div>
                                            </div>

                                            <div className='col-md-6'>
                                                    <label>Addres mail</label>
                                                    <div className='form-group'>
                                                        <input type='email' style={{width:'100%',border:'1px solid block'}} name='email' />
                                                    </div>
                                            </div>

                                            <div className='col-md-12'>
                                                <label>Addres mail</label>
                                                <textarea>
                                                    Votre message
                                                </textarea>
                                                <button className='btn_login'>
                                                    Envoyer
                                                </button>
                                        
                                            </div>

                                         
                                        </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <Footer/>

                </div>

            </div>

        ); 
  }
export default Contact;

