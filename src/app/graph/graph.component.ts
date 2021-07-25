import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as d3 from 'd3';
import { ForceLink, SimulationLinkDatum, SimulationNodeDatum } from 'd3';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Friend } from '../models/friend';
import { State } from '../store';
import { selectAllFriends } from '../store/friends.selectors';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  constructor(private readonly store: Store<State>) {}

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  friends$: Observable<Friend[]> = this.store.pipe(select(selectAllFriends));
  destroySub$: Subject<null> = new Subject();

  ngOnInit(): void {
    this.createSvg();

    // TODO: refactor. selector or pure pipe
    this.friends$
      .pipe(
        tap((friends) => {
          let nodes: {
            id: number;
            group: number;
            label: string;
            level: number;
          }[] = friends.map((friend) => ({
            id: friend.id,
            group: 0,
            label: friend.name,
            level: 0,
          }));

          let links: { target: number; source: number; strength: number }[] =
            [];
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

  private drawGraph(nodes: any, links: any): void {
    const simulation = d3
      .forceSimulation()
      .force('charge', d3.forceManyBody().strength(-125))
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
      .attr('fill', 'red');
    const textElements = this.svg
      .append('g')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .text((node: any) => node.label)
      .attr('font-size', 12)
      .attr('dx', 15)
      .attr('dy', 4);

    simulation.nodes(nodes as SimulationNodeDatum[]).on('tick', () => {
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

    simulation!.force<ForceLink<any, any>>('link')!.links(links);
  }
}
