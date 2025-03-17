<script setup lang="ts">
import { ref } from "vue";
import data from "../../data/data.json";

const heading = ref(data.main.headings.portfolio);
const showAlienTitle = ref(false);

// NOTE:
// Still a work in progress.
</script>

<template>
  <section
    id="portfolio"
    class="min-h-screen flex flex-col items-center justify-center bg-black text-green-500"
  >
    <h1 class="text-4xl font-bold mb-6">{{ heading }}</h1>

    <button
      @click="showAlienTitle = !showAlienTitle"
      class="border border-green-500 text-green-500 px-6 py-2 text-lg uppercase hover:bg-green-500 hover:text-black transition"
    >
      {{ showAlienTitle ? "Hide Alien Title" : "Show Alien Title Sequence" }}
    </button>

    <div v-if="showAlienTitle" class="mt-10">
      <!-- Title container -->
      <div class="title relative">
        <!-- Letters in a 5-column grid with some horizontal gap -->
        <h1
          aria-label="Alien"
          class="grid grid-cols-5 gap-x-4 justify-items-center"
        >
          <!-- A -->
          <div class="letter" aria-hidden="true">
            A<span></span><span></span><span></span>
          </div>
          <!-- L -->
          <div class="letter" aria-hidden="true">
            L<span></span><span></span>
          </div>
          <!-- I -->
          <div class="letter" aria-hidden="true">I</div>
          <!-- E -->
          <div class="letter" aria-hidden="true">
            E<span></span><span></span><span></span><span></span>
          </div>
          <!-- N -->
          <div class="letter" aria-hidden="true">
            N<span></span><span></span><span></span>
          </div>
        </h1>
        <p class="opacity-0 animate-show-credit mt-4">a Ridley Scott film</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* -------------------------------------
   1) Font-Face & CSS Variables
------------------------------------- */
@font-face {
  font-family: "HomepageBaukasten";
  src: url("https://raw.githubusercontent.com/robole/title-sequences/main/alien/homepagebaukasten-bold.ttf");
}

:global(:root) {
  --text-color-initial: #08146d;
  --text-color-final: white;
  --animation-delay-title-reveal: 3.5s;
  --animation-delay-segment: 2s;
  --animation-duration-segment: 1.75s;
}

/* -------------------------------------
   2) Title Container
------------------------------------- */
.title {
  /* If aspect-ratio is causing squish, remove or tweak it */
  /* aspect-ratio: 1920 / 1080; */

  width: 100%;
  max-width: 1200px; /* a bit wider to prevent squish */
  background-color: black;

  display: grid;
  grid-template-rows: auto 1fr;

  background-image: url("img/bg.webp"); /* confirm path! */
  background-size: 200%;
  background-position: 0% 50%;

  animation: bg-scroll 210s linear forwards, fadeout 1s ease-out 120s forwards;
}

/* Keyframes for background scrolling */
@keyframes bg-scroll {
  to {
    background-position: 200% 50%;
  }
}
@keyframes fadeout {
  to {
    opacity: 0;
  }
}

/* -------------------------------------
   3) Title Letters
------------------------------------- */
h1[aria-label="Alien"] {
  font-family: "HomepageBaukasten";
  font-size: clamp(2rem, 6vw + 0.5rem, 6rem);
  color: white;
  margin: 0;
  padding: 0;
}

/* Each letter is position:relative so the <span> can be absolute */
.letter {
  position: relative;
  width: min-content;
  color: transparent; /* rely on the background color reveal or fill for the 'I' */
}

/* Each letter’s <span> is an animated segment */
.letter span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  animation: reveal-bg-color var(--animation-duration-segment) linear forwards;
}

@keyframes reveal-bg-color {
  0% {
    background-color: transparent;
  }
  33%,
  100% {
    background-color: var(--text-color-initial);
  }
  100% {
    background-color: var(--text-color-final);
  }
}

/* -------------------------------------
   4) Credit text fade-in
------------------------------------- */
.animate-show-credit {
  animation: show-credit 4s ease-in-out 5s forwards;
}
@keyframes show-credit {
  10%,
  100% {
    opacity: 1;
  }
}

