import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectPersonId } from '../trajectoriesSlice';
import styles from '../Trajectories.module.css';
import * as Helper from "helpers/GraphHelpers";

export default function ConnectedScatterplot(props) {
    const personId = useSelector(selectPersonId);
    const trajectoriesGraph = useRef(null);

    useEffect(() => {
        let allIds = props.trajectories.map((person) => {
            return person.id
        });

        if (allIds.includes(personId)) {
            personIdChanged()
        } // eslint-disable-next-line
    }, [personId])

    function personIdChanged() {
        trajectoriesGraph.current.innerHTML = "";

        let displayedPerson = props.trajectories.find(person => {
            return person.id === personId
        });

        Helper.ConnectedScatterplot(displayedPerson.points, {
            x: d => d.x,
            y: d => d.y,
            title: d => d.time + " s",
            yFormat: ".2f",
            xLabel: "X position of the person →",
            yLabel: "↑ Y position of the person",
            width: 820,
            height: 720,
            duration: 5000
        });
    }

    return (
        <div>
            <div className={styles.row}>
                <div
                    className={styles.trajectoriesGraph}
                    id="trajectoriesGraph"
                    ref={trajectoriesGraph}
                >
                    <p>You must select an ID</p>
                </div>
            </div>
        </div>
    );
}
