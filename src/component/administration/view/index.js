import React , {useEffect,useState} from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/fr';
import cookie from 'cookie';
import NavAdmin from './nav';
import MetaTags from 'react-meta-tags';

const IndexAdmin=()=>{

    useEffect(()=>{
        cookie.serialize('foo', 'bar');
    })
    
    return (
            <div> 
                 <MetaTags>
                    <title>Administration</title>
                </MetaTags>
                <NavAdmin />

                <div className='container-admin' data-aos="fade-left">
              
                </div> 
            </div>
        ); 
  }
export default IndexAdmin;

