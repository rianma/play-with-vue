<template>
  <div class="tasks-order-page">
    <div class="explanation">
      <pre>
        <code>
mounted () {
  this.count = 2;

  requestAnimationFrame(() => {
    console.log('count=3');
    this.count = 3;
  });

  Promise.resolve(null).then(() => {
    // eslint-disable-next-line no-debugger
    console.log('count=4');
    this.count = 4;
  });

  setTimeout(() => {
    console.log('count=5');
    this.count = 5;
  }, 0);
}</code>
      </pre>
    </div>

    <div class="output" style="font-size: 100px">
      {{ count }}
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  count = 1

  mounted() {
    this.count = 2;

    requestAnimationFrame(() => {
      console.log('count=3');
      this.count = 3;
    });
    Promise.resolve(null).then(() => {
      // eslint-disable-next-line no-debugger
      console.log('count=4');
      this.count = 4;
    });
    setTimeout(() => {
      console.log('count=5');
      this.count = 5;
    }, 0);
  }
}
</script>
<style lang="scss" scoped>
.tasks-order-page {
  .explanation {
    display: flex;
    text-align: left;
    justify-content: center;
    pre, code {
      font-family: Monaco, Consolas, monospace;
    }
  }
}
</style>>
