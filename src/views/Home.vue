<template>
  <div class="home">
    <span style="font-size: 100px">
      {{ count }}
    </span>
  </div>
</template>

<script lang="ts">
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
