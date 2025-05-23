<script setup lang="ts">
import { ref } from "vue";
import Arrow from "../components/Arrow.vue";
import data from "../../data/data.json";

interface ShowcaseItem {
  id: number;
  title: string;
  description: string;
  date: string;
  type: string;
  imageUrl?: string;
  link?: string;
  tags?: string[];
  detailedPageId?: string; // Added for router link
}

const showcaseItems = ref<ShowcaseItem[]>(data.showcase.items);
const heading = ref<string>(data.main.headings.showcase);
</script>

<template>
  <section id="showcase" class="light-section">
    <div class="container-fluid">
      <h1 class="section-header">{{ heading }}</h1>

      <div class="showcase-grid">
        <div class="showcase-card" v-for="item in showcaseItems" :key="item.id">
          <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.title" class="showcase-image" />
          <h3 class="card-title">
            <router-link v-if="item.detailedPageId" :to="{ name: 'ProjectDetail', params: { projectId: item.detailedPageId } }">
              {{ item.title }}
            </router-link>
            <template v-else-if="item.link">
              <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
            </template>
            <template v-else>
              {{ item.title }}
            </template>
          </h3>
          <p class="meta-info">
            <span class="card-type" v-if="item.type">{{ item.type }}</span>
            <span class="separator" v-if="item.type && item.date"> | </span>
            <span class="date" v-if="item.date">{{ item.date }}</span>
          </p>
          <p class="description">{{ item.description }}</p>
          <div class="tags" v-if="item.tags && item.tags.length">
            <strong>Tags:</strong> 
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
    <Arrow />
  </section>
</template>

<style scoped>
#showcase.light-section { /* More specific to override if needed */
  padding: 60px 0;
  background-color: #2c2c2c; /* Dark gray background */
}
#showcase h1.section-header { /* Target the header within this section */
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #f0f0f0; /* Light text color for the header */
}
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 15px; /* Add some padding if container-fluid doesn't have enough */
}
.showcase-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.showcase-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}
.showcase-image {
  width: 100%;
  max-height: 200px; /* Limit image height */
  object-fit: cover; /* Cover the area, might crop */
  border-radius: 4px;
  margin-bottom: 15px;
}
.showcase-card h3 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 10px;
  color: #007bff; /* Bootstrap primary color for links/headings */
}
.showcase-card h3 a {
  text-decoration: none;
  color: inherit;
}
.showcase-card h3 a:hover {
  text-decoration: underline;
}
.meta-info {
  font-size: 0.9rem;
  color: #6c757d; /* Bootstrap muted text color */
  margin-bottom: 10px;
  display: flex; /* Aligns type and date nicely if both are present */
  align-items: center; /* Vertically align items if they wrap */
}
.card-type {
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.375rem;
  color: #fff;
  background-color: #6c757d; /* Bootstrap secondary color, good for a badge */
  margin-right: 0.5em; /* Space between type and separator/date */
}
.meta-info .date {
  /* No specific style needed for date unless it needs to stand out more */
}
.meta-info .separator {
  margin: 0 0.25em;
}
.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #495057;
  margin-bottom: 15px;
}
.tags {
  font-size: 0.9rem;
}
.tags strong {
  color: #333;
}
.tag {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 0.8rem;
}
/* Responsive adjustments if necessary */
@media (max-width: 768px) {
  .showcase-grid {
    grid-template-columns: 1fr; /* Stack cards on smaller screens */
  }
  .section-header {
    font-size: 2rem;
  }
}
</style>
