import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ForceLink, SimulationLinkDatum, SimulationNodeDatum } from 'd3';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  constructor() {}

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  private nodes = [
    { id: 'mammal', group: 0, label: 'Mammals', level: 1 },
    { id: 'dog', group: 0, label: 'Dogs', level: 1 },
    { id: 'cat', group: 0, label: 'Cats', level: 1 },
    { id: 'fox', group: 0, label: 'Foxes', level: 1 },
    { id: 'elk', group: 0, label: 'Elk', level: 1 },
    { id: 'insect', group: 1, label: 'Insects', level: 1 },
    { id: 'ant', group: 1, label: 'Ants', level: 1 },
    { id: 'bee', group: 1, label: 'Bees', level: 1 },
    { id: 'fish', group: 2, label: 'Fish', level: 1 },
    { id: 'carp', group: 2, label: 'Carp', level: 1 },
    { id: 'pike', group: 2, label: 'Pikes', level: 1 },
  ];

  private links = [
    { target: 'mammal', source: 'dog', strength: 0.1 },
    { target: 'mammal', source: 'cat', strength: 0.1 },
    { target: 'mammal', source: 'fox', strength: 0.1 },
    { target: 'mammal', source: 'elk', strength: 0.1 },
    { target: 'insect', source: 'ant', strength: 0.1 },
    { target: 'insect', source: 'bee', strength: 0.1 },
    { target: 'fish', source: 'carp', strength: 0.1 },
    { target: 'fish', source: 'pike', strength: 0.1 },
    { target: 'cat', source: 'elk', strength: 0.1 },
    { target: 'carp', source: 'ant', strength: 0.1 },
    { target: 'elk', source: 'bee', strength: 0.1 },
    { target: 'dog', source: 'cat', strength: 0.1 },
    { target: 'fox', source: 'ant', strength: 0.1 },
    { target: 'pike', source: 'dog', strength: 0.1 },
  ];

  ngOnInit(): void {
    this.createSvg();
    this.drawGraph();
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#graph')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawGraph(): void {
    const simulation = d3
      .forceSimulation()
      .force('charge', d3.forceManyBody().strength(-125))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    const linkElements = this.svg
      .append('g')
      .selectAll('line')
      .data(this.links)
      .enter()
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#E5E5E5');

    const nodeElements = this.svg
      .append('g')
      .selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', this.getNodeColor);
    const textElements = this.svg
      .append('g')
      .selectAll('text')
      .data(this.nodes)
      .enter()
      .append('text')
      .text((node: any) => node.label)
      .attr('font-size', 12)
      .attr('dx', 15)
      .attr('dy', 4);

    simulation.nodes(this.nodes as SimulationNodeDatum[]).on('tick', () => {
      linkElements
        .attr('x1', (link: any) => link.source.x)
        .attr('y1', (link: any) => link.source.y)
        .attr('x2', (link: any) => link.target.x)
        .attr('y2', (link: any) => link.target.y);
      nodeElements
        .attr('cx', (node: any) => node.x)
        .attr('cy', (node: any) => node.y);
      textElements
        .attr('x', (node: any) => node.x)
        .attr('y', (node: any) => node.y);
    });

    simulation.force(
      'link',
      d3
        .forceLink()
        .id((link: any) => link.id)
        .strength((link: any) => link.strength)
    );

    simulation!.force<ForceLink<any, any>>('link')!.links(this.links);
  }

  getNodeColor(node: any) {
    return node.level === 1 ? 'red' : 'gray';
  }
}
