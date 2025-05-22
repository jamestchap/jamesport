<template>
  <div class="movie-discovery">
    <h2>Discover Movies by Year</h2>
    <div>
      <input type="number" v-model="year" placeholder="Enter year (e.g., 1995)" />
      <button @click="fetchMovies">Search</button>
    </div>
    <div v-if="message">
      <p>{{ message }}</p>
    </div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} ({{ movie.release_date }})
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
      message: '' // For error messages or no results
    };
  },
  methods: {
    async fetchMovies() {
      this.movies = []; // Clear previous results
      this.message = ''; // Clear previous messages

      if (!this.year) {
        this.message = 'Please enter a year.';
        return;
      }

      const apiKey = window.prompt('Please enter your TMDB API Key:');
      if (!apiKey) {
        this.message = 'API Key is required to search for movies.';
        return;
      }

      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${this.year}&sort_by=popularity.desc`;

      try {
        this.message = `Searching for movies from ${this.year}...`;
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
      }
    }
  }
};
</script>

<style scoped>
.movie-discovery {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.movie-discovery div {
  margin-bottom: 10px;
}
input[type="number"] {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 15px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 5px 0;
}
</style>
