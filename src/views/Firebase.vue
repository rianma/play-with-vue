<template>
  <div class="firebase">
    current signed in user:
    <template v-if="user.uid">
      <p>name: {{ user.displayName }}</p>
      <p>email: {{ user.email }}</p>
      <p>
        <img class="avatar" :src="user.photoURL" :alt="`Avatar photo: ${this.user.displayName}`">
      </p>
    </template>
    <p v-else>N/A</p>

  </div>
</template>
<script lang="ts">
/* eslint-disable class-methods-use-this */
/* eslint-disable no-debugger */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
import { Component, Vue } from 'vue-property-decorator';
import { login } from '@/services/firebase';
import { State } from 'vuex-class';

@Component
export default class Firebase extends Vue {
  @State((state) => state.firebase.user) user: any;

  async mounted() {
    await login();
  }
}
</script>
<style lang="scss" scoped>
.avatar {
  width: 100px;
  height: 100px;
}
</style>
