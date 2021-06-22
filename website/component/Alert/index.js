import * as ReactBootstrap from "react-bootstrap" 
import styles from './index.module.scss'
import cx from 'classnames'

const Alert = (props) => {
    const { type, message } = props
    return (
        <div 
            className={cx(
                styles.container,
                {[styles.isActive]: type && message}
            )}
        >
            <ReactBootstrap.Alert variant={type}>
                <b>{message}</b>
            </ReactBootstrap.Alert>
        </div>
    )
}

export default Alert