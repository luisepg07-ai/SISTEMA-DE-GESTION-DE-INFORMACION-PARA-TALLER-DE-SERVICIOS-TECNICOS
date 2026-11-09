import { Component, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patron',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patron.component.html',
  styleUrls: ['./patron.component.css']
})
export class PatronComponent implements OnDestroy {
  
  grid = [0, 1, 2];
  pattern: [number, number][] = [];
  drawing = false;
  dotSpacing = 68;
  dotRadius = 16;
  offset = 16;
  @Input() selectedOrder: number[] = [];
  pointerPos: { x: number, y: number } | null = null;
  @Output() reset = new EventEmitter<number[]>();
  @Output() patronChange = new EventEmitter<number[]>();

  constructor() {
    window.addEventListener('mousedown', this._windowMouseDown);
    window.addEventListener('mouseup', this._windowMouseUp);
  }

  ngOnDestroy() {
    window.removeEventListener('mousedown', this._windowMouseDown);
    window.removeEventListener('mouseup', this._windowMouseUp);
  }

  startPattern() {
    this.pattern = [];
    this.selectedOrder = [];
    this.drawing = true;
    this.pointerPos = null;
    window.addEventListener('mouseup', this._windowMouseUp);
  }

  endPattern() {
    this.drawing = false;
    this.pointerPos = null;
    window.removeEventListener('mouseup', this._windowMouseUp);
    this.patronChange.emit(this.selectedOrder);
  }

  private _windowMouseDown = (event: MouseEvent) => {
    if (event.button === 0) {
      this.drawing = true;
    }
  };

  private _windowMouseUp = () => {
    this.endPattern();
  }

  addDot(i: number, j: number) {
    if (this.drawing && !this.pattern.some(([x, y]) => x === i && y === j)) {
      this.pattern.push([i, j]);
      const pointNumber = i * 3 + j + 1;
      this.selectedOrder.push(pointNumber);
    }
  }

  isActive(i: number, j: number): boolean {
    return this.pattern.some(([x, y]) => x === i && y === j);
  }

  getDotPosition(idx: number): number {
    return idx * this.dotSpacing + this.offset;
  }

  getLineSegments(): [number[], number[]][] {
    const segments: [number[], number[]][] = [];
    for (let k = 1; k < this.pattern.length; k++) {
      const [i1, j1] = this.pattern[k - 1];
      const [i2, j2] = this.pattern[k];
      segments.push([
        [this.getDotPosition(j1) + this.dotRadius, this.getDotPosition(i1) + this.dotRadius],
        [this.getDotPosition(j2) + this.dotRadius, this.getDotPosition(i2) + this.dotRadius]
      ]);
    }
    return segments;
  }

  getReplicaLineSegments(): [number[], number[]][] {
    const coords = this.selectedOrder.map(n => {
      const idx = n - 1;
      return [Math.floor(idx / 3), idx % 3] as [number, number];
    });
    const segments: [number[], number[]][] = [];
    for (let k = 1; k < coords.length; k++) {
      const [i1, j1] = coords[k - 1];
      const [i2, j2] = coords[k];
      segments.push([
        [this.getDotPosition(j1) + this.dotRadius, this.getDotPosition(i1) + this.dotRadius],
        [this.getDotPosition(j2) + this.dotRadius, this.getDotPosition(i2) + this.dotRadius]
      ]);
    }
    return segments;
  }

  isReplicaActive(i: number, j: number): boolean {
    return this.selectedOrder.some(n => {
      const idx = n - 1;
      return Math.floor(idx / 3) === i && idx % 3 === j;
    });
  }

  onMouseMove(event: MouseEvent) {
    if (this.drawing) {
      const container = document.querySelector('.pattern-container') as HTMLElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        this.pointerPos = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }
    }
  }

  resetPattern() {
    this.pattern = [];
    this.selectedOrder = [];
    this.drawing = false;
    this.pointerPos = null;

    if (Array.isArray(this.selectedOrder)) {
      this.selectedOrder.length = 0;
    }
    this.patronChange.emit([]);
    this.reset.emit();
  }
}
