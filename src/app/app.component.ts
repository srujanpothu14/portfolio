import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { AboutPageComponent } from './about-page/about-page.component';
import { ExperiencePageComponent } from './experience-page/experience-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { IntroPageComponent } from './intro-page/intro-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    AboutPageComponent,
    ExperiencePageComponent,
    ProjectsPageComponent,
    SkillsPageComponent,
    ContactPageComponent,
    IntroPageComponent,
  ],
})
export class AppComponent {
  @ViewChild('slider') slider!: ElementRef;
  currentId: string | null = null;
  tabContainerHeight: number = 70;
  isSticky: boolean = false;
  currentTab: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.onScroll(); // Initial scroll check
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.currentTab) {
      this.setSliderCss();
    }
  }

  onTabClick(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLElement; // Cast event.target to HTMLElement
    const sectionId = target.getAttribute('href')?.substring(1);
    const section = document.getElementById(sectionId || '');
    if (section) {
      const scrollTop = section.offsetTop - this.tabContainerHeight + 1;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }

  checkTabContainerPosition() {
    const tabContainer = this.el.nativeElement.querySelector('.et-hero-tabs');
    const offset =
      tabContainer.offsetTop +
      tabContainer.offsetHeight -
      this.tabContainerHeight;

    if (window.scrollY + 12 > offset) {
      this.isSticky = true;
      this.renderer.addClass(
        this.el.nativeElement.querySelector('.et-hero-tabs-container'),
        'et-hero-tabs-container--top'
      );
    } else {
      this.isSticky = false;
      this.renderer.removeClass(
        this.el.nativeElement.querySelector('.et-hero-tabs-container'),
        'et-hero-tabs-container--top'
      );
    }
  }

  findCurrentTabSelector() {
    let newCurrentId: string | null = null;
    let newCurrentTab: HTMLElement | null = null;

    this.el.nativeElement
      .querySelectorAll('.et-hero-tab')
      .forEach((tab: HTMLElement) => {
        const href = tab.getAttribute('href');
        const id = href ? href.substring(1) : null;

        if (!id) return;

        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop - this.tabContainerHeight;
          const offsetBottom =
            section.offsetTop + section.offsetHeight - this.tabContainerHeight;

          if (window.scrollY > offsetTop && window.scrollY < offsetBottom) {
            newCurrentId = id;
            newCurrentTab = tab;
          }
        }
      });

    if (this.currentId !== newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    if (this.currentTab) {
      const tabWidth = this.currentTab.offsetWidth;
      const tabLeft = this.currentTab.offsetLeft;
      const sliderWidth = this.slider.nativeElement.offsetWidth;

      // Calculate the center position
      const left = tabLeft + tabWidth / 2 - sliderWidth / 2;

      this.slider.nativeElement.style.left = `${left}px`;
      this.slider.nativeElement.style.opacity = `1`;
    }
  }
}
