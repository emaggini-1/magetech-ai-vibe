import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Contact Information</h2>
    <mat-dialog-content>
      <div class="contact-item">
        <mat-icon>phone</mat-icon>
        <a href="tel:+16172568030">1.617.256.8030</a>
      </div>
      <div class="contact-item">
        <mat-icon>email</mat-icon>
        <a [href]="'mailto:'+emailLink" target="_blank">{{emailLink}}</a>
      </div>
      <div class="contact-item">
        <mat-icon>link</mat-icon>
        <a href="https://www.linkedin.com/in/emaggini" target="_blank">LinkedIn Profile</a>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    .contact-item mat-icon {
      margin-right: 8px;
      color: var(--primary-color);
    }

    .contact-item a {
      color: var(--on-surface);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .contact-item a:hover {
      color: var(--primary-color);
      text-decoration: underline;
    }
  `]
})
export class ContactDialogComponent {
  emailLink = 'elio@magetech.com';

  constructor(public dialogRef: MatDialogRef<ContactDialogComponent>) {}
}
