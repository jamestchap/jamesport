<script setup lang="ts">
import { ref, computed } from "vue";
import data from "../../data/data.json";
import Arrow from "../components/Arrow.vue";

// Define the types
interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  faClass: string;
  subtitle?: string;
  skillList: Skill[];
}

// Reactive state
const skills = ref<SkillCategory[]>(data.skills.categories);
const heading = ref<string>(data.main.headings.skills);
const currentCategory = ref<string>(data.skills.defaultCategory);

// Computed property for filtering skills
const filteredSkills = computed(() => {
  return skills.value.filter((x) => x.category === currentCategory.value);
});

// Method to update the selected category
const setCategory = (event: Event) => {
  const target = event.target as HTMLElement;
  currentCategory.value = target.dataset.category || "";
};
</script>

<template>
  <section id="skills" class="light-section">
    <div class="container-fluid">
      <h1 class="section-header">{{ heading }}</h1>

      <!-- start of filters  -->
      <div class="row filters">
        <ul
            class="list-inline mx-auto"
            data-aos="fade-right"
            data-aos-duration="1000"
        >
          <li
              v-for="item in skills"
              :key="item.category"
              class="list-inline-item filter"
          >
            <a
                class="nav-item"
                :class="{ active: item.category === currentCategory }"
                :data-category="item.category"
                @click="setCategory"
            >{{ item.category }}</a
            >
          </li>
        </ul>
      </div>
      <!-- end of filters  -->

      <!-- start of skill container  -->
      <div
          id="skill-container"
          data-aos="fade-right"
          data-aos-duration="1000"
          v-for="item in filteredSkills"
          :key="item.category"
      >
        <div class="category-heading">
          <h2><i :class="item.faClass"></i> {{ item.category }}</h2>
          <h3 v-if="item.subtitle">{{ item.subtitle }}</h3>
        </div>

        <div class="skill-content">
          <!-- start of skill bars  -->
          <div v-if="item.skillList.length" class="skillbars">
            <div class="skill" v-for="skill in item.skillList" :key="skill.name">
              <h3 class="skill-name" v-html="skill.name"></h3>
              <div class="outer-bar">
                <div :class="'inner-bar level--' + skill.level"></div>
              </div>
            </div>
          </div>
          <!-- end of skill bars  -->
        </div>
      </div>
      <!-- end of skill container  -->
    </div>
    <!-- end of main container  -->
    <Arrow />
  </section>
</template>

<style lang="scss"></style>