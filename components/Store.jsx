import styles from '../styles/Store.module.css';

export default function Store(props) {
    return (
        <a target='_blank' href={props.url} className={styles.card} rel="noreferrer">
            <h2>{props.name} &rarr;</h2>
            {props.unavailable ? <p>No disponible</p> : <p><b>Disponible</b></p>}
        </a>
    );
}