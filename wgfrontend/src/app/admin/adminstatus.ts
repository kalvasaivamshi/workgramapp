
import { AgRendererComponent } from 'ag-grid-angular';

import { Component, ElementRef, ViewChild } from "@angular/core";
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid-community';
@Component({
    selector: 'admin-status',
    template: `  
    <button class="login-button" *ngIf="params.data.action.status=='yes'" type="submit" (click)="admincomp(params)">No</button>
    <button class="login-button" *ngIf="params.data.action.status=='no'" type="submit" (click)="admincomp(params)">Yes</button>
    `
    // <span *ngIf="params.data.action.status=='yes'">No</span> 
    // <span *ngIf="params.data.action.status=='no'">Yes</span> 
})
export class Adminstatus implements AgRendererComponent {
    params: any;
    refresh(params: ICellRendererParams): boolean {
        throw new Error('Method not implemented.');
    }
    agInit(params: ICellRendererParams): void {
        this.params = params;
        console.log(this.params)
        // throw new Error('Method not implemented.');
    }
    admincomp(params:any) {
        console.log(params)
        if(params.data.action.status==='no'){
            this.params.data.action.status='yes'
        }
        else{
            this.params.data.action.status='no'
        }
        this.params.context.componentParent.changeStatus(params);

    }
}
