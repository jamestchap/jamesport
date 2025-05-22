<script setup lang="ts">
import { ref } from "vue";
import Arrow from "../components/Arrow.vue";
import Banner from "../components/Banner.vue";
import Meteors from '../components/Meteors.vue'; // Import Meteors
import data from "../../data/data.json";

// Define TypeScript interface
interface Name {
  first: string;
  last: string;
}

interface MainData {
  name: Name;
}

// Reactive state
const main = ref<MainData>(data.main);
</script>

<template>
  <header id="header" class="bg"> <!-- Changed id to header for clarity -->
    <Meteors />
    <div class="header-content-overlay">
      <nav class="navbar navbar-expand-lg fixed-top dark-bg"> <!-- This nav is fixed, might need z-index if it goes under -->
        <a class="navbar-brand" href="#">
          <div>
          <span id="FirstName">{{ main.name.first }} </span>
          <span id="LastName"> {{ main.name.last }}</span>
          <span id="Title"> Portfolio </span>
        </div>
      </a>

  <span class="navbar-toggler-icon">
    <i class="fas fa-bars" style="color:#fff; font-size:28px;"></i>
  </span>

      <div id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <ul id="navbar-nav" class="navbar-nav ml-auto">
          <li class="active-nav">
            <a class="nav-item nav-link" href="#home">Home</a>
          </li>
          <li><a class="nav-item nav-link" href="#about">About</a></li>
          <li><a class="nav-item nav-link" href="#skills">Skills</a></li>
          <li><a class="nav-item nav-link" href="#portfolio">Portfolio</a></li>
          <li><a class="nav-item nav-link" href="#contact">Contact</a></li>
        </ul>
      </div>
      </nav>
      <Banner />
      <Arrow />
    </div>
  </header>
</template>

<style lang="scss">
#header {
  position: relative;
  overflow: hidden;
  min-height: 60vh; // Make space for meteors
  // Existing .bg styles will apply if they exist elsewhere or add them here
}

.header-content-overlay {
  position: relative; 
  z-index: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; 
  min-height: inherit; 
  text-align: center;
  padding: 20px; 
}

// Ensure nav remains on top if it's part of this header and not globally fixed
// The current nav has 'fixed-top' which usually handles z-index well.
// If it were not fixed-top, we might need:
// nav.navbar {
//   position: relative; // or absolute if it's meant to be overlaid freely
//   z-index: 2; // Higher than header-content-overlay if it's inside it, or meteors
// }
</style>