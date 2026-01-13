import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  label: string;
  icon?: string;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ToggleSwitchModule, FormsModule],
  template: `
    <div class="sidebar card">
      <!-- Logo and Toggle -->
      <div class="sidebar-header">
        <div class="sidebar-content">
          <div class="sidebar-logo">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/7274630a6f7992a8831378abaa3cbae389c3797f?width=218" alt="InfraCash" />
          </div>
          <button class="sidebar-toggle-btn" (click)="toggleSidebar()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.9993 17.75C13.9008 17.7504 13.8032 17.7312 13.7121 17.6934C13.6211 17.6557 13.5386 17.6001 13.4693 17.53L8.46934 12.53C8.32889 12.3893 8.25 12.1987 8.25 12C8.25 11.8012 8.32889 11.6106 8.46934 11.47L13.4693 6.46997C13.6115 6.33749 13.7996 6.26537 13.9939 6.26879C14.1882 6.27222 14.3735 6.35093 14.511 6.48835C14.6484 6.62576 14.7271 6.81114 14.7305 7.00545C14.7339 7.19975 14.6618 7.38779 14.5293 7.52997L10.0593 12L14.5293 16.47C14.6698 16.6106 14.7487 16.8012 14.7487 17C14.7487 17.1987 14.6698 17.3893 14.5293 17.53C14.4601 17.6001 14.3775 17.6557 14.2865 17.6934C14.1955 17.7312 14.0979 17.7504 13.9993 17.75Z" fill="#003366"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Menu Items -->
      <div class="sidebar-menu">
        <div *ngFor="let item of menuItems" class="sidebar-menu-item" [class.active]="item.expanded">
          <button class="sidebar-menu-button" (click)="toggleMenuItem(item)">
            <div class="sidebar-menu-label">
              <svg *ngIf="item.icon && item.icon === 'file'" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18.53 9L13 3.47C12.8595 3.32931 12.6688 3.25018 12.47 3.25H8C7.27065 3.25 6.57118 3.53973 6.05546 4.05546C5.53973 4.57118 5.25 5.27065 5.25 6V18C5.25 18.7293 5.53973 19.4288 6.05546 19.9445C6.57118 20.4603 7.27065 20.75 8 20.75H16C16.7293 20.75 17.4288 20.4603 17.9445 19.9445C18.4603 19.4288 18.75 18.7293 18.75 18V9.5C18.7421 9.3116 18.6636 9.13309 18.53 9ZM13.25 5.81L16.19 8.75H13.25V5.81ZM16 19.25H8C7.66848 19.25 7.35054 19.1183 7.11612 18.8839C6.8817 18.6495 6.75 18.3315 6.75 18V6C6.75 5.66848 6.8817 5.35054 7.11612 5.11612C7.35054 4.8817 7.66848 4.75 8 4.75H11.75V9.5C11.7526 9.69811 11.8324 9.88737 11.9725 10.0275C12.1126 10.1676 12.3019 10.2474 12.5 10.25H17.25V18C17.25 18.3315 17.1183 18.6495 16.8839 18.8839C16.6495 19.1183 16.3315 19.25 16 19.25Z" fill="#003366"/>
              </svg>
              <svg *ngIf="item.icon && item.icon === 'chart'" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 20.25C4.30189 20.2474 4.11263 20.1676 3.97253 20.0275C3.83244 19.8874 3.75259 19.6981 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75C4.69891 3.75 4.88968 3.82902 5.03033 3.96967C5.17098 4.11032 5.25 4.30109 5.25 4.5V19.5C5.24741 19.6981 5.16756 19.8874 5.02747 20.0275C4.88737 20.1676 4.69811 20.2474 4.5 20.25Z" fill="#003366"/>
                <path d="M19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5C3.75 19.3011 3.82902 19.1103 3.96967 18.9697C4.11032 18.829 4.30109 18.75 4.5 18.75H19.5C19.6989 18.75 19.8897 18.829 20.0303 18.9697C20.171 19.1103 20.25 19.3011 20.25 19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25Z" fill="#003366"/>
                <path d="M8 16.75C7.80189 16.7474 7.61263 16.6676 7.47253 16.5275C7.33244 16.3874 7.25259 16.1981 7.25 16V12C7.25 11.8011 7.32902 11.6103 7.46967 11.4697C7.61032 11.329 7.80109 11.25 8 11.25C8.19891 11.25 8.38968 11.329 8.53033 11.4697C8.67098 11.6103 8.75 11.8011 8.75 12V16C8.74741 16.1981 8.66756 16.3874 8.52747 16.5275C8.38737 16.6676 8.19811 16.7474 8 16.75Z" fill="#003366"/>
                <path d="M11.5 16.75C11.3019 16.7474 11.1126 16.6676 10.9725 16.5275C10.8324 16.3874 10.7526 16.1981 10.75 16V8C10.75 7.80109 10.829 7.61032 10.9697 7.46967C11.1103 7.32902 11.3011 7.25 11.5 7.25C11.6989 7.25 11.8897 7.32902 12.0303 7.46967C12.171 7.61032 12.25 7.80109 12.25 8V16C12.2474 16.1981 12.1676 16.3874 12.0275 16.5275C11.8874 16.6676 11.6981 16.7474 11.5 16.75Z" fill="#003366"/>
                <path d="M15 16.75C14.8019 16.7474 14.6126 16.6676 14.4725 16.5275C14.3324 16.3874 14.2526 16.1981 14.25 16V12C14.25 11.8011 14.329 11.6103 14.4697 11.4697C14.6103 11.329 14.8011 11.25 15 11.25C15.1989 11.25 15.3897 11.329 15.5303 11.4697C15.671 11.6103 15.75 11.8011 15.75 12V16C15.7474 16.1981 15.6676 16.3874 15.5275 16.5275C15.3874 16.6676 15.1981 16.7474 15 16.75Z" fill="#003366"/>
                <path d="M18.5 16.75C18.3019 16.7474 18.1126 16.6676 17.9725 16.5275C17.8324 16.3874 17.7526 16.1981 17.75 16V8C17.75 7.80109 17.829 7.61032 17.9697 7.46967C18.1103 7.32902 18.3011 7.25 18.5 7.25C18.6989 7.25 18.8897 7.32902 19.0303 7.46967C19.171 7.61032 19.25 7.80109 19.25 8V16C19.2474 16.1981 19.1676 16.3874 19.0275 16.5275C18.8874 16.6676 18.6981 16.7474 18.5 16.75Z" fill="#003366"/>
              </svg>
              <span [class.menu-label-bold]="item.expanded">{{ item.label }}</span>
            </div>
            <svg *ngIf="item.children" width="24" height="24" viewBox="0 0 24 24" fill="none" [class.rotate-icon]="item.expanded">
              <path d="M12.0007 15.25C11.9021 15.2505 11.8045 15.2313 11.7135 15.1935C11.6225 15.1557 11.5399 15.1002 11.4707 15.03L6.47067 10.03C6.37094 9.88414 6.32594 9.70771 6.3436 9.53188C6.36126 9.35604 6.44044 9.19208 6.56718 9.06893C6.69392 8.94577 6.86008 8.87133 7.03636 8.85872C7.21263 8.84612 7.38769 8.89617 7.53067 9.00004L12.0007 13.44L16.4707 9.00004C16.6116 8.90865 16.7792 8.86723 16.9465 8.88241C17.1138 8.8976 17.2712 8.96852 17.3933 9.0838C17.5155 9.19908 17.5955 9.35204 17.6204 9.51818C17.6453 9.68432 17.6137 9.854 17.5307 10L12.5307 15C12.464 15.0756 12.3826 15.1367 12.2915 15.1797C12.2003 15.2227 12.1014 15.2466 12.0007 15.25Z" fill="#003366"/>
            </svg>
          </button>
          
          <!-- Submenu -->
          <div *ngIf="item.expanded && item.children" class="sidebar-submenu">
            <button *ngFor="let child of item.children" class="sidebar-submenu-item">
              <svg *ngIf="child.icon === 'file'" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18.53 9L13 3.47C12.8595 3.32931 12.6688 3.25018 12.47 3.25H8C7.27065 3.25 6.57118 3.53973 6.05546 4.05546C5.53973 4.57118 5.25 5.27065 5.25 6V18C5.25 18.7293 5.53973 19.4288 6.05546 19.9445C6.57118 20.4603 7.27065 20.75 8 20.75H16C16.7293 20.75 17.4288 20.4603 17.9445 19.9445C18.4603 19.4288 18.75 18.7293 18.75 18V9.5C18.7421 9.3116 18.6636 9.13309 18.53 9ZM13.25 5.81L16.19 8.75H13.25V5.81ZM16 19.25H8C7.66848 19.25 7.35054 19.1183 7.11612 18.8839C6.8817 18.6495 6.75 18.3315 6.75 18V6C6.75 5.66848 6.8817 5.35054 7.11612 5.11612C7.35054 4.8817 7.66848 4.75 8 4.75H11.75V9.5C11.7526 9.69811 11.8324 9.88737 11.9725 10.0275C12.1126 10.1676 12.3019 10.2474 12.5 10.25H17.25V18C17.25 18.3315 17.1183 18.6495 16.8839 18.8839C16.6495 19.1183 16.3315 19.25 16 19.25Z" fill="#003366"/>
              </svg>
              <svg *ngIf="child.icon === 'chart'" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 20.25C4.30189 20.2474 4.11263 20.1676 3.97253 20.0275C3.83244 19.8874 3.75259 19.6981 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75C4.69891 3.75 4.88968 3.82902 5.03033 3.96967C5.17098 4.11032 5.25 4.30109 5.25 4.5V19.5C5.24741 19.6981 5.16756 19.8874 5.02747 20.0275C4.88737 20.1676 4.69811 20.2474 4.5 20.25Z" fill="#003366"/>
                <path d="M19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5C3.75 19.3011 3.82902 19.1103 3.96967 18.9697C4.11032 18.829 4.30109 18.75 4.5 18.75H19.5C19.6989 18.75 19.8897 18.829 20.0303 18.9697C20.171 19.1103 20.25 19.3011 20.25 19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25Z" fill="#003366"/>
                <path d="M8 16.75C7.80189 16.7474 7.61263 16.6676 7.47253 16.5275C7.33244 16.3874 7.25259 16.1981 7.25 16V12C7.25 11.8011 7.32902 11.6103 7.46967 11.4697C7.61032 11.329 7.80109 11.25 8 11.25C8.19891 11.25 8.38968 11.329 8.53033 11.4697C8.67098 11.6103 8.75 11.8011 8.75 12V16C8.74741 16.1981 8.66756 16.3874 8.52747 16.5275C8.38737 16.6676 8.19811 16.7474 8 16.75Z" fill="#003366"/>
                <path d="M11.5 16.75C11.3019 16.7474 11.1126 16.6676 10.9725 16.5275C10.8324 16.3874 10.7526 16.1981 10.75 16V8C10.75 7.80109 10.829 7.61032 10.9697 7.46967C11.1103 7.32902 11.3011 7.25 11.5 7.25C11.6989 7.25 11.8897 7.32902 12.0303 7.46967C12.171 7.61032 12.25 7.80109 12.25 8V16C12.2474 16.1981 12.1676 16.3874 12.0275 16.5275C11.8874 16.6676 11.6981 16.7474 11.5 16.75Z" fill="#003366"/>
                <path d="M15 16.75C14.8019 16.7474 14.6126 16.6676 14.4725 16.5275C14.3324 16.3874 14.2526 16.1981 14.25 16V12C14.25 11.8011 14.329 11.6103 14.4697 11.4697C14.6103 11.329 14.8011 11.25 15 11.25C15.1989 11.25 15.3897 11.329 15.5303 11.4697C15.671 11.6103 15.75 11.8011 15.75 12V16C15.7474 16.1981 15.6676 16.3874 15.5275 16.5275C15.3874 16.6676 15.1981 16.7474 15 16.75Z" fill="#003366"/>
                <path d="M18.5 16.75C18.3019 16.7474 18.1126 16.6676 17.9725 16.5275C17.8324 16.3874 17.7526 16.1981 17.75 16V8C17.75 7.80109 17.829 7.61032 17.9697 7.46967C18.1103 7.32902 18.3011 7.25 18.5 7.25C18.6989 7.25 18.8897 7.32902 19.0303 7.46967C19.171 7.61032 19.25 7.80109 19.25 8V16C19.2474 16.1981 19.1676 16.3874 19.0275 16.5275C18.8874 16.6676 18.6981 16.7474 18.5 16.75Z" fill="#003366"/>
              </svg>
              <span class="submenu-label">{{ child.label }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="sidebar-footer">
        <div class="sidebar-footer-item">
          <span class="body-text primary-text">Dark Mode</span>
          <p-inputSwitch [(ngModel)]="darkModeEnabled" />
        </div>
        <div class="sidebar-footer-item">
          <span class="body-text primary-text">Need Help?</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z" fill="#003366"/>
            <path d="M12 13C11.8019 12.9974 11.6126 12.9176 11.4725 12.7775C11.3324 12.6374 11.2526 12.4481 11.25 12.25V8.75C11.25 8.55109 11.329 8.36032 11.4697 8.21967C11.6103 8.07902 11.8011 8 12 8C12.1989 8 12.3897 8.07902 12.5303 8.21967C12.671 8.36032 12.75 8.55109 12.75 8.75V12.25C12.7474 12.4481 12.6676 12.6374 12.5275 12.7775C12.3874 12.9176 12.1981 12.9974 12 13Z" fill="#003366"/>
            <path d="M12 16C11.8019 15.9974 11.6126 15.9176 11.4725 15.7775C11.3324 15.6374 11.2526 15.4481 11.25 15.25V14.75C11.25 14.5511 11.329 14.3603 11.4697 14.2197C11.6103 14.079 11.8011 14 12 14C12.1989 14 12.3897 14.079 12.5303 14.2197C12.671 14.3603 12.75 14.5511 12.75 14.75V15.25C12.7474 15.4481 12.6676 15.6374 12.5275 15.7775C12.3874 15.9176 12.1981 15.9974 12 16Z" fill="#003366"/>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      display: flex;
      width: 247px;
      padding: 4px 0;
      flex-direction: column;
      align-items: center;
      min-height: calc(100vh - 144px);
    }
    
    .sidebar-header {
      display: flex;
      width: 247px;
      height: 80px;
      padding: 12px 16px;
      justify-content: space-between;
      align-items: center;
      border-radius: 16px 16px 0 0;
      background: var(--neutral-white);
    }
    
    .sidebar-content {
      display: flex;
      width: 215px;
      padding: 8px;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    
    .sidebar-logo {
      display: flex;
      width: 109px;
      height: 34px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }
    
    .sidebar-logo img {
      width: 109px;
      height: 34px;
      flex-shrink: 0;
    }
    
    .sidebar-toggle-btn {
      display: flex;
      width: 28px;
      height: 28px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-radius: 24px;
      background: var(--neutral-subtle-main);
      border: none;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .sidebar-toggle-btn:hover {
      background: #cbd5e1;
    }
    
    .sidebar-menu {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      flex: 1;
    }
    
    .sidebar-menu-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
      background: var(--neutral-white);
    }
    
    .sidebar-menu-item.active .sidebar-menu-button {
      background: var(--bg-light);
      border-radius: 16px;
    }
    
    .sidebar-menu-button {
      display: flex;
      height: 80px;
      padding: 12px 16px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: background 0.3s ease;
      width: 100%;
    }
    
    .sidebar-menu-button:hover {
      background: var(--bg-light);
    }
    
    .sidebar-menu-label {
      display: flex;
      padding: 8px;
      justify-content: space-between;
      align-items: center;
      flex: 1 0 0;
      gap: 8px;
      color: var(--text-primary-main);
      font-size: var(--font-size-s);
      font-weight: 400;
      line-height: var(--line-height-s);
    }
    
    .menu-label-bold {
      font-weight: 700;
      color: var(--text-bluegray-main);
    }
    
    .rotate-icon {
      transform: rotate(180deg);
      transition: transform 0.3s ease;
    }
    
    .sidebar-submenu {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      align-self: stretch;
    }
    
    .sidebar-submenu-item {
      display: flex;
      height: 40px;
      padding: 12px 16px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
      background: var(--neutral-white);
      border: none;
      cursor: pointer;
      gap: 8px;
      transition: background 0.3s ease;
    }
    
    .sidebar-submenu-item:hover {
      background: var(--bg-light);
    }
    
    .submenu-label {
      flex: 1 0 0;
      color: var(--text-primary-main);
      font-size: var(--font-size-xs);
      font-weight: 400;
      line-height: var(--line-height-xs);
      padding: 8px;
    }
    
    .sidebar-footer {
      display: flex;
      width: 231px;
      padding: 24px 16px;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 24px;
      background: var(--neutral-white);
    }
    
    .sidebar-footer-item {
      display: flex;
      padding: 8px;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;
    }
    
    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        min-height: auto;
      }
      
      .sidebar-header {
        width: 100%;
      }
    }
  `]
})
export class SidebarComponent {
  darkModeEnabled = signal(false);
  
  menuItems: MenuItem[] = [
    {
      label: 'Analytics',
      expanded: true,
      children: [
        { label: 'Age Analysis', icon: 'file' },
        { label: 'NCF Dashboard', icon: 'chart' }
      ]
    },
    { label: 'Business Partners' },
    { label: 'Transactions' },
    { label: 'Proforma' }
  ];
  
  toggleSidebar() {
    // Sidebar collapse logic
  }
  
  toggleMenuItem(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }
}
