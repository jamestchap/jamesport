<script setup lang="ts">
import { ref } from "vue";
import Arrow from "../components/Arrow.vue";
import Banner from "../components/Banner.vue";
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
  <header id="home" class="bg">
    <nav class="navbar navbar-expand-lg fixed-top dark-bg">
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
  </header>
</template>

<style lang="scss"></style>