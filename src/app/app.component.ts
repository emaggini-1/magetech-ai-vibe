import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, shareReplay, take } from 'rxjs';

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
    AsyncPipe,
    HttpClientModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'blog-test2';
  blogPosts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);
  private http = inject(HttpClient);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 599px)')
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

    // Close sidenav when a post is selected, regardless of device mode
    this.sidenav.close();
  }

  goToHomepage() {
    this.selectedPost = null;

    // Close sidenav when going to homepage
    this.sidenav.close();
  }
}
