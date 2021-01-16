import {useEffect, useState} from "react"
import {Modal} from "react-bootstrap"
import styled from "styled-components"
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

const MessageBox = styled.div`
    height: 300px;
    overflow: auto;
`
const Message = (props) => {
    return(
        <div
            className={
                props.host 
                ? "d-flex align-items-center justify-content-end"
                : "d-flex align-items-center justify-content-start"
            }
        >
            <div 
                className = {
                    props.host  
                    ? "d-flex justify-content-end order-2 ml-3" 
                    : "d-flex justify-content-start order-1 mr-3"
                }
            >
                <img className="rounded-circle" src={props.image ? props.image : "https://source.unsplash.com/fn_BT9fwg_E/60x60"} width="45" height="45" alt=""/>
                <div className="status-indicator bg-success"></div>
            </div>
            <div 
                className = {
                    props.host 
                    ? "font-weight-bold order-1"
                    : "font-weight-bold order-2"
                }
            >
                <div style={{textAlign: props.host ? "right" : "left"}}>{props.name}</div>
                <div style={{textAlign: props.host ? "right" : "left"}} className="small text-gray-500">
                    {props.content}
                </div>
            </div>
        </div>
    )
}

const ChatModal = (props) => {
    const socket = socketIOClient(ENDPOINT);
    const [sendMessage, setSendMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const _user = JSON.parse(localStorage.getItem("session"))
        if(_user) setUser(_user)
    }, []);

    useEffect(() => {
        if(user !== null) { 
            socket.emit('joinRoom', { userID: user.id })
            socket.on("message", data => {
                console.log("recie: ", data)
                const message = <Message host={false} image={data.senderPhoto} name={data.senderName} content={data.message}/>
                setMessageList(oldMessageList => [...oldMessageList, message])
            });
        }
    }, [user])

    return(
        <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered >
            {
                user === null 
                ? <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Chat With Admin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Sorry, you should login to chat with us!
                    </Modal.Body>
                    <Modal.Footer> </Modal.Footer>
                </> 
                : <>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Chat With Admin
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MessageBox>
                            {messageList ? messageList.map(mess => {return mess}) : <></>}
                        </MessageBox>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="input-group">
                            <input type="text" className="form-control" 
                                value={sendMessage} 
                                onChange={e => {setSendMessage(e.target.value) }}
                            />
                            <div className="input-group-append">
                                <button 
                                    className="btn btn-primary" type="button"
                                    onClick={
                                        () => {
                                            if(sendMessage != '') 
                                                socket.emit('message', {message: sendMessage, recieverID: props.recieverID, userID: user.id, userName: user.fullName, userPhoto: user.photoUser})
                                            setSendMessage('')
                                            const message = <Message host={true} name={user.fullName} content={sendMessage} image={user.photoUser}/>
                                            setMessageList(oldMessageList => [...oldMessageList, message])
                                        }
                                    }
                                >
                                    Send
                                </button>
                            </div>
                        </div> 
                    </Modal.Footer>
                </>
            }
        </Modal>
    )
}

export default ChatModal