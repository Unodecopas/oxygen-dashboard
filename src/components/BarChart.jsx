import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

const D3Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  place-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 1rem;
  & svg {
    width: 100%;
    height: 100%;
  }
`
const BarChart = ({ data }) => {
  const ref = useRef()
  useEffect(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const margin = { top: 10, right: 30, bottom: 10, left: 50 }
    const barWidth = 20
    const gapColumns = 5
    const gapText = 10
    const width = 600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    // rounds up to the nearest thousand
    const maxValue = Math.floor(data.sales.reduce((acc, curr) => curr.value > acc ? curr.value : acc, 0) / 1000 + 1) * 1000
    const svgElement = d3.select(ref.current)
    svgElement.append('svg')
      .attr('class', 'graph')
      .attr('width', width)
      .attr('height', height)
    const daysScale = d3.scaleBand()
      .range([0, width])
      .domain(days)
      .padding(0.4)

    const valueScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, maxValue])

    const percentageScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100])

    const daysAxis = svgElement.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    daysAxis.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(daysScale))
      .selectAll('.tick')
      .style('stroke-width', 0)

    const valueAxis = daysAxis.append('g')
      .call(d3.axisLeft(valueScale).tickFormat((d) => `${d}€`))
      .selectAll('.domain')
      .style('stroke-width', 0)

    valueAxis.selectAll('g.tick')
      .style('stroke-width', 0)

    daysAxis.append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(d3.axisRight(percentageScale).tickFormat((d) => `${d}%`))
      .selectAll('.domain')
      .style('stroke-width', 0)

    const barSales = svgElement.append('g')
    barSales.selectAll('rect')
      .data(data.sales)
      .enter().append('rect')
      .attr('pointer-events', 'all')
      .attr('x', (d, i) => daysScale(days[i]))
      .attr('y', (d, i) => valueScale(d.value))
      .attr('width', barWidth)
      .attr('height', (d, i) => height - valueScale(d.value))
      .attr('fill', '#135846')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .on('mouseover', onMouseOverSales)
      .on('mouseout', onMouseOut)

    const barOccupation = svgElement.append('g')
    barOccupation.selectAll('rect')
      .data(data.occupation)
      .enter().append('rect')
      .attr('pointer-events', 'all')
      .attr('x', (d, i) => daysScale(days[i]))
      .attr('y', (d, i) => percentageScale(d.value))
      .attr('width', barWidth)
      .attr('height', (d, i) => height - percentageScale(d.value))
      .attr('transform', `translate(${margin.left + barWidth + gapColumns}, ${margin.top})`)
      .attr('fill', 'red')
      .on('mouseover', onMouseOverOccupation)
      .on('mouseout', onMouseOut)

    function onMouseOverSales (d, i) {
      d3.select(this).attr('class', 'bar-hovered')
      daysAxis.append('text')
        .attr('class', 'val')
        .attr('x', () => {
          const day = new Date(i.day)
          return daysScale(days[
            day.getDay() - 1 < 0 ? 6 : day.getDay() - 1
          ]) - gapText
        })
        .attr('y', () => valueScale(i.value) + 10)
        .text(`${i.value}€`)
        .attr('stroke', '#135846')
        .style('writing-mode', 'tb')
    }
    function onMouseOverOccupation (d, i) {
      d3.select(this).attr('class', 'bar-hovered')
      daysAxis.append('text')
        .attr('class', 'val')
        .attr('x', () => {
          const day = new Date(i.day)
          return daysScale(days[day.getDay() - 1 < 0 ? 6 : day.getDay() - 1]) + barWidth * 2 + gapColumns + gapText
        })
        .attr('y', () => percentageScale(i.value) + gapText)
        .text(`${i.value}%`)
        .attr('stroke', 'red')
        .style('writing-mode', 'tb')
    }

    function onMouseOut (d, i) {
      d3.select(this)
        .attr('class', '')
      d3.selectAll('.val').remove()
    }
    return () => {
      ref.current = null
    }
  }, [ref, data])

  return (
    <D3Container>
      <svg ref={ref} />
    </D3Container>
  )
}

export default BarChart
