export class Node implements d3.SimulationNodeDatum {
  // optional - defining optional implementation properties - required for relevant typing assistance
  index?: number; // Nodo raiz
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  id: string;
  linkCount = 0;

  constructor(id, x?, y?) {
    this.id = id;
    this.x = x;
    this.y = y;
  }


 /* normal = () => {
    return Math.sqrt(this.linkCount / APP_CONFIG.N);
  }*/

  /*get r() {
    return 50 * this.normal() + 10;
  }*/

 /* get fontSize() {
    return (30 * this.normal() + 10) + 'px';
  }*/

  /*get color() {
    return APP_CONFIG.SPECTRUM;
  }*/
}
