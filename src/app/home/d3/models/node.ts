export class Node implements d3.SimulationNodeDatum {

  id: string;
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  links: number;

  readonly xMiddle = 75;

  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  getXMiddle(): number {
    if (this.links <= 1) {
      return this.x + this.xMiddle;
    } else {
      return this.x;
    }
  }
}
