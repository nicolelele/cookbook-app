import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingIconComponent } from './loading-icon/loading-icon';

@NgModule({
    declarations: [
        LoadingIconComponent
    ],
    imports: [CommonModule],
    exports: [
        LoadingIconComponent,
        CommonModule
    ]
})
export class SharedModule { }