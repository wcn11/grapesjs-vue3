// import AutoInit from './core/AutoInit';

const blockContext = require.context('./blocks', true, /\.js$/);

const blockComponents = {};
blockContext.keys().forEach((blockPath) => {
  const blockName = blockPath.match(/\.\/(.*?)\.js$/)[1];
  const blockModule = blockContext(blockPath);
  blockComponents[blockName] = blockModule.default || blockModule;
});

// function initialize(editor, type) {
//   var comps = editor.DomComponents;
//   var defaultType = comps.getType('sample');
//   var defaultModel = defaultType.model;
//   var defaultView = defaultType.view;
//   let auto = AutoInit(editor, type, defaultType, defaultModel, defaultView)
//   console.log(defaultType)
//   return auto
// }

export {
  // initialize,
  blockComponents
};
