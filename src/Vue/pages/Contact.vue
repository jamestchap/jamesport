<script setup lang="ts">
import { ref } from "vue";
import data from "../../data/data.json";

// Define TypeScript interfaces
interface SocialItem {
  name: string;
  url: string;
  faClass: string;
}

interface ContactInfo {
  text: string;
  city?: string;
  email?: string;
  resumeLink?: string;
  form?: boolean;
  formTitle?: string;
  formEndPoint?: string;
  social: SocialItem[];
}

// Reactive state
const contact = ref<ContactInfo>(data.contact);
const social = ref<SocialItem[]>(data.contact.social);
const heading = ref<string>(data.main.headings.contact);
</script>

<template>
  <section id="contact" class="light-section">
    <div class="container text-center">
      <h1 class="section-header">{{ heading }}</h1>

      <div class="contact-wrapper">
        <!-- Contact Information -->
        <div class="contact-content">
          <h2>Connect with Me</h2>
          <p class="contact-text">{{ contact.text }}</p>

          <ul class="list-group">
            <li v-if="contact.email" class="list-group-item">
              <h3><i class="fa fa-envelope"></i> Email:</h3>
              <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
            </li>
<!--            <li class="list-group-item">-->
<!--              <h3><i class="fas fa-user-plus"></i> Social:</h3>-->
<!--              <div v-for="(item, i) in social" :key="i" class="social-item">-->
<!--                <a :href="item.url" :alt="item.name">-->
<!--                  <i :class="'fa-lg ' + item.faClass"></i>-->
<!--                </a>-->
<!--              </div>-->
<!--            </li>-->
<!--            <li v-if="contact.resumeLink" class="list-group-item">-->
<!--              <a :href="contact.resumeLink" target="_blank">-->
<!--                <button class="btn btn-resume">-->
<!--                  <i class="far fa-file-pdf"></i> Resume-->
<!--                </button>-->
<!--              </a>-->
<!--            </li>-->
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
