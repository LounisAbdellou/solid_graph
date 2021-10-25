import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';


export function Home() {
    return (
        <div>
            <div className={styles.row}>
                <Link to="/hex">
                    <button
                        className={styles.button}
                    >
                        HexMap Graph
                    </button>
                </Link>
                <Link to="/trajectory">
                    <button
                        className={styles.button}
                    >
                        Trajectories Graph
                    </button>
                </Link>
                <Link to="/histogram">
                    <button
                        className={styles.button}
                    >
                        Histogram Graph
                    </button>
                </Link>
            </div>
        </div>
    );
}
