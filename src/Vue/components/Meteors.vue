<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface MeteorConfig {
  id: number;
  delay: number; // seconds
  duration: number; // seconds
  top: string; // percentage string, e.g., '50%'
  left: string; // percentage string, e.g., '30%'
}

interface Props {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  meteorColor?: string;
  meteorWidth?: string;
  meteorTailLength?: string;
}

const props = withDefaults(defineProps<Props>(), {
  number: 20,
  minDelay: 0.2,
  maxDelay: 1.2,
  minDuration: 2,
  maxDuration: 10,
  angle: 215, // Degrees
  meteorColor: 'white',
  meteorWidth: '2px',
  meteorTailLength: '150px',
});

const meteors = ref<MeteorConfig[]>([]);

const generateMeteors = () => {
  meteors.value = []; // Clear existing meteors
  for (let i = 0; i < props.number; i++) {
    const delay = Math.random() * (props.maxDelay - props.minDelay) + props.minDelay;
    const duration = Math.random() * (props.maxDuration - props.minDuration) + props.minDuration;
    
    // Meteors start at a random point within the container.
    // The animation will make them appear to fly in from a direction.
    const topPosition = `${Math.random() * 100}%`;
    const leftPosition = `${Math.random() * 100}%`;

    meteors.value.push({
      id: i,
      delay,
      duration,
      top: topPosition,
      left: leftPosition,
    });
  }
};

onMounted(() => {
  generateMeteors();
});
</script>

<template>
  <div class="meteors-container">
    <div
      v-for="meteor in meteors"
      :key="meteor.id"
      class="meteor"
      :style="{
        top: meteor.top,
        left: meteor.left,
        animationDelay: meteor.delay + 's',
        animationDuration: meteor.duration + 's',
        '--meteor-color': props.meteorColor,
        '--meteor-width': props.meteorWidth,
        '--meteor-tail-length': props.meteorTailLength,
      }"
    >
      <!-- The meteor's visual appearance (head/trail) will be handled by CSS -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.meteors-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Allows clicks to pass through */
  overflow: hidden; /* Ensures meteors don't cause scrollbars if they briefly exceed bounds */
}

.meteor {
  position: absolute;
  width: var(--meteor-width);
  height: var(--meteor-width);
  border-radius: 50%;
  background-color: var(--meteor-color);
  opacity: 0; 
  animation-name: animateMeteor;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  // For an angle of 215deg, the meteor travels towards bottom-left.
  // The trail should point towards top-right.
  // If trail is ::after and extends to the right, meteor needs to be rotated by 215deg.
  transform: rotate(calc(var(--angle) * 1deg));
}

.meteor::after {
  content: '';
  position: absolute;
  top: calc(50% - (0.5px)); // Assuming 1px trail height
  left: calc(var(--meteor-width) / 2); // Start trail from mid-right of meteor head
  width: var(--meteor-tail-length);
  height: 1px; 
  background: linear-gradient(to right, var(--meteor-color), transparent);
}

@keyframes animateMeteor {
  0% {
    opacity: 0;
    // Initial position is (top,left). Animation moves it FROM there.
    // We need to define the path of travel using transform.
    // For angle 215deg, it travels X units left, Y units down.
    // Let's simulate this with a fixed large translation.
    // This keyframe makes ALL meteors travel in the same direction.
    // The (top,left) from JS randomizes their starting canvas position.
    // The travel vector here should roughly match the visual angle of the meteor.
    // If meteor is rotated 215deg, its "front" points bottom-left. We translate it that way.
    // This is tricky. Let's make it simple: translate on X and Y.
    // The Magic UI one likely uses JS for precise angled movement.
    // For pure CSS with a passed angle, it's harder.
    // Let's make the animation simpler and assume the angle prop is mostly for visuals.
    // All meteors fly from top-right area to bottom-left area.
    transform: translate(0px, 0px); // Start at its (top,left)
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    // This defines the travel distance and general direction for ALL meteors.
    // For a top-right to bottom-left effect, this is approx. -X, +Y
    transform: translate(-800px, 800px); // Adjust distance as needed
  }
}
</style>
