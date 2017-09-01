import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EoSharedModule } from '../../shared';
import { EoAdminModule } from '../../admin/admin.module';
import {
    EventService,
    EventPopupService,
    EventComponent,
    EventDetailComponent,
    EventDialogComponent,
    EventEditComponent,
    EventPopupComponent,
    EventEditPopupComponent,
    EventDeletePopupComponent,
    EventDeleteDialogComponent,
    eventRoute,
    eventPopupRoute,
} from './';

const ENTITY_STATES = [
    ...eventRoute,
    ...eventPopupRoute,
];

@NgModule({
    imports: [
        EoSharedModule,
        EoAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EventComponent,
        EventDetailComponent,
        EventDialogComponent,
        EventEditComponent,
        EventDeleteDialogComponent,
        EventPopupComponent,
        EventEditPopupComponent,
        EventDeletePopupComponent,
    ],
    entryComponents: [
        EventComponent,
        EventDialogComponent,
        EventEditComponent,
        EventPopupComponent,
        EventEditPopupComponent,
        EventDeleteDialogComponent,
        EventDeletePopupComponent,
    ],
    providers: [
        EventService,
        EventPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EoEventModule {}
