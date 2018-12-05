import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatRadioModule,
    MatSelectModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule
    ],
})
export class MaterialModule { }
