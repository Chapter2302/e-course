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
            <div className={styles.background}></div>
            <ReactBootstrap.Alert className={styles.alert} variant={type}>
                <h5>{message}</h5>
            </ReactBootstrap.Alert>
        </div>
    )
}

export default Alert