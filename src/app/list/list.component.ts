import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Capital } from './list'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  capitals!: Capital[];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getCapitals().subscribe(
      (response: Capital[]) => {
        this.capitals = response;
      })
  }

}
