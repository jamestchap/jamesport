<script setup lang="ts">
import { ref } from "vue";
import data from "../../data/data.json";

// Define TypeScript interfaces
interface SocialItem {
  name: string;
  url: string;
  faClass: string;
}

// Reactive state
const social = ref<SocialItem[]>(data.contact.social);
</script>

<template>
  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }} James Chapman.</p>
    <div class="social-icons">
      <a v-for="(item, i) in social" :key="i" :href="item.url" :alt="item.name">
        <i :class="'fa-lg ' + item.faClass"></i>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #1d1f21;
  padding: 1rem;
  color: #f0f0f0;
  text-align: center;
}

.social-icons {
  margin-top: 10px;
}

.social-icons a {
  margin: 0 10px;
  color: #f0f0f0;
}

.social-icons a:hover {
  color: #ed2024;
}
</style>
