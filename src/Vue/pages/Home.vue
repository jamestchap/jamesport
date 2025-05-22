<script setup lang="ts">
// This component will eventually hold the main page sections.
// For now, it's a placeholder.
// We'll later move sections from App.vue here.
import Header from "../Vue/pages/Header.vue";
import MovieDiscovery from "@/Vue/components/MovieDiscovery.vue"; // Added MovieDiscovery import
import About from "../Vue/pages/About.vue";
import Skills from "../Vue/pages/Skills.vue";
import Portfolio from "../Vue/pages/Portfolio.vue";
import Showcase from "../Vue/pages/Showcase.vue";
import Contact from "../Vue/pages/Contact.vue";
import Footer from "../Vue/pages/Footer.vue";

</script>
<template>
  <div>
    <Header />
    <MovieDiscovery /> <!-- Added MovieDiscovery component -->
    <About />
    <Skills />
    <Portfolio />
    <Showcase />
    <Contact />
    <Footer />
  </div>
</template>
<style scoped>
/* Add any styles if needed */
</style>
