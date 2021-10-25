import * as d3 from 'd3';
import { hexbin as d3Hexbin } from "d3-hexbin";

export function Histogram(data, {
    x = (d, i) => i, 
    y = d => d, 
    title, 
    marginTop = 20, 
    marginRight = 0, 
    marginBottom = 30, 
    marginLeft = 40, 
    width = 640, 
    height = 400, 
    xDomain, 
    xRange = [marginLeft, width - marginRight], 
    yType = d3.scaleLinear, 
    yDomain, 
    yRange = [height - marginBottom, marginTop], 
    xPadding = 0.1, 
    yFormat, 
    yLabel, 
    color = "currentColor" 
} = {}) {
    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    if (xDomain === undefined) xDomain = X;
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    xDomain = new d3.InternSet(xDomain);

    const I = d3.range(X.length).filter(i => xDomain.has(X[i]));

    const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    if (title === undefined) {
        const formatValue = yScale.tickFormat(100, yFormat);
        title = i => `${X[i]}\n${formatValue(Y[i])}`;
    } else {
        const O = d3.map(data, d => d);
        const T = title;
        title = i => T(O[i], i, data);
    }

    const svg = d3.select('#trajectoriesGraph')
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    const bar = svg.append("g")
        .attr("fill", color)
        .selectAll("rect")
        .data(I)
        .join("rect")
        .attr("x", i => xScale(X[i]))
        .attr("y", i => yScale(Y[i]))
        .attr("height", i => yScale(0) - yScale(Y[i]))
        .attr("width", xScale.bandwidth());

    if (title) bar.append("title")
        .text(title);

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

    return svg.node();
}

export function HexMap(trajectories) {

    let margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 760 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    let svg = d3.select("#hexMapGraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    trajectories.map((personTrajectories) => {
        let x = d3.scaleLinear()
            .domain([-5, 15])
            .range([0, width]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        let y = d3.scaleLinear()
            .domain([-5, 15])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        let inputForHexbinFun = []

        personTrajectories.points.map((point) => {
            inputForHexbinFun.push([x(parseFloat(point.x)), y(parseFloat(point.y))]);

            return true;
        })

        let color = d3.scaleLinear()
            .domain([0, 20])
            .range(["transparent", "#69b3a2"]);

        let hexbin = d3Hexbin()
            .radius(15)
            .extent([[0, 0], [width, height]]);

        svg.append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        svg.append("g")
            .attr("clip-path", "url(#clip)")
            .selectAll("path")
            .data(hexbin(inputForHexbinFun))
            .enter().append("path")
            .attr("d", hexbin.hexagon())
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .attr("fill", function (d) { return color(d.length); })
            .attr("stroke", "#1ccc5e")
            .attr("stroke-width", "0.1");

        return true;
    })
}

export function ConnectedScatterplot(data, {
    x = ([x]) => x,
    y = ([, y]) => y,
    r = 3,
    title,
    orient = () => "top",
    defined,
    curve = d3.curveCatmullRom,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 30,
    inset = r * 2,
    insetTop = inset,
    insetRight = inset,
    insetBottom = inset,
    insetLeft = inset,
    xType = d3.scaleLinear,
    xDomain,
    xRange = [marginLeft + insetLeft, width - marginRight - insetRight],
    xFormat,
    xLabel,
    yType = d3.scaleLinear,
    yDomain,
    yRange = [height - marginBottom - insetBottom, marginTop + insetTop],
    yFormat,
    yLabel,
    fill = "white",
    stroke = "currentColor",
    strokeWidth = 2,
    strokeLinecap = "round",
    strokeLinejoin = "round",
    halo = "#fff",
    haloWidth = 6,
    duration = 0
} = {}) {
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const T = title == null ? null : d3.map(data, title);
    const O = d3.map(data, orient);
    const I = d3.range(X.length);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    if (xDomain === undefined) xDomain = d3.nice(...d3.extent(X), width / 80);
    if (yDomain === undefined) yDomain = d3.nice(...d3.extent(Y), height / 50);

    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat);
    const yAxis = d3.axisLeft(yScale).ticks(height / 50, yFormat);

    const line = d3.line()
        .curve(curve)
        .defined(i => D[i])
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));

    const svg = d3.select('#trajectoriesGraph')
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("y2", marginTop + marginBottom - height)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", width)
            .attr("y", marginBottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(xLabel));

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    const path = svg.append("path")
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-linecap", strokeLinecap)
        .attr("d", line(I));

    svg.append("g")
        .attr("fill", fill)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth)
        .selectAll("circle")
        .data(I.filter(i => D[i]))
        .join("circle")
        .attr("cx", i => xScale(X[i]))
        .attr("cy", i => yScale(Y[i]))
        .attr("r", r);

    const label = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(I.filter(i => D[i]))
        .join("g")
        .attr("transform", i => `translate(${xScale(X[i])},${yScale(Y[i])})`);

    if (T) label.append("text")
        .text(i => T[i])
        .each(function (i) {
            const t = d3.select(this);
            switch (O[i]) {
                case "bottom": t.attr("text-anchor", "middle").attr("dy", "1.4em"); break;
                case "left": t.attr("dx", "-0.5em").attr("dy", "0.32em").attr("text-anchor", "end"); break;
                case "right": t.attr("dx", "0.5em").attr("dy", "0.32em").attr("text-anchor", "start"); break;
                default: t.attr("text-anchor", "middle").attr("dy", "-0.7em"); break;
            }
        })
        .call(text => text.clone(true))
        .attr("fill", "none")
        .attr("stroke", halo)
        .attr("stroke-width", haloWidth);

    function length(path) {
        return d3.create("svg:path").attr("d", path).node().getTotalLength();
    }

    function animate() {
        if (duration > 0) {
            const l = length(line(I));

            path
                .interrupt()
                .attr("stroke-dasharray", `0,${l}`)
                .transition()
                .duration(duration)
                .ease(d3.easeLinear)
                .attr("stroke-dasharray", `${l},${l}`);

            label
                .interrupt()
                .attr("opacity", 0)
                .transition()
                .delay(i => length(line(I.filter(j => j <= i))) / l * (duration - 125))
                .attr("opacity", 1);
        }
    }

    animate();

    return Object.assign(svg.node(), { animate });
}