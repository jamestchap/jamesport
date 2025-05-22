<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import data from '../../data/data.json';
import Arrow from '../components/Arrow.vue';

// Define the structure of a project detail item
interface Inspiration {
  text: string;
  imageUrl?: string;
  movieTitle?: string;
  musicTrack?: string;
}

interface TechnicalDiveItem {
  heading: string;
  content: string;
  codeSnippet?: string;
  image?: string;
}

interface Project {
  id: string;
  title: string;
  introduction: string;
  inspiration: Inspiration;
  technicalDeepDive: TechnicalDiveItem[];
  whatILearned: string;
  technologiesUsed: string[];
  liveDemoLink?: string;
  sourceCodeLink?: string;
}

// Type assertion for projectDetails
const projectDetails = data.projectDetails as Record<string, Project>;

const props = defineProps<{ projectId: string }>();

const projectData = computed(() => {
  return projectDetails[props.projectId] || null;
});

</script>

<template>
  <section class="light-section project-detail-page">
    <div class="container-fluid" v-if="projectData">
      <h1 class="section-header">{{ projectData.title }}</h1>
      
      <p class="introduction">{{ projectData.introduction }}</p>

      <div class="detail-section inspiration">
        <h2>Inspiration</h2>
        <p>{{ projectData.inspiration.text }}</p>
        <p v-if="projectData.inspiration.movieTitle">Movie: {{ projectData.inspiration.movieTitle }}</p>
        <p v-if="projectData.inspiration.musicTrack">Music: {{ projectData.inspiration.musicTrack }}</p>
      </div>

      <div class="detail-section technical-deep-dive">
        <h2>Technical Deep Dive</h2>
        <div v-for="(dive, index) in projectData.technicalDeepDive" :key="index" class="dive-item">
          <h3>{{ dive.heading }}</h3>
          <p>{{ dive.content }}</p>
          <!-- TODO: Add code snippet or image display if needed -->
        </div>
      </div>

      <div class="detail-section what-i-learned">
        <h2>What I Learned</h2>
        <p>{{ projectData.whatILearned }}</p>
      </div>

      <div class="detail-section technologies-used">
        <h2>Technologies Used</h2>
        <ul>
          <li v-for="tech in projectData.technologiesUsed" :key="tech">{{ tech }}</li>
        </ul>
      </div>

      <div class="detail-section links" v-if="projectData.liveDemoLink || projectData.sourceCodeLink">
        <h2>Links</h2>
        <p v-if="projectData.liveDemoLink"><a :href="projectData.liveDemoLink" target="_blank" rel="noopener noreferrer">View Live Demo</a></p>
        <p v-if="projectData.sourceCodeLink"><a :href="projectData.sourceCodeLink" target="_blank" rel="noopener noreferrer">View Source Code</a></p>
      </div>

    </div>
    <div class="container-fluid" v-else>
      <p>Project details not found.</p>
    </div>
    <Arrow />
  </section>
</template>

<style scoped>
.project-detail-page {
  padding: 60px 0;
  background-color: #f8f9fa; /* Consistent light background */
}
.section-header {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.8rem; /* Slightly larger for detail page main title */
  font-weight: bold;
  color: #333;
}
.container-fluid {
  max-width: 900px; 
  margin: 0 auto;
  padding: 0 15px;
}
.introduction {
  font-size: 1.2rem; /* Slightly larger for emphasis */
  margin-bottom: 40px;
  line-height: 1.7;
  color: #555;
}
.detail-section {
  margin-bottom: 40px;
}
.detail-section h2 {
  font-size: 2rem; /* Prominent section titles */
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #007bff; /* Accent color border */
  color: #0056b3; /* Darker blue for headings */
}
.detail-section h3 {
  font-size: 1.6rem; /* Sub-headings for deep dive items */
  margin-top: 25px; /* More space above sub-headings */
  margin-bottom: 10px;
  color: #333;
}
.dive-item {
  margin-bottom: 25px;
}
.dive-item p, 
.detail-section p,
.technologies-used ul li {
  font-size: 1rem;
  line-height: 1.6;
  color: #495057;
}
.technologies-used ul {
  list-style: disc;
  padding-left: 25px; /* More indentation */
  margin-top: 10px;
}
.technologies-used ul li {
  margin-bottom: 5px;
}
.links p {
  margin-bottom: 10px; /* Space between links if both exist */
}
.links a {
  display: inline-block;
  margin-right: 20px;
  font-size: 1.1rem;
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}
.links a:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Fallback message styling */
.container-fluid > p {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 50px;
}
</style>
