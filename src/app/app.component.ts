import { Component, OnInit, ViewChild, inject, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, shareReplay, catchError, throwError } from 'rxjs';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService, BlogPost } from './services/blog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    AsyncPipe,
    HttpClientModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;
  loading: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(MatDialog);
  private zone = inject(NgZone);
  private sanitizer = inject(DomSanitizer);
  private blogService = inject(BlogService);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 840px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.loading = true;
    this.blogService.getBlogPosts().pipe(
      catchError(error => {
        console.error('Error loading blog posts:', error);
        return throwError(() => error);
      })
    ).subscribe({
      next: posts => {
        this.blogPosts = posts;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
  }

  selectPost(post: BlogPost) {
    this.selectedPost = post;

    // Close sidenav only when on mobile/handset mode (mode is 'over')
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  goToHomepage() {
    this.selectedPost = null;

    // Close sidenav only when on mobile/handset mode (mode is 'over')
    if (this.sidenav.mode === 'over') {
      this.sidenav.close();
    }
  }

  openAboutMe() {
    // Select the first blog post (About me)
    if (this.blogPosts.length > 0) {
      this.selectPost(this.blogPosts[0]);
    }
  }

  openPostByIndex(index: number) {
    // Select the blog post at the specified index
    if (this.blogPosts.length > index) {
      this.selectPost(this.blogPosts[index]);
    }
  }

  openContactDialog() {
    this.dialog.open(ContactDialogComponent, {
      width: '400px',
      panelClass: 'contact-dialog'
    });
  }

  safeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
