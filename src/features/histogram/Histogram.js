import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { switchHistogramType } from './histogramSlice';
import styles from './Histogram.module.css';
import trajectoriesData from 'assets/trajectoriesData.json';
import HistogramGraph from "./subComponent/HistogramGraph";

export function Histogram() {
    const [trajectories, setTrajectories] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setInitialData();
    }, [])

    function setInitialData() {
        let parsedTrajectoriesData = trajectoriesData.map((person) => {
            let eachTimeToTravel = person.points.map((point, index) => {
                return (!index) ? 0 : parseFloat(point.time) - parseFloat(person.points[index - 1].time);
            })
            
            person.points.sort(function (a, b) {
                return a.time - b.time;
            });

            return {
                id: person.id,
                timeSpent: parseFloat(person.points[person.points.length - 1].time) - parseFloat(person.points[0].time),
                stopCount: person.points.length,
                averageTimeToTravel: parseFloat((eachTimeToTravel.reduce((a, b) => a + b, 0) / eachTimeToTravel.length - 1).toFixed(2))
            }
        })
        
        setTrajectories(parsedTrajectoriesData);
    }

    return (
        <div>
            { (trajectories.length) ? <HistogramGraph trajectories={trajectories} /> : null }
            <div className={styles.row}>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(switchHistogramType("timeSpent"))
                    }}
                >
                    Time spent
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(switchHistogramType("averageTimeToTravel"))
                    }}
                >
                    Average traveling time
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(switchHistogramType("stopCount"))
                    }}
                >
                    Stop count
                </button>
            </div>
        </div>
    );
}
