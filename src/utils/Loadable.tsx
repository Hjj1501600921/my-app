import React from "react";
import  Loadable , { LoadingComponentProps }  from "react-loadable";

function myLoading (props:LoadingComponentProps) {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  } else if (props.pastDelay) {
    return <div>Loading...</div>;
  } else {
    return null;
  }
}
export default (loader:any,loading = myLoading ) => {
 return Loadable({
    loader,
    loading
  })
}