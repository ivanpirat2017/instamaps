<template>
  <section class="map-container">
    <div id="map" ref="mapContainer"></div>
    <MapOverlay :post="selectedPost" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import MapOverlay from "./MapOverlay.vue";
import type { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { usePostStore } from "../../stores/post";
import { type Post } from "../../stores/post";
import { showToast } from "../../utils/toast";

const postStore = usePostStore();
const mapContainer = ref<HTMLElement | null>(null);
let map: Map | null = null;

defineProps<{
  selectedPost: Post | null;
}>();
const emit = defineEmits<{
  (e: "update-selected", post: Post): void;
}>();

onMounted(() => {
  if (!mapContainer.value) return;

  import("maplibre-gl").then((maplibregl) => {
    try {
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
                emit("update-selected", post);
              });
          }
        });
      });

      window.addEventListener("resize", () => map?.resize());
    } catch (error) {
      showToast("Failed to load map", "error");
    }
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

<style scoped>
.map-container {
  box-shadow: var(--shadow);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#map {
  flex-grow: 1;
  border-radius: 10px;
  min-height: 300px;
  width: 100%;
}

.map-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  max-width: 280px;
}

@media (max-width: 768px) {
  .map-container {
    padding: 8px;
  }

  #map {
    min-height: 200px;
  }

  .map-overlay {
    width: calc(100% - 32px);
    left: 16px;
  }
}
</style>
