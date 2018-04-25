export * from './show-node/show-node.component';
export * from './show-link/show-link.component';

import { NodeVisualComponent } from './show-node/show-node.component';
import { LinkVisualComponent } from './show-link/show-link.component';

export const SHARED_VISUALS = [
    NodeVisualComponent,
    LinkVisualComponent
];
