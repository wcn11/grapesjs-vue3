// grapes-sample-plugin.js
import { createAndMountComponent } from './Bootstraper'; // Import the reusable function
import CoreModel from './CoreModel';
import CoreView from './CoreView';

// Use Webpack's require.context to import all files inside the 'block' folder
const blockContext = require.context('./blocks', true, /\.js$/);

const blockComponents = {};
blockContext.keys().forEach((blockPath) => {
  const blockName = blockPath.match(/\.\/(.*?)\.js$/)[1];
  const blockModule = blockContext(blockPath);
  blockComponents[blockName] = blockModule.default || blockModule;
});

export default (editor) => {
  var comps = editor.DomComponents;
  var defaultType = comps.getType('default');
  var defaultModel = defaultType.model;
  var defaultView = defaultType.view;
  const type = 'sample';

  return {
    model: defaultModel.extend(
      {
        ...CoreModel,
        defaults: {
          ...defaultModel.prototype.defaults,
          droppable: false,
          stylable: ['height', 'width'],
          resizable: true,
        },
      },
      {
        isComponent: function (el) {
          if (el.tagName === type.toUpperCase())
            return {
              type,
              content: el.innerHTML,
              components: [],
            };
        },
      }
    ),
    view: defaultType.view.extend({
      ...CoreView(editor),

      initialize(o) {
        defaultView.prototype.initialize.apply(this, arguments);
        this.classEmpty = this.ppfx + 'sample';
      },
      events: {
        click: 'initResize',
      },

      tagName: 'div',

      attributes: {
        style: 'pointer-events: all; padding: 6px;',
      },

      getChildrenSelector() {
        return 'div';
      },

      renderChildren() {
        var div = document.createElement('div');
        while (this.el.lastChild) this.el.removeChild(this.el.lastChild);
        this.el.appendChild(div);

        // Use the reusable function to create and mount the component
        createAndMountComponent(blockComponents['Sample'], div);

        this.updateAttributes();
        this.updateClasses();

        var actCls = this.el.getAttribute('class') || '';
        this.el.setAttribute('class', (actCls + ' ' + this.classEmpty).trim());
      },
    }),
  };
};
