import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

interface ChartLegendItem {
  label: string;
  color: string;
  percentage: string;
}

@Component({
  selector: 'app-age-analysis-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container card">
      <div class="chart-header">
        <div class="chart-title-group">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M23.1625 11.25L16.25 4.3375C16.0744 4.16163 15.8361 4.06272 15.5875 4.0625H10C9.08832 4.0625 8.21398 4.42466 7.56932 5.06932C6.92466 5.71398 6.5625 6.58832 6.5625 7.5V22.5C6.5625 23.4117 6.92466 24.286 7.56932 24.9307C8.21398 25.5753 9.08832 25.9375 10 25.9375H20C20.9117 25.9375 21.786 25.5753 22.4307 24.9307C23.0753 24.286 23.4375 23.4117 23.4375 22.5V11.875C23.4277 11.6395 23.3295 11.4164 23.1625 11.25ZM16.5625 7.2625L20.2375 10.9375H16.5625V7.2625ZM20 24.0625H10C9.5856 24.0625 9.18817 23.8979 8.89515 23.6049C8.60212 23.3118 8.4375 22.9144 8.4375 22.5V7.5C8.4375 7.0856 8.60212 6.68817 8.89515 6.39515C9.18817 6.10212 9.5856 5.9375 10 5.9375H14.6875V11.875C14.6907 12.1226 14.7905 12.3592 14.9657 12.5343C15.1408 12.7095 15.3774 12.8093 15.625 12.8125H21.5625V22.5C21.5625 22.9144 21.3979 23.3118 21.1049 23.6049C20.8118 23.8979 20.4144 24.0625 20 24.0625Z" fill="#003366"/>
          </svg>
          <h3 class="chart-title heading-l">Age Analysis</h3>
        </div>
        <button class="primary-button">
          View Analysis
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.99934 17.75C9.9008 17.7504 9.80316 17.7312 9.71215 17.6934C9.62113 17.6557 9.53858 17.6001 9.46934 17.53C9.32889 17.3893 9.25 17.1987 9.25 17C9.25 16.8012 9.32889 16.6106 9.46934 16.47L13.9393 12L9.46934 7.52997C9.33686 7.38779 9.26474 7.19975 9.26816 7.00545C9.27159 6.81114 9.35031 6.62576 9.48772 6.48835C9.62513 6.35093 9.81052 6.27222 10.0048 6.26879C10.1991 6.26537 10.3872 6.33749 10.5293 6.46997L15.5293 11.47C15.6698 11.6106 15.7487 11.8012 15.7487 12C15.7487 12.1987 15.6698 12.3893 15.5293 12.53L10.5293 17.53C10.4601 17.6001 10.3775 17.6557 10.2865 17.6934C10.1955 17.7312 10.0979 17.7504 9.99934 17.75Z" fill="white"/>
          </svg>
        </button>
      </div>
      
      <div class="chart-content">
        <div class="chart-info">
          <p class="chart-label body-text">Total Outstanding Payments</p>
          <p class="chart-value heading-m navy-text">R58,440,100.00</p>
        </div>
        
        <div class="chart-body">
          <div class="chart-canvas-wrapper">
            <canvas #ageAnalysisCanvas></canvas>
          </div>
          <div class="chart-legend">
            <div *ngFor="let item of legendItems" class="legend-item">
              <div class="legend-color" [style.background-color]="item.color"></div>
              <span class="legend-label small-text">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      display: flex;
      width: 552px;
      height: 404px;
      padding: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 40px;
    }
    
    .chart-header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    
    .chart-title-group {
      display: flex;
      height: 36px;
      align-items: center;
      gap: 8px;
    }
    
    .chart-title {
      margin: 0;
    }
    
    .chart-content {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      flex-shrink: 0;
    }
    
    .chart-info {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
    
    .chart-label {
      margin: 0;
      color: var(--secondary-process-black-main);
    }
    
    .chart-value {
      margin: 0;
      font-weight: 500;
    }
    
    .chart-body {
      display: flex;
      height: 176px;
      padding: 10px;
      align-items: center;
      gap: 40px;
      align-self: stretch;
      background: var(--neutral-white);
    }
    
    .chart-canvas-wrapper {
      width: 200px;
      height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .chart-legend {
      display: flex;
      width: 99px;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 8px;
    }
    
    .legend-item {
      display: flex;
      padding: 1px 0;
      align-items: center;
      gap: 8px;
      align-self: stretch;
    }
    
    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
    
    .legend-label {
      color: var(--secondary-process-black-main);
    }
    
    @media (max-width: 768px) {
      .chart-container {
        width: 100%;
        height: auto;
        padding: 12px;
      }
      
      .chart-header {
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
      }
      
      .chart-body {
        flex-direction: column;
        height: auto;
        gap: 20px;
      }
      
      .chart-canvas-wrapper {
        width: 100%;
        max-width: 200px;
      }
    }
  `]
})
export class AgeAnalysisChartComponent implements OnInit {
  @ViewChild('ageAnalysisCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  chart?: Chart;
  
  legendItems: ChartLegendItem[] = [
    { label: 'Current', color: '#3C695C', percentage: '10%' },
    { label: '30 Days', color: '#AADEA7', percentage: '35%' },
    { label: '60 Days', color: '#E6F69D', percentage: '15%' },
    { label: '90 Days', color: '#176999', percentage: '20%' },
    { label: '90+ Days', color: '#64C2A6', percentage: '20%' }
  ];
  
  ngOnInit() {
    this.createChart();
  }
  
  createChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;
    
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: this.legendItems.map(item => item.label),
        datasets: [{
          data: [10, 35, 15, 20, 20],
          backgroundColor: this.legendItems.map(item => item.color),
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    };
    
    this.chart = new Chart(ctx, config);
  }
  
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
