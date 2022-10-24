import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { Capitals } from './list'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  capitals!: Capitals[];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getCapitals().subscribe(
      (response: Capitals[]) => {
        this.capitals = response;
      })
  }

}
