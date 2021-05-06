<template>
  <div class="axios-spec">
    <h1>This is an axios.spec page</h1>

    <p>
      <label for="reqMethod">请求方法</label>
      <select v-model="method">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
    </p>

    <p>
      <label for="reqUrl">请求URL</label>
      <input id="reqUrl" v-model="url" />
    </p>

    <p v-if="method === 'POST'">
      <label for="payload">Payload</label>
      <textarea id="payload" v-model="payload" />
    </p>
    <button @click="sendRequest">Send Request</button>

    <div class="output-log">
      <prism-editor
        v-show="output"
        class="my-editor"
        readonly
        v-model="output"
        :highlight="highlighter"
        line-numbers>
      </prism-editor>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles
import http from '@/utils/http';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

@Component({
  components: { PrismEditor },
})
export default class AxiosSpec extends Vue {
  method: Method = 'GET';

  url = '';

  payload = '{"answer":42}';

  output = '';

  highlighter = (code: string) => highlight(code, languages.js); // returns html

  async sendRequest() {
    const { url, method } = this;
    try {
      const exec = method === 'GET' ? () => http.get(url) : () => http.post(url, JSON.parse(this.payload));
      const result = await exec();
      this.output = JSON.stringify(result);
    } catch (e) {
      console.log(e);
      this.output = JSON.stringify(e, null, 2);
    }
  }
}
</script>
<style lang="scss" scoped>
/* required class */
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
