import React, { useEffect } from 'react';
import styles from './HexMap.module.css';
import trajectoriesData from 'assets/trajectoriesData.json';
import * as Helper from "helpers/GraphHelpers";

export function HexMap() {
    useEffect(() => {
        Helper.HexMap(trajectoriesData);
    }, [])

    return (
        <div>
            <div className={styles.row}>
                <div id="hexMapGraph"></div>
            </div>
        </div>
    );
}
