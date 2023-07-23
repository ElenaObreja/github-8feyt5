import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges {
  public cropWidth: number = 75;

  @Input() rating: number = 0;
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    this.cropWidth = (this.rating * 75) / 5;
  }

  public onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }
}
