/* eslint-disable class-methods-use-this */
<template>
  <div class="monaco-editor-demo">
    <div id="container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor';

const code = `
function x() {
  console.log('Hello world!')
}
`;

@Component({})
export default class MonacoEditorDemo extends Vue {
  code = 'const noop = () => {}'

  // eslint-disable-next-line class-methods-use-this
  mounted() {
    const container = document.getElementById('container') as HTMLElement;
    monaco.editor.create(container, {
      value: code,
      language: 'javascript',
    });
  }
}
</script>
<style lang="scss" scoped>
.monaco-editor-demo {
  width: 100%;
  text-align: left;
  #container {
    border: 1px solid #eee;
    margin: 0 auto;
    width: 600px;
    height: 800px;
  }
}
</style>>
