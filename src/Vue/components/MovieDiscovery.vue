<template>
  <div class="p-6 m-4 border rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Discover Movies by Year</h2>
    <div class="flex items-center mb-6"> {/* Increased bottom margin for a bit more spacing */}
      <input type="number" v-model="year" placeholder="Enter a 4-digit year" class="p-2 border border-gray-300 rounded mr-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-400" :disabled="isLoading" />
      <button @click="fetchMovies" 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed" 
              :disabled="isLoading">Search</button>
    </div>
    <div v-if="isLoading" class="text-center p-4">
      <p class="text-lg text-gray-700">Loading movies...</p>
      {/* You could add a Tailwind spinner here, e.g., a div with animate-spin class */}
    </div>
    <div v-if="message && !isLoading" class="px-4 py-3 rounded relative mb-4"
         :class="{
           'bg-red-100 border border-red-400 text-red-700': message.startsWith('Error') || message.startsWith('API Key is required') || message.startsWith('Please enter a year.'),
           'bg-blue-100 border border-blue-400 text-blue-700': message.startsWith('No movies found') // Reverted to blue for info
         }">
      <p>{{ message }}</p>
    </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-0">
      <li v-for="movie in movies" :key="movie.id" class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path" :alt="'Poster of ' + movie.title" class="w-full h-auto object-cover">
        <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span class="text-gray-500">No Poster Available</span>
        </div>
        <div class="p-4 flex flex-col flex-grow">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ movie.title }}</h3>
          <p class="text-sm text-gray-600 mb-1">Released: {{ movie.release_date ? movie.release_date.substring(0, 4) : 'N/A' }}</p>
          <p v-if="movie.vote_average" class="text-sm text-gray-600 mb-2">Rating: {{ movie.vote_average }} / 10</p>
          <p class="text-xs text-gray-700 flex-grow">{{ movie.overview ? (movie.overview.substring(0, 150) + (movie.overview.length > 150 ? '...' : '')) : 'No overview available.' }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MovieDiscovery',
  data() {
    return {
      year: null,
      movies: [],
      message: '', // For error messages or no results
      isLoading: false
    };
  },
  methods: {
    async fetchMovies() {
      this.movies = [];
      this.message = '';
      this.isLoading = false; // Ensure isLoading is reset if a previous attempt failed early

      if (!this.year) {
        this.message = 'Please enter a year.';
        return;
      }

      // Validate if the year is a 4-digit number
      const yearPattern = /^\d{4}$/;
      if (!yearPattern.test(this.year.toString())) { // Convert to string for regex test
        this.message = 'Please enter a valid 4-digit year.';
        // this.movies is already cleared at the beginning of the function
        return;
      }

      const apiKey = window.prompt('Please enter your TMDB API Key:');
      if (!apiKey) {
        this.message = 'API Key is required to search for movies.';
        return;
      }
      
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${this.year}&sort_by=popularity.desc`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: response.statusText })); // Try to parse error, fallback to statusText
          throw new Error(errorData.message || response.statusText);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          this.movies = data.results;
          this.message = ''; // Clear message on success
        } else {
          this.movies = [];
          this.message = 'No movies found for this year.';
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        this.movies = [];
        this.message = `Error fetching movies: ${error.message}. Please try again.`;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
/* All styles removed as per Tailwind CSS migration */
</style>
