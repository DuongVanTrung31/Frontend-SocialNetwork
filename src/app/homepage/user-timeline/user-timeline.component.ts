import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  id!: number | null
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramsId:any) => {
      this.id = +paramsId.id;
    });
  }
}
