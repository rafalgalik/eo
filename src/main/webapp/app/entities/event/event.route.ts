import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EventComponent } from './event.component';
import { EventDetailComponent } from './event-detail.component';
import { EventPopupComponent } from './event-dialog.component';
import { EventDeletePopupComponent } from './event-delete-dialog.component';
import {EventEditPopupComponent} from './event-edit.component';

export const eventRoute: Routes = [
    {
        path: 'event',
        component: EventComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eoApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'event/:id',
        component: EventDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eoApp.event.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eventPopupRoute: Routes = [
    {
        path: 'event-new',
        component: EventPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eoApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event/:id/edit',
        component: EventEditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eoApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'event/:id/delete',
        component: EventDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'eoApp.event.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
