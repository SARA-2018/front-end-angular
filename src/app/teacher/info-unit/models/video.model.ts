import { Interaction } from './interaction.model';

export class Video extends Interaction  {
    private url: string;
    private kind: string;

    constructor(url?: string) {
        super();
        this.url = url;
    }
    setUrl(url: string): Video {
        this.url = url;
        return this;
    }
    setKind(kind: string) {
        this.kind = kind;
        return this;
    }

    getUrl(): string {
        return this.url;
    }

    getText(): string {
        return 'Vídeo';
    }

    getLink(): string {
      return '/video';
    }
}
