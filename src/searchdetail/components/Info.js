import styles from '../css/Info.module.css';

function Info({direction, infoState, content}) {
    const infoActive = {position: "fixed", opacity: 1, left: (direction.x-170), top: (direction.y+25)};
    const infoInactive = {position: "absolute", opacity: 0};
    return (
        <div className={styles.info} style={infoState ? infoActive : infoInactive}>
            <div className={styles.title}></div>
            <div className={styles.content}>{content.ecategory}</div>
        </div>
    );
}

export default Info;