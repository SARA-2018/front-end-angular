import { Interaction } from './interaction.model';

export class Video extends Interaction  {
    private url: string;

    constructor(url?: string) {
        super();
        this.url = url;
    }
    setUrl(url: string): Video {
        this.url = url;
        return this;
    }

    getUrl(): string {
        return this.url;
    }

    getText(): string {
        return 'Vídeo';
    }

    isVideo(): boolean {
      return false;
    }
}
