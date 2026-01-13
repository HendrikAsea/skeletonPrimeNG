import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metric-card card surface-border">
      <div class="metric-card-content">
        <div class="metric-card-header">
          <div class="metric-card-text">
            <h3 class="metric-card-heading heading-m">{{ heading }}</h3>
            <p class="metric-card-subheading body-text black-text">{{ subheading }}</p>
          </div>
          <div class="metric-card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9.99934 17.75C9.9008 17.7504 9.80316 17.7312 9.71215 17.6934C9.62113 17.6557 9.53858 17.6001 9.46934 17.53C9.32889 17.3893 9.25 17.1987 9.25 17C9.25 16.8012 9.32889 16.6106 9.46934 16.47L13.9393 12L9.46934 7.52997C9.33686 7.38779 9.26474 7.19975 9.26816 7.00545C9.27159 6.81114 9.35031 6.62576 9.48772 6.48835C9.62513 6.35093 9.81052 6.27222 10.0048 6.26879C10.1991 6.26537 10.3872 6.33749 10.5293 6.46997L15.5293 11.47C15.6698 11.6106 15.7487 11.8012 15.7487 12C15.7487 12.1987 15.6698 12.3893 15.5293 12.53L10.5293 17.53C10.4601 17.6001 10.3775 17.6557 10.2865 17.6934C10.1955 17.7312 10.0979 17.7504 9.99934 17.75Z" fill="#003366"/>
            </svg>
          </div>
        </div>
        
        <div *ngIf="showData && dataValue" class="metric-card-data">
          <div class="metric-card-data-icon">
            <svg *ngIf="trendDirection === 'up'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.45996 6.30005C8.26105 6.30005 8.07028 6.37907 7.92963 6.51972C7.78898 6.66037 7.70996 6.85114 7.70996 7.05005C7.70996 7.24896 7.78898 7.43973 7.92963 7.58038C8.07028 7.72103 8.26105 7.80005 8.45996 7.80005H15.14L6.51996 16.42C6.44627 16.4887 6.38717 16.5715 6.34618 16.6635C6.30519 16.7555 6.28314 16.8548 6.28137 16.9555C6.27959 17.0562 6.29811 17.1563 6.33584 17.2496C6.37356 17.343 6.4297 17.4279 6.50092 17.4991C6.57214 17.5703 6.65697 17.6265 6.75036 17.6642C6.84375 17.7019 6.94378 17.7204 7.04448 17.7186C7.14518 17.7169 7.2445 17.6948 7.3365 17.6538C7.4285 17.6128 7.5113 17.5537 7.57996 17.48L16.2 8.86005V15.54C16.2 15.739 16.279 15.9297 16.4196 16.0704C16.5603 16.211 16.751 16.29 16.95 16.29C17.1489 16.29 17.3396 16.211 17.4803 16.0704C17.6209 15.9297 17.7 15.739 17.7 15.54V7.05005C17.6994 6.95036 17.679 6.85177 17.64 6.76005C17.5855 6.63219 17.4971 6.5217 17.3842 6.4406C17.2714 6.3595 17.1385 6.31089 17 6.30005H8.45996Z" fill="#27A436"/>
            </svg>
            <svg *ngIf="trendDirection === 'down'" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15.5408 17.7C15.7397 17.7 15.9305 17.6209 16.0711 17.4803C16.2118 17.3396 16.2908 17.1489 16.2908 16.95C16.2908 16.751 16.2118 16.5603 16.0711 16.4196C15.9305 16.279 15.7397 16.2 15.5408 16.2H8.86078L17.4808 7.57996C17.5545 7.5113 17.6136 7.4285 17.6546 7.3365C17.6956 7.2445 17.7176 7.14518 17.7194 7.04448C17.7211 6.94378 17.7026 6.84375 17.6649 6.75036C17.6272 6.65697 17.571 6.57214 17.4998 6.50092C17.4286 6.4297 17.3438 6.37356 17.2504 6.33584C17.157 6.29811 17.057 6.27959 16.9563 6.28137C16.8556 6.28314 16.7562 6.30519 16.6642 6.34618C16.5722 6.38717 16.4894 6.44627 16.4208 6.51996L7.80078 15.14V8.45996C7.80078 8.26105 7.72176 8.07028 7.58111 7.92963C7.44046 7.78898 7.24969 7.70996 7.05078 7.70996C6.85187 7.70996 6.6611 7.78898 6.52045 7.92963C6.3798 8.07028 6.30078 8.26105 6.30078 8.45996V17C6.30131 17.0997 6.32171 17.1982 6.36078 17.29C6.41888 17.4252 6.51502 17.5407 6.63751 17.6224C6.76 17.704 6.90357 17.7484 7.05078 17.75L15.5408 17.7Z" fill="#FF4444"/>
            </svg>
          </div>
          <div class="metric-card-data-text heading-m" 
               [ngClass]="{
                 'accent-green-text': trendDirection === 'up',
                 'accent-red-text': trendDirection === 'down'
               }">
            {{ dataValue }}
          </div>
        </div>
        
        <div *ngIf="showCount && countValue" class="metric-card-count">
          <div class="metric-card-count-badge">
            <span class="metric-card-count-text heading-m accent-orange-text">{{ countValue }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metric-card {
      display: flex;
      width: 100%;
      height: 135px;
      align-items: center;
      gap: 8px;
    }
    
    .metric-card-content {
      display: flex;
      padding: 0 8px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 24px;
      flex: 1 0 0;
      align-self: stretch;
    }
    
    .metric-card-header {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;
    }
    
    .metric-card-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      flex: 1 0 0;
    }
    
    .metric-card-heading {
      align-self: stretch;
      margin: 0;
    }
    
    .metric-card-subheading {
      align-self: stretch;
      margin: 0;
    }
    
    .metric-card-icon {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      border-radius: 50px;
      cursor: pointer;
    }
    
    .metric-card-data {
      display: flex;
      align-items: center;
      align-self: stretch;
      gap: 8px;
    }
    
    .metric-card-data-icon {
      display: flex;
      padding: 8px;
      align-items: center;
      gap: 10px;
      border-radius: 50px;
    }
    
    .metric-card-data-text {
      margin: 0;
      font-weight: 700;
    }
    
    .metric-card-count {
      display: flex;
      align-items: center;
      gap: 24px;
      align-self: stretch;
    }
    
    .metric-card-count-badge {
      display: flex;
      width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 30px;
      background: #FFE6C9;
    }
    
    .metric-card-count-text {
      margin: 0;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .metric-card {
        height: auto;
        min-height: 135px;
      }
    }
  `]
})
export class MetricCardComponent {
  @Input() heading: string = '';
  @Input() subheading: string = '';
  @Input() showData: boolean = false;
  @Input() dataValue?: string;
  @Input() trendDirection?: 'up' | 'down';
  @Input() showCount: boolean = false;
  @Input() countValue?: string | number;
}
