import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { selectHistogramType } from '../histogramSlice';
import styles from '../Histogram.module.css';
import * as Helper from "helpers/GraphHelpers";

export default function HistogramGraph(props) {
    const histogramType = useSelector(selectHistogramType);
    const trajectoriesGraph = useRef(null);

    useEffect(() => {
        let allowedHistogramTypes = ["timeSpent", "stopCount", "averageTimeToTravel"];

        if (allowedHistogramTypes.includes(histogramType)) {
            histogramTypeChange()
        } // eslint-disable-next-line
    }, [histogramType])

    function histogramTypeChange() {
        trajectoriesGraph.current.innerHTML = "";

        if (histogramType === "timeSpent") {
            Helper.Histogram(props.trajectories, {
                x: d => "#"+d.id,
                y: d => d.timeSpent,
                xDomain: d3.groupSort(props.trajectories, ([d]) => -d.timeSpent, d => "#"+d.id),
                yFormat: "u",
                yLabel: "↑ Total time spent (secondes)",
                width: 820,
                height: 720,
                color: "#3498db"
            })
        } else if (histogramType === "stopCount") {
            Helper.Histogram(props.trajectories, {
                x: d => "#"+d.id,
                y: d => d.stopCount,
                xDomain: d3.groupSort(props.trajectories, ([d]) => -d.stopCount, d => "#"+d.id),
                yFormat: "u",
                yLabel: "↑ Amount of stops",
                width: 820,
                height: 720,
                color: "#9b59b6"
            })
        } else if (histogramType === "averageTimeToTravel") {
            Helper.Histogram(props.trajectories, {
                x: d => "#"+d.id,
                y: d => d.averageTimeToTravel,
                xDomain: d3.groupSort(props.trajectories, ([d]) => -d.averageTimeToTravel, d => "#"+d.id),
                yFormat: "u",
                yLabel: "↑ Average time to travel between stops (secondes)",
                width: 820,
                height: 720,
                color: "#1ccc5b"
            })
        }
    }

    return (
        <div>
            <div className={styles.row}>
                <div
                    className={styles.trajectoriesGraph}
                    id="trajectoriesGraph"
                    ref={trajectoriesGraph}
                >
                    <p>You must select a type of histogram</p>
                </div>
            </div>
        </div>
    );
}
