import React , {Component, useEffect,useState }from 'react';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import Footer from '../footer/index';
import { withCookies, Cookies } from 'react-cookie';
import Iframe from 'react-iframe'

class Mission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reset:true
        };
      }

    componentWillMount=()=>{
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
    }

  iframe=()=>{

    const { cookies } = this.props;
    
    if(this.state.reset){
            if(window.location.pathname.split('/')[2] == 'offertoro'){

                return  <Iframe 
                            url={"https://www.offertoro.com/ifr/show/19324/"+cookies.get('_lo').id+"/7155"}

                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if(window.location.pathname.split('/')[2] == 'Adworkmedia'){

                return  <Iframe 
                            url={"https://adscendmedia.com/adwall/publisher/110911/new/profile/13208?subid1="+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if (window.location.pathname.split('/')[2] == 'kiwiwall'){

                return  <Iframe 
                            url={"https://www.kiwiwall.com/wall/YKDHIm3WzFwpKtrWTxeVpiAacPlUjZoQ/"+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if(window.location.pathname.split('/')[2] == 'Wannads'){

                return  <Iframe 
                            url={"https://wall.wannads.com/wall?apiKey=5abca9d4501af074778845&userId="+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if(window.location.pathname.split('/')[2] == 'adworkmedia'){

                return  <Iframe
                            url={"http://lockwall.xyz/wall/41q/"+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if (window.location.pathname.split('/')[2] == 'Ptcwall'){

                return  <Iframe 
                            url={"http://www.ptcwall.com/index.php?view=ptcwall&pubid=gxqb86469i36vh966z&usrid="+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if(window.location.pathname.split('/')[2] == 'personaly'){

                return  <Iframe
                            url={"https://persona.ly/widget/?appid=91600366dbf74a5808b266c87c32313f&userid="+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if(window.location.pathname.split('/')[2] == 'Superrewards'){

                return  <Iframe 
                            url={"https://wall.superrewards.com/super/offers?h=uebrmznlgmm.682401188058&uid="+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if(window.location.pathname.split('/')[2] == 'clixwall'){

                return  <Iframe
                            url={"http://www.clixwall.com/wall.php?p=LM3Q4-C4KR7-HE0XE&u="+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class"
                        />

            }else if (window.location.pathname.split('/')[2] == 'offerwolf'){

                return  <Iframe 
                            url={"https://ads.offerwolf.com/wall/?idUser=112&appId=72&subid="+cookies.get('_lo').id}
                            width="100%"
                            height="450px"
                            className="ifram-class" 
                            
                        />

            }
    }

  }
                
  render() {

    return (
            <div style={{width:'100%',overflowX:'hidden',overflowY:'hidden'}}> 
                <MetaTags>
                    <title> offerwall</title>
                    <meta property="og:type"          content="website" />
                    <meta property="og:title"         content="offerwall" />
                    <meta property="og:description"   content="Parcourez nos offres en ligne et soyez payé pour effectuer des tâches afin de gagner des points GPT. Essayez autant de types d'offres différents que possible pour voir ce que vous pouvez accomplir chaque jour pendant votre temps libre." />
                    <meta property="og:image"         content="http://facilodeal.com/img/Mission.ng" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                    <meta property="og:image:width"         content="1200" />
                    <meta property="og:image:height"         content="630" />
                </MetaTags>
                        
                <div className='offewall-content'>
                        <dic className='row'>
                            <div className='col-md-2 media-max-view'>
                            <Link to='/offerwalls/Superrewards'
                                onClick={()=>{
                                    this.setState({
                                        reset:false
                                        
                                    })

                                    setTimeout(()=>{
                                        this.setState({
                                            reset:true
                                        })
                                    },100)
                                }}

                            >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/1.png'/>
                                    </div>
                                </Link>
                                <Link to='/offerwalls/clixwall'
                                   onClick={()=>{
                                    this.setState({
                                        reset:false
                                        
                                    })

                                    setTimeout(()=>{
                                        this.setState({
                                            reset:true
                                        })
                                    },100)
                                }}
                                >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/2.png'/>

                                    </div>
                                </Link>
                                <Link to='/offerwalls/Adworkmedia'
                                   onClick={()=>{
                                    this.setState({
                                        reset:false
                                        
                                    })

                                    setTimeout(()=>{
                                        this.setState({
                                            reset:true
                                        })
                                    },100)
                                }}
                                >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/3.png'/>
                                    </div>
                                </Link>
                                <Link to='/offerwalls/personaly'
                                   onClick={()=>{
                                    this.setState({
                                        reset:false
                                        
                                    })

                                    setTimeout(()=>{
                                        this.setState({
                                            reset:true
                                        })
                                    },100)
                                }}
                                >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/4.png'/>
                                    </div>
                                </Link>
                                <Link to='/offerwalls/Ptcwall'
                                
                                onClick={()=>{
                                    this.setState({
                                        reset:false
                                        
                                    })

                                    setTimeout(()=>{
                                        this.setState({
                                            reset:true
                                        })
                                    },100)
                                }}
                                >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/5.png'/>
                                    </div>
                                </Link>
                                <Link to='/offerwalls/kiwiwall'
                                   onClick={()=>{
                                    this.setState({
                                        reset:false
                                        
                                    })

                                    setTimeout(()=>{
                                        this.setState({
                                            reset:true
                                        })
                                    },100)
                                }}
                                >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/6.png'/>
                                    </div>
                                </Link>
                                <Link to='/offerwalls/offertoro'
                                   onClick={()=>{
                                        this.setState({
                                            reset:false
                                        })

                                        setTimeout(()=>{
                                            this.setState({
                                                reset:true
                                            })
                                        },100)
                                    }}
                                >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/7.png'/>
                                    </div>
                                </Link>
                                <Link to='/offerwalls/Wannads'
                                    onClick={()=>{
                                        this.setState({
                                            reset:false
                                        })

                                        setTimeout(()=>{
                                            this.setState({
                                                reset:true
                                            })
                                        },100)
                                    }}
                                >
                                    <div className='offerwall-view-all'>
                                        <img src='/img/offerwall/8.png'/>
                                    </div>
                                </Link>
                            </div>
                            <div className='col-md-10'>
                                {this.iframe()}
                            </div>
                        </dic>
                </div>
              
            <Footer />

        </div>

        ); 
  }
}
export default withCookies(Mission);

