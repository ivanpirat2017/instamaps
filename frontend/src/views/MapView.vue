<template>
  <main class="container">
    <section class="map-container">
      <div id="map" ref="mapContainer"></div>
      <div class="map-overlay" v-if="selectedPost">
        <h3>{{ selectedPost.title }}</h3>
        <p>Местоположение: {{ selectedPost.location?.lat }}, {{ selectedPost.location?.lng }}</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { usePostStore } from "../stores/post";
import type { Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const postStore = usePostStore();
const mapContainer = ref<HTMLElement | null>(null);
const selectedPost = ref(postStore.posts[0]);
let map: Map | null = null;

onMounted(() => {
  if (!mapContainer.value) return;

  import("maplibre-gl").then((maplibregl) => {
    map = new maplibregl.Map({
      container: mapContainer.value!,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 0],
      zoom: 2,
    });

    map.addControl(new maplibregl.NavigationControl());

    map.on("load", () => {
      postStore.posts.forEach((post) => {
        if (post.location) {
          new maplibregl.Marker()
            .setLngLat([post.location.lng, post.location.lat])
            .setPopup(
              new maplibregl.Popup().setHTML(`<h3>${post.title}</h3><p>${post.description}</p>`)
            )
            .addTo(map!)
            .getElement()
            .addEventListener("click", () => {
              selectedPost.value = post;
            });
        }
      });
    });

    window.addEventListener("resize", () => map?.resize());
  });
});

onUnmounted(() => {
  if (map) {
    map.remove();
    map = null;
  }
  window.removeEventListener("resize", () => map?.resize());
});
</script>
