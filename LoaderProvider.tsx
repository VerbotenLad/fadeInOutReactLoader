import { useContext } from 'wherever/whatever/whichever';
import React, { FC, useEffect, useState } from 'react';

export const LoaderProvider: FC = ({ children }) => {
  const { isLoading } = useMeta();
  return (
    <>
      <div className={`loader-container ${isLoading ? 'active' : ''}`}>
        <div className="loader-block">
          {/* <div className="loader-title">loading</div> */}
          <Spinner loading={isLoading}/>
        </div>
      </div>
      {children}
    </>
  );
};
//opaqueBool must be global.
//React components are kinda reset/refreshed when you do use effect.
//So if you need this to maintain value beyond the useEffect loop.
//then you gotta keep it out here bro
let opaqueBool = true
export const Spinner = (props) => {
  const [opacity, setOpacity] = useState(0)
  const animationEffectFuncMin = () => {
      setOpacity(opacity - 0.01)
      //console.log("Decreased: ", opacity);

  }
  const animationEffectFuncMax = () => {
      setOpacity(opacity + 0.01)
      //console.log("Increased: ", opacity);
  }
  
  useEffect(()=> {
    if (props.loading){
      if(opaqueBool){
        if(parseFloat(opacity.toFixed(2)) >= 0.00 && parseFloat(opacity.toFixed(2)) < 1.01){ 
          let myTimeOutMax = setTimeout(animationEffectFuncMax, 20)
          if(parseFloat(opacity.toFixed(2)) === 1.00){
            //console.log("DONE ++++++++++++ === ", opacity);
            opaqueBool = false;
            
          }
        }
      }
      if(!opaqueBool){
        if(parseFloat(opacity.toFixed(2)) <= 1.00 && parseFloat(opacity.toFixed(2)) > -0.99){
          let myTimeOutMin = setTimeout(animationEffectFuncMin, 20)
          if(parseFloat(opacity.toFixed(1)) === 0.0){
            opaqueBool = true
            //console.log("DONE ---------- === ", opacity); 
          }
        }
      }
    }
    
  }, [opacity, props.loading])
  
  return (
    <div className='logo_wrapper' style={{width:'150px', height: '150px', position:'relative'}}>
      <img src={'assets2/images/logo/logo.svg'} style={{width:'150px', height: '150px', position:'absolute', opacity: `${opacity}` ,top: '0', right: '0', left: '0', bottom: '0', zIndex: '1000000001'}} className='loading_logo' alt='loading_logo'/>
      <div style={{width:'150px', height: '150px', position:'absolute', top: '0', right: '0', left: '0', bottom: '0', opacity: '1', backgroundColor: 'transparent', zIndex: '1000000002'}} />
      <div style={{width:'150px', position:'absolute', top: '155px', right: '0', left: '0', bottom: '0', backgroundColor: '#fff', zIndex: '1000000003'}} />
    </div>
  );
};
