<template>
  <div class="azure">
      <div v-if="loggedInUser.userId">
        <p>Logged In Status: ✅</p>
        <p>User's Name: {{ loggedInUser.userName }}</p>
        <p>
          <a href="/.auth/logout">Click here to logout</a>
        </p>
      </div>
      <div v-else>
        <p>Logged In Status: ❌</p>
        <p>
          <a href="/.auth/login/github">Click here to login</a>
        </p>
      </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable class-methods-use-this */
/* eslint-disable no-debugger */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';

@Component
export default class Azure extends Vue {
  @State('loggedInUser') loggedInUser: LoggedInUser;

  @Action('fetchLoggedInUser') fetchLoggedInUser: () => void;

  async created() {
    await this.fetchLoggedInUser();
  }
}
</script>
<style lang="scss" scoped>
.avatar {
  width: 100px;
  height: 100px;
}
</style>
