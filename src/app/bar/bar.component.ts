import { takeUntil, tap } from 'rxjs/operators';
import { selectAllFriends } from './../store/friends.selectors';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as d3 from 'd3';
import { State } from '../store';
import { Friend } from '../models/friend';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  constructor(private readonly store: Store<State>) {}

  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  friends$: Observable<Friend[]> = this.store.pipe(select(selectAllFriends));
  destroySub$: Subject<null> = new Subject();

  ngOnInit(): void {
    this.createSvg();

    this.friends$
      .pipe(
        tap((friends) => {
          this.drawBars(friends);
        }),
        takeUntil(this.destroySub$)
      )
      .subscribe();
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: Friend[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear().domain([0, data.length]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: Friend) => x(d.name))
      .attr('y', (d: Friend) => y(d.friendIds.length))
      .attr('width', x.bandwidth())
      .attr('height', (d: Friend) => this.height - y(d.friendIds.length))
      .attr('fill', '#d04a35');
  }
}
