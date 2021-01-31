<template>
  <div class="profile">
    <span>
      Current User: {{ user.username }}
    </span>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-console */
import { Component, Vue } from 'vue-property-decorator';

interface User {
  username: string | null;
}

const checkAuth = () => fetch('/login', {
  method: 'POST',
}).then((res) => res.status === 200);

const fetchUser = () => fetch('/user').then((res) => res.status === 200 && res.json());

@Component({})
export default class Home extends Vue {
  user: User = { username: null };

  async mounted() {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
      const user = await fetchUser();
      this.user = user;
    }
  }
}
</script>
