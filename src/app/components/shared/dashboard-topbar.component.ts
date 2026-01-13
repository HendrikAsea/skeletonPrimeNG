import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-topbar',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule],
  template: `
    <div class="dashboard-topbar card card-large-shadow">
      <div class="topbar-container">
        <div class="company-selection">
          <p-autoComplete 
            [suggestions]="companies" 
            [(ngModel)]="selectedCompany"
            optionLabel="name"
            [style]="{'width': '100%'}"
            styleClass="custom-dropdown"
            placeholder="Select a Company">
            <ng-template pTemplate="selectedItem">
              <div class="dropdown-selected-text">
                {{ selectedCompany?.name || 'Select a Company' }}
              </div>
            </ng-template>
            <ng-template let-company pTemplate="item">
              <div class="dropdown-item-text">
                {{ company.name }}
              </div>
            </ng-template>
          </p-autoComplete>
        </div>
        
        <div class="profile-settings">
          <div class="user-role">
            <span class="user-role-text navy-text">Financial Manager</span>
          </div>
          <div class="user-icon-group">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/88fec0b0c4ede6d98a6a6e6990caa8f490634a12?width=56" 
                 alt="User Avatar" 
                 class="user-avatar" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="dropdown-chevron">
              <path d="M12.0007 15.25C11.9021 15.2505 11.8045 15.2313 11.7135 15.1935C11.6225 15.1557 11.5399 15.1002 11.4707 15.03L6.47067 10.03C6.37094 9.88414 6.32594 9.70771 6.3436 9.53188C6.36126 9.35604 6.44044 9.19208 6.56718 9.06893C6.69392 8.94577 6.86008 8.87133 7.03636 8.85872C7.21263 8.84612 7.38769 8.89617 7.53067 9.00004L12.0007 13.44L16.4707 9.00004C16.6116 8.90865 16.7792 8.86723 16.9465 8.88241C17.1138 8.8976 17.2712 8.96852 17.3933 9.0838C17.5155 9.19908 17.5955 9.35204 17.6204 9.51818C17.6453 9.68432 17.6137 9.854 17.5307 10L12.5307 15C12.464 15.0756 12.3826 15.1367 12.2915 15.1797C12.2003 15.2227 12.1014 15.2466 12.0007 15.25Z" fill="#003366"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-topbar {
      display: flex;
      width: 100%;
      padding: 10px;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    
    .topbar-container {
      display: flex;
      width: 100%;
      height: 80px;
      max-width: 1440px;
      padding: 8px 16px;
      justify-content: space-between;
      align-items: center;
    }
    
    .company-selection {
      display: flex;
      width: 493px;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
    }
    
    .dropdown-selected-text {
      color: var(--dropdown-text-default);
      font-family: var(--font-name-gotham);
      font-size: var(--font-size-s);
      font-weight: 400;
      line-height: var(--line-height-s);
    }
    
    .dropdown-item-text {
      color: var(--dropdown-text-default);
      font-family: var(--font-name-gotham);
      font-size: var(--font-size-s);
      font-weight: 400;
      line-height: var(--line-height-s);
      padding: 8px;
    }
    
    .profile-settings {
      display: flex;
      width: 279px;
      padding: 6px 12px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      border-radius: 50px;
    }
    
    .user-role {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    
    .user-role-text {
      width: 184px;
      max-width: 190px;
      max-height: 40px;
      text-align: center;
      font-size: var(--font-size-s);
      font-weight: 400;
      line-height: var(--line-height-s);
    }
    
    .user-icon-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .user-avatar {
      width: 28px;
      height: 28px;
      border-radius: 23px;
      overflow: hidden;
    }
    
    .dropdown-chevron {
      cursor: pointer;
    }
    
    :host ::ng-deep .custom-dropdown {
      height: 40px;
      border-radius: 16px;
      border: 1px solid var(--dropdown-default-border);
      background: var(--dropdown-default-surface);
    }
    
    :host ::ng-deep .custom-dropdown .p-dropdown-label {
      color: var(--dropdown-text-default);
      font-family: var(--font-name-gotham);
      font-size: var(--font-size-s);
      font-weight: 400;
      line-height: var(--line-height-s);
      padding: 12px;
    }
    
    :host ::ng-deep .custom-dropdown .p-dropdown-trigger {
      color: var(--primary-navy-main);
    }
    
    @media (max-width: 1024px) {
      .topbar-container {
        flex-direction: column;
        height: auto;
        gap: 16px;
        padding: 16px;
      }
      
      .company-selection {
        width: 100%;
      }
      
      .profile-settings {
        width: 100%;
        justify-content: flex-start;
      }
    }
    
    @media (max-width: 768px) {
      .company-selection {
        width: 100%;
      }
      
      .user-role-text {
        width: auto;
        font-size: var(--font-size-xs);
      }
    }
  `]
})
export class DashboardTopbarComponent {
  selectedCompany: any = { name: 'Gap Infrastructure Corporation (Pty) Ltd', code: 'GIC' };
  
  companies = [
    { name: 'Gap Infrastructure Corporation (Pty) Ltd', code: 'GIC' },
    { name: 'Company Two', code: 'C2' },
    { name: 'Company Three', code: 'C3' }
  ];
}
