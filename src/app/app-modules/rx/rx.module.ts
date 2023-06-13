import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RxRoutingModule } from './rx-routing.module';


/*Components*/

import { RxDashboardComponent } from './rx-dashboard/rx-dashboard.component';
import { RxItemDispenseComponent } from './rx-item-dispense/rx-item-dispense.component';

/*Services*/
import {PrescribedDrugService} from './shared/service/prescribed-drug.service';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        RxRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot()
    ],
    entryComponents: [
    ],
    declarations: [
        RxDashboardComponent,
        RxItemDispenseComponent,
    ],
    providers: [
        PrescribedDrugService
    ]
})
export class RxModule { }
