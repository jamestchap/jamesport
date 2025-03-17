<script setup lang="ts">
import { ref } from "vue";
import data from "../../data/data.json";
import Arrow from "../components/Arrow.vue";

// Define TypeScript interfaces
interface Fact {
  name: string;
  value: string;
}

interface AboutData {
  tagline: string;
  bio: string;
  facts: Fact[];
}

// Reactive state
const about = ref<AboutData>(data.about);
const name = ref<string>(data.main.name.first);
const facts = ref<Fact[]>(data.about.facts);
const heading = ref<string>(data.main.headings.about);
</script>

<template>
  <section id="about" class="dark-section">
    <div class="row align-items-center about-container">
      <!-- Profile Image Column (Left) -->
      <div class="col-lg-4 col-md-5 text-center">
        <img
          class="profile-pic"
          src="../../assets/images/profile-pic.png"
          alt="profile picture"
        />
      </div>

      <!-- About Text Column (Right) -->
      <div class="col-lg-8 col-md-7 about-text">
        <p id="about-content">
          <span id="greeting">I'm {{ name }}! </span>
          <span id="bio" v-html="about.bio"></span>
        </p>

        <ul class="list-group list-group-flush">
          <li v-for="item in facts" :key="item.name" class="list-group-item">
            <h3 class="d-inline">{{ item.name }}:</h3>
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>

    <Arrow />
  </section>
</template>
