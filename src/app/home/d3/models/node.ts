export class Node implements d3.SimulationNodeDatum {

  id: string;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  readonly xMiddle = 75;
  readonly ySouth = 35;

  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  getXMiddle() {
    return this.x + this.xMiddle;
  }

  getY(): number {
    return this.y;
  }

  getX(): number {
    return this.x;
  }

  getYSouth(): number {
    return this.y + this.ySouth;
  }
}
