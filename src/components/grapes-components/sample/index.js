import { nextTick, createApp } from 'vue'; 
import CoreModel from '../CoreModel';
import CoreView from '../CoreView';
import Sample from './Sample';

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

        nextTick(() => {
          const sampleApp = createApp(Sample);

          sampleApp.mount(div);

          this.updateAttributes();
          this.updateClasses();

          var actCls = this.el.getAttribute('class') || '';
          this.el.setAttribute('class', (actCls + ' ' + this.classEmpty).trim());
        });
      },
    }),
  };
};
