import React , {  useEffect }from 'react';
import { Link } from 'react-router-dom';

const loader_with_photo=()=>{

    return (
            <div>
                      
 
                                <div className = "ph-item" style={{backgroundColor:'transparent',border:'none',position:'relative'}}>
                                    <div className = "ph-col-12">
                                            <div className = "ph-row">
                                                    <div className = "ph-col-8 empty"> </div>
                                                    <div className = "ph-col-12"> </div>
                                                     
                                            </div>
                                    </div>
                                </div>
            </div>     
                          
        ); 
  }
export default loader_with_photo;

