<template>
  <section class="map-container">
    <div id="map" ref="mapContainer"></div>
    <MapOverlay v-if="selectedPost" :post="selectedPost" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import MapOverlay from "./MapOverlay.vue";
import type { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { usePostStore } from "../../stores/post";
import { type Post } from "../../stores/post";
import { showToast } from "../../utils/toast";
import { useRouter } from "vue-router";

const postStore = usePostStore();
const mapContainer = ref<HTMLElement | null>(null);
let map: Map | null = null;
const router = useRouter();

const props = defineProps<{
  selectedPost: Post | null;
  staticMode?: boolean;
}>();
const emit = defineEmits<{
  (e: "update-selected", post: Post): void;
}>();

function createMarker(post: Post) {
  if (!post.location || !post.image) return;

  const el = document.createElement("div");
  el.className = "custom-marker";
  el.style.width = "48px";
  el.style.height = "48px";
  el.style.borderRadius = "50%";
  el.style.overflow = "hidden";
  el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  el.style.border = "2px solid #fff";
  el.style.background = "#fff";
  el.style.cursor = "pointer";

  const img = document.createElement("img");
  img.src = post.image;
  img.alt = post.title;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  el.appendChild(img);

  el.addEventListener("click", () => {
    if (!props.staticMode) {
      emit("update-selected", post);
      const currentMarker = document.querySelector(".custom-marker.selected");
      if (currentMarker) currentMarker.classList.remove("selected");
      el.classList.add("selected");
    }
  });

  return new (window as any).maplibregl.Marker({ element: el })
    .setLngLat([post.location.lng, post.location.lat])
    .addTo(map!);
}

function setupMap() {
  if (!mapContainer.value) return;
  import("maplibre-gl").then((maplibregl) => {
    (window as any).maplibregl = maplibregl;
    try {
      map = new maplibregl.Map({
        container: mapContainer.value!,
        style: "https://demotiles.maplibre.org/style.json",
        center:
          props.staticMode && props.selectedPost?.location
            ? [props.selectedPost.location.lng, props.selectedPost.location.lat]
            : [0, 0],
        zoom: props.staticMode ? 10 : 2,
        interactive: !props.staticMode,
      });
      if (!props.staticMode) {
        map.addControl(new maplibregl.NavigationControl());
      }
      map.on("load", () => {
        if (props.staticMode && props.selectedPost) {
          createMarker(props.selectedPost);
          map?.setCenter([props.selectedPost.location!.lng, props.selectedPost.location!.lat]);
          map?.setZoom(10);
        } else {
          postStore.posts.forEach((post) => {
            if (post.location && post.image) {
              createMarker(post);
            }
          });
        }
      });
      window.addEventListener("resize", () => map?.resize());
    } catch (error) {
      showToast("Failed to load map", "error");
    }
  });
}

onMounted(setupMap);

watch(
  () => props.selectedPost,
  (newVal, oldVal) => {
    if (props.staticMode && map && newVal && newVal.location) {
      map.setCenter([newVal.location.lng, newVal.location.lat]);
      map.setZoom(10);
      // Можно добавить пересоздание маркера, если нужно
    }
  }
);

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
  position: relative;
  flex: 1;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  background: var(--va-background-primary);
  box-shadow: var(--shadow);
}

#map {
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: 12px;
}

.map-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  max-width: 280px;
  z-index: 2;
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.custom-marker {
  transition: transform 0.2s ease;
}

.custom-marker:hover {
  transform: scale(1.15);
  z-index: 10;
}

.custom-marker.selected {
  transform: scale(1.15);
  z-index: 11;
  box-shadow: 0 0 0 4px var(--va-primary), 0 4px 16px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .map-container {
    padding: 0;
    border-radius: 8px;
  }

  #map {
    min-height: 200px;
    border-radius: 8px;
  }

  .map-overlay {
    width: calc(100% - 32px);
    max-width: none;
    left: 16px;
  }

  .custom-marker {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>
