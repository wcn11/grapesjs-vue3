<template>
  <div>
    <div id="gjs"></div>
  </div>
</template>
<script>
import grapes from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { initialize, blockComponents } from './grapes-components/Init';
import { autoInit } from './grapes-components/core/AutoInit';

export default {
  name: "Grapes",
  props: {
    msg: String,
  },

  mounted() {
    let pluginsComponent = []
    for (const componentName in blockComponents) {
      if (blockComponents.hasOwnProperty(componentName)) {
        const component = blockComponents[componentName];
        // Do something with the component object, e.g., add it to GrapesJS
        console.log(`Component Name: ${componentName}`);
        console.log("Component Object:", component);


        let pluginsName = `components-${componentName}`
        pluginsComponent.push(pluginsName)

        grapes.plugins.add(pluginsName, (editor, options) => {
          var blockManager = editor.BlockManager;
          var comps = editor.DomComponents;
          var config = editor.getConfig();
          config.forceClass = 0;

          blockManager.add(componentName.toLowerCase(), {
            label: componentName,
            content: `<${componentName.toLowerCase()} />`,
          });

          comps.addType(componentName.toLowerCase(), autoInit(editor,componentName));
        });
      }
    }



    grapes.init({
      container: "#gjs",
      // storageManager: { type: 'none' },
      plugins: pluginsComponent,
      canvas: {},
    });
  },
};
</script>

<style></style>
