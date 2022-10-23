/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

const D3Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  place-items: center;
  background-color: ${props => props.theme.colors.bgPrimary};
  color: ${props => props.theme.colors.primary};
  border-radius: 12px;
  padding: 1rem;
  & svg {
    width: 100%;
    height: 100%;
  }
`
interface Props {
  data: any[]
}
const BarChart = ({ data }: Props): JSX.Element => {
  useEffect(() => {
    const container = d3.select()
    const width = 500
    const height = 300
    const margin = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 50
    }
    const barPadding = 0.2
    const axisTicks = {
      qty: 5,
      outerSize: 0,
      dateFormat: '%m-%d'
    }
    const svg = container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    const xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding)
    const xScale1 = d3.scaleBand()
    const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])
    const xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize)
    const yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize)
    xScale0.domain(data.map(d => d.model_name))
    xScale1.domain(['totalIncome', 'occupancyPercentage']).range([0, xScale0.bandwidth()])
    yScale.domain([0, d3.max(data, d => d.totalIncome > d.occupancyPercentage ? d.totalIncome : d.occupancyPercentage)])
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
      .attr('class', 'bar totalIncome')
      .style('fill', 'blue')
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
      .style('fill', 'red')
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
  }, [])
  return (
    <D3Container />
  )
}

export default BarChart
