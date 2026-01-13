import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-ncf-chart',
  standalone: true,
  imports: [CommonModule, DropdownModule, FormsModule],
  template: `
    <div class="ncf-chart-container card">
      <div class="ncf-chart-content">
        <div class="ncf-chart-header">
          <div class="ncf-heading-group">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M5.625 25.3125C5.37737 25.3093 5.14079 25.2095 4.96567 25.0343C4.79055 24.8592 4.69074 24.6226 4.6875 24.375V5.625C4.6875 5.37636 4.78627 5.1379 4.96209 4.96209C5.1379 4.78627 5.37636 4.6875 5.625 4.6875C5.87364 4.6875 6.1121 4.78627 6.28791 4.96209C6.46373 5.1379 6.5625 5.37636 6.5625 5.625V24.375C6.55926 24.6226 6.45945 24.8592 6.28433 25.0343C6.10921 25.2095 5.87263 25.3093 5.625 25.3125Z" fill="#003366"/>
              <path d="M24.375 25.3125H5.625C5.37636 25.3125 5.1379 25.2137 4.96209 25.0379C4.78627 24.8621 4.6875 24.6236 4.6875 24.375C4.6875 24.1264 4.78627 23.8879 4.96209 23.7121C5.1379 23.5363 5.37636 23.4375 5.625 23.4375H24.375C24.6236 23.4375 24.8621 23.5363 25.0379 23.7121C25.2137 23.8879 25.3125 24.1264 25.3125 24.375C25.3125 24.6236 25.2137 24.8621 25.0379 25.0379C24.8621 25.2137 24.6236 25.3125 24.375 25.3125Z" fill="#003366"/>
              <path d="M10 20.9375C9.75237 20.9343 9.51579 20.8345 9.34067 20.6593C9.16555 20.4842 9.06574 20.2476 9.0625 20V15C9.0625 14.7514 9.16127 14.5129 9.33709 14.3371C9.5129 14.1613 9.75136 14.0625 10 14.0625C10.2486 14.0625 10.4871 14.1613 10.6629 14.3371C10.8387 14.5129 10.9375 14.7514 10.9375 15V20C10.9343 20.2476 10.8345 20.4842 10.6593 20.6593C10.4842 20.8345 10.2476 20.9343 10 20.9375Z" fill="#003366"/>
              <path d="M14.375 20.9375C14.1274 20.9343 13.8908 20.8345 13.7157 20.6593C13.5405 20.4842 13.4407 20.2476 13.4375 20V10C13.4375 9.75136 13.5363 9.5129 13.7121 9.33709C13.8879 9.16127 14.1264 9.0625 14.375 9.0625C14.6236 9.0625 14.8621 9.16127 15.0379 9.33709C15.2137 9.5129 15.3125 9.75136 15.3125 10V20C15.3093 20.2476 15.2095 20.4842 15.0343 20.6593C14.8592 20.8345 14.6226 20.9343 14.375 20.9375Z" fill="#003366"/>
              <path d="M18.75 20.9375C18.5024 20.9343 18.2658 20.8345 18.0907 20.6593C17.9155 20.4842 17.8157 20.2476 17.8125 20V15C17.8125 14.7514 17.9113 14.5129 18.0871 14.3371C18.2629 14.1613 18.5014 14.0625 18.75 14.0625C18.9986 14.0625 19.2371 14.1613 19.4129 14.3371C19.5887 14.5129 19.6875 14.7514 19.6875 15V20C19.6843 20.2476 19.5845 20.4842 19.4093 20.6593C19.2342 20.8345 18.9976 20.9343 18.75 20.9375Z" fill="#003366"/>
              <path d="M23.125 20.9375C22.8774 20.9343 22.6408 20.8345 22.4657 20.6593C22.2905 20.4842 22.1907 20.2476 22.1875 20V10C22.1875 9.75136 22.2863 9.5129 22.4621 9.33709C22.6379 9.16127 22.8764 9.0625 23.125 9.0625C23.3736 9.0625 23.6121 9.16127 23.7879 9.33709C23.9637 9.5129 24.0625 9.75136 24.0625 10V20C24.0593 20.2476 23.9595 20.4842 23.7843 20.6593C23.6092 20.8345 23.3726 20.9343 23.125 20.9375Z" fill="#003366"/>
            </svg>
            <div class="ncf-title-group">
              <h3 class="ncf-chart-title heading-l primary-text">NCF Grand Total</h3>
              <p class="ncf-chart-value body-text">R227,702,397.56</p>
            </div>
          </div>
          
          <div class="ncf-filter">
            <p-dropdown 
              [options]="filterOptions" 
              [(ngModel)]="selectedFilter"
              optionLabel="label"
              [style]="{'width': '145px'}"
              styleClass="filter-dropdown">
              <ng-template pTemplate="selectedItem">
                <div class="filter-selected">
                  {{ selectedFilter?.label || 'All Payments' }}
                </div>
              </ng-template>
            </p-dropdown>
          </div>
        </div>
        
        <div class="ncf-chart-body">
          <canvas #ncfCanvas></canvas>
        </div>
        
        <div class="ncf-legend">
          <div class="legend-item-ncf">
            <div class="legend-color-ncf" style="background: #101648;"></div>
            <span class="legend-label-ncf small-text">Total Withdrawn Payments</span>
          </div>
          <div class="legend-item-ncf">
            <div class="legend-color-ncf" style="background: #7987FF;"></div>
            <span class="legend-label-ncf small-text">Total Available to BP</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ncf-chart-container {
      display: flex;
      width: 552px;
      height: 404px;
      align-items: center;
      gap: 24px;
    }
    
    .ncf-chart-content {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 40px;
      flex-shrink: 0;
    }
    
    .ncf-chart-header {
      display: flex;
      width: 100%;
      align-items: flex-start;
      gap: 8px;
      justify-content: space-between;
    }
    
    .ncf-heading-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      flex-shrink: 0;
    }
    
    .ncf-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
      align-self: stretch;
    }
    
    .ncf-chart-title {
      margin: 0;
    }
    
    .ncf-chart-value {
      margin: 0;
      color: var(--secondary-process-black-main);
    }
    
    .ncf-filter {
      display: flex;
      align-items: flex-start;
    }
    
    .filter-selected {
      color: var(--primary-navy-main);
      font-family: var(--font-name-gotham);
      font-size: var(--font-size-xs);
      font-weight: 500;
      line-height: var(--line-height-xs);
    }
    
    .ncf-chart-body {
      display: flex;
      width: 100%;
      height: 205px;
      padding: 16px 0;
      align-items: flex-end;
      gap: 16px;
      flex-shrink: 0;
      background: var(--neutral-white);
    }
    
    .ncf-legend {
      display: flex;
      height: 32px;
      padding: 8px 0;
      align-items: flex-end;
      gap: 8px;
      flex-shrink: 0;
      align-self: stretch;
    }
    
    .legend-item-ncf {
      display: flex;
      padding: 1px 0;
      align-items: center;
      gap: 8px;
    }
    
    .legend-color-ncf {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
    
    .legend-label-ncf {
      color: var(--secondary-process-black-main);
    }
    
    :host ::ng-deep .filter-dropdown {
      height: 24px;
      border-radius: 4px;
      background: var(--neutral-white);
      border: none;
    }
    
    :host ::ng-deep .filter-dropdown .p-dropdown-label {
      color: var(--primary-navy-main);
      font-family: var(--font-name-gotham);
      font-size: var(--font-size-xs);
      font-weight: 500;
      line-height: var(--line-height-xs);
      padding: 12px 4px;
    }
    
    :host ::ng-deep .filter-dropdown .p-dropdown-trigger {
      color: var(--primary-navy-main);
    }
    
    @media (max-width: 768px) {
      .ncf-chart-container {
        width: 100%;
        height: auto;
      }
      
      .ncf-chart-header {
        flex-direction: column;
        gap: 16px;
      }
      
      .ncf-chart-body {
        height: auto;
        min-height: 200px;
      }
    }
  `]
})
export class NcfChartComponent implements OnInit {
  @ViewChild('ncfCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  chart?: Chart;
  selectedFilter: any = { label: 'All Payments', value: 'all' };
  
  filterOptions = [
    { label: 'All Payments', value: 'all' },
    { label: 'This Month', value: 'month' },
    { label: 'This Quarter', value: 'quarter' }
  ];
  
  ngOnInit() {
    this.createChart();
  }
  
  createChart() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;
    
    const data = {
      labels: ['Current', '30 Days', '60 Days', '90 Days'],
      datasets: [
        {
          label: 'Total Withdrawn Payments',
          data: [650, 700, 550, 720],
          backgroundColor: '#101648',
          barPercentage: 0.7,
          categoryPercentage: 0.8
        },
        {
          label: 'Total Available to BP',
          data: [280, 320, 180, 240],
          backgroundColor: '#7987FF',
          barPercentage: 0.7,
          categoryPercentage: 0.8
        }
      ]
    };
    
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              display: true,
              color: '#F1F1F1',
              drawOnChartArea: true
            },
            ticks: {
              color: '#000000',
              font: {
                family: 'Gotham, -apple-system, Roboto, Helvetica, sans-serif',
                size: 12
              }
            }
          },
          y: {
            stacked: false,
            grid: {
              display: true,
              color: '#F1F1F1',
              drawOnChartArea: true
            },
            ticks: {
              color: '#000000',
              font: {
                family: 'Gotham, -apple-system, Roboto, Helvetica, sans-serif',
                size: 12
              },
              callback: function(value) {
                return '-R' + value + 'k';
              }
            },
            reverse: true,
            min: 0,
            max: 1000
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
