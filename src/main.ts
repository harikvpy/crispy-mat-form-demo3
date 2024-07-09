import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  FORM_ERRORS,
} from '@ngneat/error-tailor';
import {
  CrispyBuilder,
  CrispyCustomComponent,
  CrispyDiv,
  CrispyEmail,
  CrispyForm,
  CrispyMatFormModule,
  CrispyRow,
  CrispyTemplate,
  CrispyText,
} from '@smallpearl/crispy-mat-form';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MyTelInputComponent } from './components/my-tel-input/my-tel-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CrispyMatFormModule,
    MatButtonModule,
    MatFormFieldModule,
    MyTelInputComponent,
  ],
  providers: [
    {
      // Errors that the form's fields would raise. These errors could
      // be a result of local validators or from server side validation.
      provide: FORM_ERRORS, useValue: {
        required: 'This field is required',
        minlength: (error: { requiredLength: number, actualLength: number }) =>
          `Expected ${error.requiredLength} charactres, but got ${error.actualLength}`,
      },
    },
  ],
  template: `
    <h1>Crispy Forms Demo 3</h1>
    <div>
      Crispy Form demo showing
      <ul>
        <li>A field with a custom component that conforms to Material's <code>MatFormFieldControl<></code> interface</li>
        <li>A field whose content is user provided template</li>
      </ul>
    </div>
    <form [formGroup]="crispy.form" (ngSubmit)="onSubmit()">
      <crispy-mat-form [crispy]="crispy"></crispy-mat-form>

      <div>
        <button mat-raised-button color="secondary" type="button" (click)="crispy.form.reset()">
          Reset
        </button>&nbsp;
        <button mat-raised-button color="primary" type="submit" [disabled]="crispy.form.invalid">
          Submit
        </button>
      </div>

    </form>

    <ng-template crispyFieldName="mobile" let-formGroup="formGroup">
      <span *ngIf="formGroup" [formGroup]="formGroup">
        <mat-form-field class="w-100">
          <mat-label>Telephone (From ng-template)</mat-label>
          <my-tel-input formControlName="mobile"></my-tel-input>
        </mat-form-field>
      </span>
    </ng-template>
  `,
})
export class App {
  crispy!: CrispyForm;
  constructor(crispyBuilder: CrispyBuilder) {
    this.crispy = crispyBuilder.build(
      CrispyDiv('', [
        CrispyCustomComponent(
          'telephone',
          { area: '618', exchange: '782', subscriber: '2890' },
          { component: MyTelInputComponent },
          { label: 'Telephone (Custom Component)' }
        ),
        CrispyTemplate('mobile', {
          area: '737',
          exchange: '777',
          subscriber: '0787',
        }),
      ])
    );
  }

  onSubmit() {
    window.alert(
      `Form.value: ${JSON.stringify(this.crispy.form?.value)}`
    );
  }
}

bootstrapApplication(App, {
  providers: [
    provideAnimationsAsync(),
  ],
});
