<template>
  <div>
    <div id="gjs"></div>
  </div>
</template>
<script>

import grapes from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import Sample from './grapes-components/Init'

export default {
  name: 'Grapes',
  props: {
    msg: String
  },

  mounted () {

    grapes.plugins.add('components-vue-sample', (editor, options) => {
      var blockManager = editor.BlockManager
      var comps = editor.DomComponents
      var config = editor.getConfig();
      config.forceClass = 0;

      blockManager.add('sample', {
        label: 'Sample',
        content: '<sample />'
      })

      comps.addType("sample", Sample(editor))
    })

    grapes.init({
      container: '#gjs',
      // storageManager: { type: 'none' },
      plugins: ['components-vue-sample', 'components-button'],
      canvas: {
      },
    })
  }
}
</script>


<style></style>