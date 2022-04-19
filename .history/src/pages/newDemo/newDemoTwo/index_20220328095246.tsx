import React from "react"
import AMapLoader from '@amap/amap-jsapi-loader';
import './MapContainer.css';
import "./index.less"
function NewDemoTwo () {
//地图api
var map = new AMap.Map('container');

  return (
    <>
     <div id="container" className="map" style={{ height: '800px' }} > 
              </div>
    </>
  )
}

export default NewDemoTwo