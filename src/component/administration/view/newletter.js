import React , {useEffect,useState} from 'react';
import axios from 'axios';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom'; 
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const IndexAdmin=()=>{

     
    
    return (
            <div> 
                 <MetaTags>
                     <title>Administration | New letter </title>
                </MetaTags>

                    <div className='container-admin' data-aos="fade-left">
                        <div id='titre-admin' >
                            <h1><span class="glyphicon glyphicon-send"  aria-hidden="true"></span><b>New Letter</b></h1>
                        </div>
                        <div class='form-group'>
                      <label for="renumeration">Object</label>
                      <input type="text"   placeholder='cc'  step="1" style={{width:'100%'}} id="nouveaux" name="nouveaux" />
                  </div>

               

                  <div class='form-group'>
                      <label for="description">Votre message</label>
                      <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor 5!</p>"
                            onInit={ editor => {
                        //       You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            }}

                           
                       />
                    
                        </div>
                        <button  className='btn btn-primary'>
                            Envoyer
                        </button>
                    </div>
            </div>
        ); 
  }
export default IndexAdmin;

