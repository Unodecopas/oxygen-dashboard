import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

const D3Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem 0 1rem ;
  place-items: center;
  background-color: white;
  border-radius: 12px;
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
    const width = 600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    const svgElement = d3.select(ref.current)
    svgElement.append('svg')
      .attr('width', width)
      .attr('height', height)
    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(days)
      .padding(0.4)

    const yScaleLeft = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 5000])

    const yScaleRight = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100])

    const g = svgElement.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('.tick')
      .style('stroke-width', 0)

    const gAxisLeft = g.append('g')
      .call(d3.axisLeft(yScaleLeft).tickFormat((d) => `${d}€`))
      .selectAll('.domain')
      .style('stroke-width', 0)

    gAxisLeft.selectAll('g.tick')
      .style('stroke-width', 0)

    g.append('g')
      .attr('transform', `translate(${width}, 0)`)
      .call(d3.axisRight(yScaleRight).tickFormat((d) => `${d}%`))
      .selectAll('.domain')
      .style('stroke-width', 0)

    const gSales = svgElement.append('g')
    gSales.selectAll('rect')
      .data(data.sales)
      .enter().append('rect')
      .attr('pointer-events', 'all')
      .attr('x', (d, i) => xScale(days[i]))
      .attr('y', (d, i) => yScaleLeft(d.value))
      .attr('width', 20)
      .attr('height', (d, i) => height - yScaleLeft(d.value))
      .attr('fill', 'green')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .on('mouseover', onMouseOverSales)
      .on('mouseout', onMouseOut)

    const gOccupation = svgElement.append('g')
    gOccupation.selectAll('rect')
      .data(data.occupation)
      .enter().append('rect')
      .attr('pointer-events', 'all')
      .attr('x', (d, i) => xScale(days[i]))
      .attr('y', (d, i) => yScaleRight(d.value))
      .attr('width', 20)
      .attr('height', (d, i) => height - yScaleRight(d.value))
      .attr('transform', `translate(${margin.left + 20}, ${margin.top})`)
      .attr('fill', 'red')
      .on('mouseover', onMouseOverOccupation)
      .on('mouseout', onMouseOut)

    function onMouseOverSales (d, i) {
      d3.select(this).attr('class', 'bar-hovered')
      g.append('text')
        .attr('class', 'val')
        .attr('x', () => {
          const day = new Date(i.day)
          return xScale(days[
            day.getDay() - 1 < 0 ? 6 : day.getDay() - 1
          ]) - 10
        })
        .attr('y', () => yScaleLeft(i.value) + 10)
        .text(`${i.value}€`)
        .style('writing-mode', 'tb')
    }
    function onMouseOverOccupation (d, i) {
      d3.select(this).attr('class', 'bar-hovered')
      g.append('text')
        .attr('class', 'val')
        .attr('x', () => {
          const day = new Date(i.day)
          return xScale(days[
            day.getDay() - 1 < 0 ? 6 : day.getDay() - 1
          ]) + 50
        })
        .attr('y', () => yScaleRight(i.value) + 10)
        .text(`${i.value}%`)
        .style('writing-mode', 'tb')
    }

    function onMouseOut (d, i) {
      d3.select(this)
        .attr('class', '')
      d3.selectAll('.val').remove()
    }
  }, [])

  return (
    <D3Container>
      <svg ref={ref} />
    </D3Container>
  )
}

export default BarChart
