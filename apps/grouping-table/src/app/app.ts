import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { TableWrapper } from "./components/table-wrapper/table-wrapper";
import { Deduplication } from "./components/deduplicaton/deduplication";

@Component({
  imports: [NxWelcome, RouterModule, TableWrapper, Deduplication],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'grouping-table';
}
