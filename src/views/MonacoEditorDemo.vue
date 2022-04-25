<template>
  <div class="monaco-editor-demo">
    <div id="container"></div>

    <div class="blob-url-demo">
      Load Web Worker Dynamically
      <p>
        <input class="worker-url-input" v-model="workerUrl" list="url-presets" />
        <datalist id="url-presets">
          <option value="https://play-with-vue.vercel.app/editor.worker.js" />
          <option value="//play-with-vue.vercel.app/editor.worker.js" />
        </datalist>
      </p>
      <p>
        <button @click="loadWorker">Run</button>
      </p>
      <p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Using Web Workers - MDN</a></p>
      <p><a href="https://benohead.com/blog/2017/12/06/cross-domain-cross-browser-web-workers/">Cross domain and cross browser web workers</a></p>
    </div>
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

  workerUrl = 'https://play-with-vue.vercel.app/editor.worker.js'

  // eslint-disable-next-line class-methods-use-this
  mounted() {
    const container = document.getElementById('container') as HTMLElement;
    monaco.editor.create(container, {
      value: code,
      language: 'javascript',
    });
  }

  // see: https://benohead.com/blog/2017/12/06/cross-domain-cross-browser-web-workers/
  // eslint-disable-next-line class-methods-use-this
  loadWorker() {
    const { workerUrl } = this;
    const codeSnippet = `
importScripts('${workerUrl}');
console.log('importScripts() run successfully')
`;
    const blob = new Blob([codeSnippet], { type: 'application/javascript' });
    const blobUrl = window.URL.createObjectURL(blob);
    const worker = new Worker(blobUrl);
    worker.onmessage = (event) => {
      console.log(`GOT event from worker: ${workerUrl}, event is:`, event);
    };
    worker.postMessage('Hi worker, this is main thread!');
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
    height: 400px;
  }
  .blob-url-demo {
    border: 1px solid #eee;
    text-align: center;
    margin: 0 auto;
    margin-top: 24px;
    padding: 8px;
    width: 600px;
  }
  .worker-url-input {
    width: 500px;
  }
}
</style>>
