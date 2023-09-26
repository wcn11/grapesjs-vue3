// reusable-component.js
import { nextTick, createApp } from 'vue';

export function createAndMountComponent(component, div) {
    nextTick(() => {
        const app = createApp(component);
        app.mount(div);
    });
}
