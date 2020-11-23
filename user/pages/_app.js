import React, {useEffect} from 'react'
import { loadScript } from './util'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.onload = loadScript() 
  }, [Component])
  
  return (
    <div className="wrapper" id="wrapper">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <span id='external-scripts'></span>
    </div>
  )
}

export default MyApp
