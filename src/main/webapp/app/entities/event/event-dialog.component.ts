import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Event } from './event.model';
import { EventPopupService } from './event-popup.service';
import { EventService } from './event.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';
import {AccountService} from '../../shared/auth/account.service';
import {Principal} from '../../shared/auth/principal.service';

@Component({
    selector: 'jhi-event-dialog',
    templateUrl: './event-dialog.component.html'
})
export class EventDialogComponent implements OnInit {

    event: Event;
    isSaving: boolean;

    users: User[];

    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private eventService: EventService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private account: AccountService
    ) {
    }

    log() {
        console.log(this.event);
    }

    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then((account) => {
            this.userService.find(this.copyAccount(account).login)
                .subscribe((currentUser) => { this.event.organiser = currentUser; });

        });
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    save() {
        this.isSaving = true;
        if (this.event.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventService.update(this.event));
        } else {
            this.subscribeToSaveResponse(
                this.eventService.create(this.event));
        }
    }

    private subscribeToSaveResponse(result: Observable<Event>) {
        result.subscribe((res: Event) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Event) {
        this.eventManager.broadcast({ name: 'eventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-event-popup',
    template: ''
})
export class EventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventPopupService: EventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventPopupService
                    .open(EventDialogComponent as Component, params['id']);
            } else {
                this.eventPopupService
                    .open(EventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
