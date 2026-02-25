import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms'

export interface LogicalSegment {
  name: string;
  included: boolean;
}

export const DUMMY_LOGICAL_SEGMENTS: LogicalSegment[] = [
  { name: 'Segment Alpha',    included: true  },
  { name: 'Segment Beta',     included: false },
  { name: 'Segment Gamma',    included: true  },
  { name: 'Segment Delta',    included: true  },
  { name: 'Segment Epsilon',  included: false },
  { name: 'Segment Zeta',     included: true  },
  { name: 'Segment Eta',      included: false },
  { name: 'Segment Theta',    included: true  },
  { name: 'Segment Iota',     included: false },
  { name: 'Segment Kappa',    included: true  },
  { name: 'Segment Lambda',   included: false },
  { name: 'Segment Mu',       included: true  },
  { name: 'Segment Nu',       included: true  },
  { name: 'Segment Xi',       included: false },
  { name: 'Segment Omicron',  included: true  },
  { name: 'Segment Pi',       included: false },
  { name: 'Segment Rho',      included: true  },
  { name: 'Segment Sigma',    included: false },
  { name: 'Segment Tau',      included: true  },
  { name: 'Segment Upsilon',  included: false },
];


@Component({
  selector: 'app-table-wrapper',
  imports: [MatTableModule, MatInputModule, FormsModule],
  templateUrl: './table-wrapper.html',
  styleUrl: './table-wrapper.scss',
})
export class TableWrapper {
  dataSource = DUMMY_LOGICAL_SEGMENTS;
  displayedColumns = ['name', 'included'];
}
