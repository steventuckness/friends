import { FriendNode } from './../models/friend-node';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ForceLink } from 'd3';
import { of } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Friend } from '../models/friend';
import { FriendLink } from '../models/friend-link';

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

  @Input() friends: Friend[] = [];

  destroySub$: Subject<null> = new Subject();

  ngOnInit(): void {
    this.createSvg();

    // TODO: refactor. selector or pure pipe
    of(this.friends)
      .pipe(
        tap((friends) => {
          let nodes: FriendNode[] = friends.map((friend) => ({
            id: friend.id,
            group: 0,
            label: friend.name,
            level: 0,
          }));

          let links: FriendLink<FriendNode>[] = [];
          friends.forEach((friend) => {
            friend.friendIds.forEach((friendId) => {
              links.push({
                target: friendId,
                source: friend.id,
                strength: 0.1,
              });
            });
          });

          this.drawGraph(nodes, links);
        }),
        takeUntil(this.destroySub$)
      )
      .subscribe();
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

  private drawGraph(
    nodes: FriendNode[],
    links: FriendLink<FriendNode>[]
  ): void {
    const simulation = d3
      .forceSimulation()
      .force('charge', d3.forceManyBody().strength(-30))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    const linkElements = this.svg
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#E5E5E5');

    const nodeElements = this.svg
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#7b1fa2');

    const textElements = this.svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((node: FriendNode) => node.label)
      .attr('fill', '#ffffff')
      .attr('font-size', 12)
      .attr('dx', 15)
      .attr('dy', 4);

    simulation.nodes(nodes as FriendNode[]).on('tick', () => {
      linkElements
        .attr('x1', (link: FriendLink<any>) => link.source.x)
        .attr('y1', (link: FriendLink<any>) => link.source.y)
        .attr('x2', (link: FriendLink<any>) => link.target.x)
        .attr('y2', (link: FriendLink<any>) => link.target.y);
      nodeElements
        .attr('cx', (node: FriendNode) => node.x)
        .attr('cy', (node: FriendNode) => node.y);
      textElements
        .attr('x', (node: FriendNode) => node.x)
        .attr('y', (node: FriendNode) => node.y);
    });

    simulation.force(
      'link',
      d3
        .forceLink<FriendNode, FriendLink<FriendNode>>()
        .id((node: FriendNode) => node.id)
        .strength((link: FriendLink<FriendNode>) => link.strength)
    );

    simulation!
      .force<ForceLink<FriendNode, FriendLink<FriendNode>>>('link')!
      .links(links);
  }
}
