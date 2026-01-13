import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTopbarComponent } from '../shared/dashboard-topbar.component';
import { SidebarComponent } from '../shared/sidebar.component';
import { MetricCardComponent } from '../shared/metric-card.component';
import { AgeAnalysisChartComponent } from './age-analysis-chart.component';
import { NcfChartComponent } from './ncf-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTopbarComponent,
    SidebarComponent,
    MetricCardComponent,
    AgeAnalysisChartComponent,
    NcfChartComponent
  ],
  template: `
    <div class="dashboard-wrapper">
      <div class="dashboard-container">
        <!-- Top Navigation -->
        <app-dashboard-topbar />
        
        <!-- Main Content Area -->
        <div class="dashboard-body">
          <!-- Sidebar -->
          <app-sidebar />
          
          <!-- Main Content -->
          <div class="dashboard-main-content">
            <!-- My Insights Section -->
            <section class="insights-section card">
              <div class="insights-container">
                <div class="insights-header">
                  <h2 class="heading-xl">My Insights</h2>
                  <button class="primary-button">
                    Add
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12.75 11.25V5C12.75 4.80109 12.671 4.61032 12.5303 4.46967C12.3897 4.32902 12.1989 4.25 12 4.25C11.8011 4.25 11.6103 4.32902 11.4697 4.46967C11.329 4.61032 11.25 4.80109 11.25 5V11.25H5C4.80109 11.25 4.61032 11.329 4.46967 11.4697C4.32902 11.6103 4.25 11.8011 4.25 12C4.25 12.1989 4.32902 12.3897 4.46967 12.5303C4.61032 12.671 4.80109 12.75 5 12.75H11.25V19C11.2526 19.1981 11.3324 19.3874 11.4725 19.5275C11.6126 19.6676 11.8019 19.7474 12 19.75C12.1989 19.75 12.3897 19.671 12.5303 19.5303C12.671 19.3897 12.75 19.1989 12.75 19V12.75H19C19.1989 12.75 19.3897 12.671 19.5303 12.5303C19.671 12.3897 19.75 12.1989 19.75 12C19.7474 11.8019 19.6676 11.6126 19.5275 11.4725C19.3874 11.3324 19.1981 11.2526 19 11.25H12.75Z" fill="white"/>
                    </svg>
                  </button>
                </div>
                
                <div class="insights-cards">
                  <app-metric-card
                    heading="Allocated Budget"
                    subheading="Total: R10,230,112.10"
                    [showData]="true"
                    dataValue="+3.2%"
                    trendDirection="down"
                  />
                  <app-metric-card
                    heading="Total Payment Requests"
                    subheading="Total: R8,372,120.20"
                    [showData]="true"
                    dataValue="+2.5%"
                    trendDirection="up"
                  />
                  <app-metric-card
                    heading="New Added Task"
                    subheading="B_17_2025_10_27_001"
                    [showCount]="true"
                    [countValue]="6"
                  />
                </div>
              </div>
            </section>
            
            <!-- Analysis Overview Section -->
            <section class="analysis-section">
              <h2 class="heading-xl navy-text">Analysis Overview</h2>
            </section>
            
            <!-- Charts Section -->
            <section class="charts-section">
              <app-age-analysis-chart />
              <app-ncf-chart />
            </section>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrapper {
      display: flex;
      width: 100%;
      padding: 32px 16px 30px 16px;
      justify-content: center;
      align-items: center;
      background: var(--bg-light);
      min-height: 100vh;
    }
    
    .dashboard-container {
      display: flex;
      width: 100%;
      max-width: 1408px;
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }
    
    .dashboard-body {
      display: flex;
      align-items: flex-start;
      gap: 32px;
      align-self: stretch;
    }
    
    .dashboard-main-content {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
      gap: 32px;
    }
    
    .insights-section {
      display: flex;
      height: 265px;
      padding: 24px;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      overflow: hidden;
    }
    
    .insights-container {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 32px;
    }
    
    .insights-header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    
    .insights-header h2 {
      margin: 0;
    }
    
    .insights-cards {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 24px;
      align-self: stretch;
    }
    
    .analysis-section {
      display: flex;
      padding: 8px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 16px;
      align-self: stretch;
    }
    
    .analysis-section h2 {
      margin: 0;
    }
    
    .charts-section {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      align-self: stretch;
    }
    
    @media (max-width: 1200px) {
      .insights-cards {
        flex-wrap: wrap;
      }
      
      .charts-section {
        flex-direction: column;
        align-items: center;
      }
    }
    
    @media (max-width: 768px) {
      .dashboard-wrapper {
        padding: 16px;
      }
      
      .dashboard-body {
        flex-direction: column;
        gap: 24px;
      }
      
      .insights-section {
        height: auto;
        min-height: 265px;
        padding: 16px;
      }
      
      .insights-cards {
        flex-direction: column;
        width: 100%;
      }
      
      .insights-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }
    }
  `]
})
export class DashboardComponent {}
