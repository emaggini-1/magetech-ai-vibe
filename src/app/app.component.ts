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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';

interface BlogPost {
  title: string;
  body: string;
}

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

  @ViewChild('sidenav') sidenav!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);
  private http = inject(HttpClient);
  private dialog = inject(MatDialog);
  private zone = inject(NgZone);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 840px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.http.get<BlogPost[]>('assets/blog-posts.json').subscribe(posts => {
      this.blogPosts = posts;
      // console.log('blog', this.blogPosts);
      // if (posts.length > 0) {
      //   this.selectedPost = posts[0];
      // }
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
}
