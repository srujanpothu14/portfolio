import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  ViewChild,
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
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('slider') slider!: ElementRef<HTMLElement>;
  currentId: string | null = null;
  tabContainerHeight = 70;
  isSticky = false;
  isMobileNavOpen = false;
  currentTab: HTMLElement | null = null;

  private readonly mobileBreakpoint = 768;
  private readonly mobileDesktopBridgeBreakpoint = 900;
  private navContainer: HTMLElement | null = null;
  private tabHost: HTMLElement | null = null;
  private sectionEntries: Array<{
    id: string;
    tab: HTMLElement;
    section: HTMLElement;
  }> = [];
  private scrollRafId: number | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.cacheNavigationReferences();
    this.refreshTabContainerHeight();
    this.handleScrollUpdate();
  }

  ngOnDestroy() {
    if (this.scrollRafId !== null) {
      cancelAnimationFrame(this.scrollRafId);
      this.scrollRafId = null;
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.scrollRafId !== null) {
      return;
    }

    this.scrollRafId = requestAnimationFrame(() => {
      this.scrollRafId = null;
      this.handleScrollUpdate();
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.cacheNavigationReferences();
    this.refreshTabContainerHeight();

    if (window.innerWidth > this.mobileBreakpoint && this.isMobileNavOpen) {
      this.isMobileNavOpen = false;
    }

    if (this.currentTab) {
      this.setSliderCss();
    }

    this.handleScrollUpdate();
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
    this.refreshTabContainerHeight();
  }

  onTabClick(event: Event) {
    event.preventDefault();
    const target = (event.currentTarget || event.target) as HTMLAnchorElement;
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

  private handleScrollUpdate() {
    this.checkTabContainerPosition();
    this.findCurrentTabSelector();
  }

  private cacheNavigationReferences() {
    this.tabHost = this.el.nativeElement.querySelector('.et-hero-tabs');
    this.navContainer = this.el.nativeElement.querySelector(
      '.et-hero-tabs-container',
    );

    const tabs = Array.from(
      this.el.nativeElement.querySelectorAll('.et-hero-tab'),
    ) as HTMLElement[];

    this.sectionEntries = tabs
      .map((tab) => {
        const href = tab.getAttribute('href');
        const id = href ? href.substring(1) : null;

        if (!id) {
          return null;
        }

        const section = document.getElementById(id);

        if (!section) {
          return null;
        }

        return { id, tab, section };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }

  private refreshTabContainerHeight() {
    if (!this.navContainer) {
      return;
    }

    this.tabContainerHeight = Math.max(
      this.navContainer.getBoundingClientRect().height,
      48,
    );
  }

  private checkTabContainerPosition() {
    if (!this.tabHost || !this.navContainer) {
      return;
    }

    // On mobile we keep the nav in document flow to avoid capturing vertical swipe scroll.
    if (window.innerWidth <= this.mobileBreakpoint) {
      this.isSticky = false;
      this.renderer.removeClass(
        this.navContainer,
        'et-hero-tabs-container--top',
      );
      return;
    }

    this.refreshTabContainerHeight();

    const offset =
      this.tabHost.offsetTop +
      this.tabHost.offsetHeight -
      this.tabContainerHeight;

    if (window.scrollY + 12 > offset) {
      this.isSticky = true;
      this.renderer.addClass(this.navContainer, 'et-hero-tabs-container--top');
    } else {
      this.isSticky = false;
      this.renderer.removeClass(
        this.navContainer,
        'et-hero-tabs-container--top',
      );
    }
  }

  private findCurrentTabSelector() {
    let newCurrentId: string | null = null;
    let newCurrentTab: HTMLElement | null = null;

    for (const entry of this.sectionEntries) {
      const offsetTop = entry.section.offsetTop - this.tabContainerHeight;
      const offsetBottom =
        entry.section.offsetTop +
        entry.section.offsetHeight -
        this.tabContainerHeight;

      if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
        newCurrentId = entry.id;
        newCurrentTab = entry.tab;
      }
    }

    if (this.currentId !== newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  private setSliderCss() {
    if (this.currentTab && this.slider?.nativeElement) {
      const tabWidth = this.currentTab.offsetWidth;
      const tabLeft = this.currentTab.offsetLeft;
      const sliderWidth = this.slider.nativeElement.offsetWidth;

      // Calculate the center position
      const left = tabLeft + tabWidth / 2 - sliderWidth / 2;

      this.slider.nativeElement.style.left = `${left}px`;
      this.slider.nativeElement.style.opacity = `1`;

      if (
        this.navContainer &&
        window.innerWidth > this.mobileBreakpoint &&
        window.innerWidth <= this.mobileDesktopBridgeBreakpoint
      ) {
        this.currentTab.scrollIntoView({ inline: 'center', block: 'nearest' });
      }

      return;
    }

    if (this.slider?.nativeElement) {
      this.slider.nativeElement.style.opacity = `0`;
    }
  }
}
