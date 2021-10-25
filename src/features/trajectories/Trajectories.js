import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { switchPersonId } from './trajectoriesSlice';
import styles from './Trajectories.module.css';
import trajectoriesData from 'assets/trajectoriesData.json';
import ConnectedScatterplot from "./subComponent/ConnectedScatterplot";

export function Trajectories() {
    const [trajectories, setTrajectories] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setInitialData();
    }, [])

    function setInitialData() {
        let parsedTrajectoriesData = trajectoriesData.map((person) => {
            person.points.sort(function (a, b) {
                return a.time - b.time;
            });

            return person
        })

        setTrajectories(parsedTrajectoriesData);
    }

    return (
        <div>
            <ConnectedScatterplot trajectories={trajectories} />
            <div className={styles.row}>
                {trajectories.map((person, index) => {
                    return (
                        <button
                            key={index}
                            className={styles.button}
                            onClick={() => {
                                dispatch(switchPersonId(person.id))
                            }}
                        >
                            # {person.id}
                        </button>
                    )
                })}
            </div>
        </div>
    );
}
