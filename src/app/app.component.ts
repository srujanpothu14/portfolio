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
import { EducationPageComponent } from './education-page/education-page.component';
import { CertificationsPageComponent } from './certifications-page/certifications-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    AboutPageComponent,
    ExperiencePageComponent,
    ProjectsPageComponent,
    SkillsPageComponent,
    EducationPageComponent,
    CertificationsPageComponent,
    ContactPageComponent,
    IntroPageComponent,
  ],
})
export class AppComponent {
  @ViewChild('slider') slider!: ElementRef;
  currentId: string | null = null;
  tabContainerHeight: number = 70;
  isSticky: boolean = false;
  isMobileNavOpen: boolean = false;
  currentTab: HTMLElement | null = null;
  private readonly mobileBreakpoint = 768;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.refreshTabContainerHeight();
    this.onScroll(); // Initial scroll check
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  @HostListener('window:resize')
  onResize() {
    this.refreshTabContainerHeight();

    if (window.innerWidth > this.mobileBreakpoint && this.isMobileNavOpen) {
      this.isMobileNavOpen = false;
    }

    if (this.currentTab) {
      this.setSliderCss();
    }
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
    this.refreshTabContainerHeight();
  }

  onTabClick(event: Event) {
    event.preventDefault();
    const target = (event.currentTarget || event.target) as HTMLElement;
    const sectionId = target.getAttribute('href')?.substring(1);
    const section = document.getElementById(sectionId || '');

    if (section) {
      const isMobile = window.innerWidth <= this.mobileBreakpoint;
      const scrollTop =
        section.offsetTop - this.tabContainerHeight - (isMobile ? 8 : 2);

      window.scrollTo({ top: scrollTop, behavior: 'smooth' });

      if (isMobile && this.isMobileNavOpen) {
        this.isMobileNavOpen = false;
        this.refreshTabContainerHeight();
      }
    }
  }

  private refreshTabContainerHeight() {
    const tabContainer = this.el.nativeElement.querySelector(
      '.et-hero-tabs-container',
    ) as HTMLElement | null;

    if (!tabContainer) {
      return;
    }

    this.tabContainerHeight = Math.max(
      tabContainer.getBoundingClientRect().height,
      48,
    );
  }

  checkTabContainerPosition() {
    const tabContainer = this.el.nativeElement.querySelector('.et-hero-tabs');
    const navContainer = this.el.nativeElement.querySelector(
      '.et-hero-tabs-container',
    );

    if (!tabContainer || !navContainer) {
      return;
    }

    // On mobile we keep the nav in document flow to avoid capturing vertical swipe scroll.
    if (window.innerWidth <= this.mobileBreakpoint) {
      this.isSticky = false;
      this.renderer.removeClass(navContainer, 'et-hero-tabs-container--top');
      return;
    }

    this.refreshTabContainerHeight();

    const offset =
      tabContainer.offsetTop +
      tabContainer.offsetHeight -
      this.tabContainerHeight;

    if (window.scrollY + 12 > offset) {
      this.isSticky = true;
      this.renderer.addClass(navContainer, 'et-hero-tabs-container--top');
    } else {
      this.isSticky = false;
      this.renderer.removeClass(navContainer, 'et-hero-tabs-container--top');
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
    if (this.currentTab && this.slider?.nativeElement) {
      const tabWidth = this.currentTab.offsetWidth;
      const tabLeft = this.currentTab.offsetLeft;
      const sliderWidth = this.slider.nativeElement.offsetWidth;

      // Calculate the center position
      const left = tabLeft + tabWidth / 2 - sliderWidth / 2;

      this.slider.nativeElement.style.left = `${left}px`;
      this.slider.nativeElement.style.opacity = `1`;

      const tabContainer = this.el.nativeElement.querySelector(
        '.et-hero-tabs-container',
      ) as HTMLElement | null;

      if (
        tabContainer &&
        window.innerWidth > this.mobileBreakpoint &&
        window.innerWidth <= 900
      ) {
        this.currentTab.scrollIntoView({ inline: 'center', block: 'nearest' });
      }
    }
  }
}
