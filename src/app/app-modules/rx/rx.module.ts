/*
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/
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