/* -------------------------------------
   5) Clip-Paths & Delays
   (From your original code, *full* sets)
------------------------------------- */

/* ============= Letter A ============= */
.letter:nth-of-type(1) span:nth-of-type(1) {
  clip-path: polygon(9.32% 71%, 17.78% 55%, 80% 55%, 90% 71%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 10) +
      (var(--animation-delay-segment) * 10) + 0.5s
  );
}
.letter:nth-of-type(1) span:nth-of-type(2) {
  clip-path: polygon(38% 18.6%, 63% 18.6%, 99.08% 85%, 76% 85%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 5) +
      (var(--animation-delay-segment) * 5)
  );
}
.letter:nth-of-type(1) span:nth-of-type(3) {
  clip-path: polygon(37.86% 18.6%, 62% 18.6%, 23.54% 85%, 0% 85%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) + var(--animation-duration-segment) +
      var(--animation-delay-segment)
  );
}

/* ============= Letter L ============= */
.letter:nth-of-type(2) span:nth-of-type(1) {
  clip-path: polygon(8.24% 18.07%, 40% 18.1%, 40% 84%, 7.82% 84%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 3) +
      (var(--animation-delay-segment) * 3)
  );
}
.letter:nth-of-type(2) span:nth-of-type(2) {
  clip-path: polygon(39% 69%, 100% 69%, 100% 84%, 39% 84%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 8) +
      (var(--animation-delay-segment) * 8)
  );
}

/* ============= Letter I ============= */
/* reveal the color for the entire letter (rather than segments) */
.letter:nth-of-type(3) {
  animation: reveal-color var(--animation-duration-segment) linear forwards;
  animation-delay: var(--animation-delay-title-reveal);
}
@keyframes reveal-color {
  0% {
    color: transparent;
  }
  33%,
  100% {
    color: var(--text-color-initial);
  }
  100% {
    color: var(--text-color-final);
  }
}

/* ============= Letter E ============= */
/* E is split into 4 spans: vertical bar, top/mid/bottom bars */
.letter:nth-of-type(4) span:nth-of-type(1) {
  /* vertical bar */
  clip-path: polygon(12% 17%, 42% 17%, 42% 84%, 12% 84%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 4) +
      (var(--animation-delay-segment) * 4)
  );
}
.letter:nth-of-type(4) span:nth-of-type(2) {
  /* top horizontal bar */
  clip-path: polygon(41% 17%, 90% 17%, 90% 33%, 41% 33%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 7) +
      (var(--animation-delay-segment) * 7)
  );
}
.letter:nth-of-type(4) span:nth-of-type(3) {
  /* middle bar */
  clip-path: polygon(41% 42%, 75% 42%, 75% 57%, 41% 57%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 10) +
      (var(--animation-delay-segment) * 10)
  );
}
.letter:nth-of-type(4) span:nth-of-type(4) {
  /* bottom bar */
  clip-path: polygon(41% 68%, 90% 68%, 90% 84%, 41% 84%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 8) +
      (var(--animation-delay-segment) * 8)
  );
}

/* ============= Letter N ============= */
/* Typically the N is 3 segments: left bar, right bar, diagonal. */
.letter:nth-of-type(5) span:nth-of-type(1) {
  /* right vertical bar */
  clip-path: polygon(67% 18%, 92% 18%, 92% 84%, 67% 84%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 6) +
      (var(--animation-delay-segment) * 6)
  );
}
.letter:nth-of-type(5) span:nth-of-type(2) {
  /* left vertical bar */
  clip-path: polygon(7% 18%, 31% 18%, 31% 84%, 10% 84%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 9) +
      (var(--animation-delay-segment) * 9)
  );
}
.letter:nth-of-type(5) span:nth-of-type(3) {
  /* diagonal */
  clip-path: polygon(6% 19%, 32% 19%, 93% 84%, 68% 84%);
  animation-delay: calc(
    var(--animation-delay-title-reveal) +
      (var(--animation-duration-segment) * 2) +
      (var(--animation-delay-segment) * 2)
  );
}
</style>
