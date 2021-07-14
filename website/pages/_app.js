import React, {useEffect} from 'react'
import { loadScript } from './util'
import { Provider } from 'react-redux'
import ChatWindow from '../component/ChatWindow'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import store from '../store'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.onload = loadScript() 
  }, [Component])
  
  return (
    <div className="wrapper" id="wrapper">
      <Provider store={store}>
        <Component {...pageProps} />
        <ChatWindow />
        <ToastContainer />
      </Provider>
      <span id='external-scripts'></span>
    </div>
  )
}

export default MyApp
