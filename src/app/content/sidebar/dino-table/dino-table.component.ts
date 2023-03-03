import {DinoTableService} from './dino-table.service';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Employee} from '../../employee.interface';
import {DinoColumns} from './dino';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-personal-table',
  templateUrl: './dino-table.component.html',
  styleUrls: ['./dino-table.component.css'],
  providers: [DinoTableService]
})

export class DinoTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = DinoColumns.map((col) => col.key);
  dataSource: any;
  columnsSchema: any = DinoColumns;

  constructor(private router: Router, private dinoTableService: DinoTableService) {
    this.getDino();
  }

  ngOnInit() {
    this.getDino();
  }

  getDino() {
    this.dinoTableService.getDino().subscribe((res: any) => {
      console.log(res);
      for (let i=0; i < res.length; i++) {
        res[i]['type'] = res[i]['type'].type;
        res[i]['location'] = res[i]['location'].name;
      }
      this.dataSource = new MatTableDataSource<any>(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  goToAddDino() {
    this.router.navigateByUrl('/content/(sidebar:addDino)');
  }

  goToEditDino(row: any) {
    console.log(row);
    this.router.navigateByUrl('/content/(sidebar:editDino)', { state: {row} });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
