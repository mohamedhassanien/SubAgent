import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SchoolsService } from 'src/app/shared/services/schools/schools.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-schools',
  templateUrl: './all-schools.component.html',
  styleUrls: ['./all-schools.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllSchoolsComponent implements OnInit {
  schools: any[] = [];
  currentPage: number = 1;
  pages: number[] = [];
  pageData: any[] = [];
  isLoading: boolean = false;
  filteredSchools: any[] = [];
  inputValue: string = ' ';
  searchForm!: FormGroup;

  page: any = 1;
  pageSize: number = 20;

  constructor(private schoolsService: SchoolsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllSchools();
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  searchSchool(searchForm: FormGroup) {
    console.log(searchForm.value);
    this.filteredSchools = this.schools.filter((o) => {
      return o.shcool_name
        .toLowerCase()
        .includes(searchForm.value.search.toLowerCase());
    });
    this.updatePages();
    this.paginateData();
  }

  getAllSchools() {
    this.isLoading = true;
    try {
      this.schoolsService.getSchoolsPage().subscribe((data) => {
        let dataArray: any = data as [];
        this.schools = dataArray;
        this.filteredSchools = dataArray;
        this.updatePages();
        this.paginateData();
      });
    } catch (err) {
      this.isLoading = false;
    }
  }
  updatePages() {
    const numPages = Math.ceil(this.filteredSchools.length / 20);
    this.pages = Array.from({ length: numPages }, (_, i) => i + 1);
  }

  paginateData() {
    this.pageData = this.filteredSchools
    this.isLoading = false;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  nextPage() {
    this.isLoading = true;
    if (this.currentPage < Math.ceil(this.filteredSchools.length / 20)) {
      this.currentPage++;
      this.paginateData();
    }
  }

  goToPage(page: number) {
    this.isLoading = true;
    this.currentPage = page;
    this.paginateData();
  }

  viewProgram(programName: any) {
    sessionStorage.setItem('school', programName);
    this.router.navigate(['landing/programs'], {
      queryParams: { programName: programName },
    });
  }

  loadPage(){
    window.scroll(0,0);
  }
}
