/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

const D3Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.bgPrimary};
  color: ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 1rem;
  & div {
    flex-grow: 1;
    & .svg-content-responsinve{
      width: 100%;
      height: 100%;
    }
  }
`

const BarChart = ({ data }) => {
  const svgRef = useRef()
  useEffect(() => {
    const container = d3.select(svgRef.current)
    const width = 600
    const height = 500
    const margin = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    }
    const barPadding = 0.2
    const axisTicks = {
      qty: 5,
      outerSize: 0,
      dateFormat: '%m-%d'
    }
    const svg = container
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
    // class to make it responsive
      .classed('svg-content-responsive', true)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    const xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
    const xScale1 = d3.scaleBand()
    const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])
    const yScale1 = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])
    const xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize)
    const yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize)
    const yAxis1 = d3.axisRight(yScale1).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize)
    xScale0.domain(data.map(d => d.model_name))
    xScale1.domain(['totalIncome', 'occupancyPercentage']).range([0, xScale0.bandwidth()])
    yScale.domain([0, d3.max(data, d => d.totalIncome > d.occupancyPercentage ? d.totalIncome : d.occupancyPercentage)])
    yScale1.domain([0, d3.max(data, d => d.totalIncome > d.occupancyPercentage ? d.occupancyPercentage : d.totalIncome)])
    const modelName = svg.selectAll('.model_name')
      .data(data)
      .enter().append('g')
      .attr('class', 'model_name')
      .attr('transform', d => `translate(${xScale0(d.model_name)},0)`)
    /* Add totalIncome bars */
    modelName.selectAll('.bar.totalIncome')
      .data(d => [d])
      .enter()
      .append('rect')
      .on('mouseover', onMouseOver)
      .on('mouseout', onMouseOut)
      .attr('class', 'bar totalIncome')
      .style('fill', '#135846')
      .attr('x', d => xScale1('totalIncome'))
      .attr('y', d => yScale(d.totalIncome))
      .attr('width', xScale1.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - yScale(d.totalIncome))
    /* Add occupancyPercentage bars */
    modelName.selectAll('.bar.occupancyPercentage')
      .data(d => [d])
      .enter()
      .append('rect')
      .attr('class', 'bar occupancyPercentage')
      .style('fill', '#e74e5b')
      .attr('x', d => xScale1('occupancyPercentage'))
      .attr('y', d => yScale(d.occupancyPercentage))
      .attr('width', xScale1.bandwidth())
      .attr('height', d => height - margin.top - margin.bottom - yScale(d.occupancyPercentage))
    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(xAxis)
    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    svg.append('g')
      .attr('transform', `translate(${width - margin.left - margin.right}, 0)`)
      .attr('class', 'y axis')
      .call(yAxis1)

    function onMouseOver (d, i) {
      d3.select(this).attr('class', 'bar-hovered')
      svg.append('text')
        .attr('class', 'val')
        .attr('x', () => xScale0(i.model_name))
        .attr('y', () => yScale(i.totalIncome) + 20)
        .style('fill', 'white')
        .text(`${i.totalIncome}%`)
      svg.append('text')
        .attr('class', 'val')
        .attr('x', () => xScale0(i.model_name) + 30)
        .attr('y', () => yScale(i.occupancyPercentage) + 20)
        .style('fill', 'white')
        .text(`${i.occupancyPercentage}%`)
    }

    function onMouseOut (d, i) {
      d3.select(this)
        .attr('class', '')

      d3.selectAll('.val').remove()
    }
    return () => {
      // clear all previous content on refresh
      const everything = container.selectAll('*')
      everything.remove()
    }
  }, [])
  return (
    <D3Container>
      <div ref={svgRef} />
    </D3Container>
  )
}

export default BarChart
