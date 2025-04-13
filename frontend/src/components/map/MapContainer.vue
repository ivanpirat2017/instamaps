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
