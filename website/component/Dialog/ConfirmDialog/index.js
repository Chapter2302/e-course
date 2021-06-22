import { Modal } from "react-bootstrap"
import styles from './index.module.scss'
import cx from 'classnames'

const ConfirmDialog = (props) => {
    const { children, title, show, handleConfirm, handleClose } = props
    return(
        <Modal 
            show={show} 
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn" onClick={handleClose}>
                    <b>Cancel</b>
                </button>
                <button className={cx(styles.confirmButton, "btn")} onClick={handleConfirm}>
                    <b>Confirm</b>
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDialog