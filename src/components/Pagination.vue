<template>
    <nav aria-label="">
      <ul class="pagination">
        <li :class="{ disabled: source && source.current_page === 1 }">
          <a class="page-link" @click="nextPrev($event, source ? source.current_page - 1 : 0)" href="#">
            Anterior
          </a>
        </li>
        <li class="page-item" v-for="(page, index) in pages" :key="index" :class="{ active: source && source.current_page === page }">
          <a class="page-link" @click="navigate($event, page)" href="#">{{ page }}</a>
        </li>
        <li :class="{ disabled: source && source.current_page === source.last_page }">
          <a class="page-link" href="#" @click="nextPrev($event, source ? source.current_page + 1 : 0)">Próximo</a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { range } from 'lodash';
  
  export default defineComponent({
    props: {
      source: {
        type: Object as () => Record<string, any> | null,
        default: null,
      },
    },
    data() {
      return {
        pages: [] as number[],
      };
    },
    methods: {
      navigate(ev: Event, page: number) {
        ev.preventDefault();
        this.$emit('navigate', page);
      },
      nextPrev(ev: Event, page: number) {
        if (page === 0 || (this.source && page === this.source.last_page + 1)) {
          return;
        }
        this.$emit('navigate', page);
      },
    },
    watch: {
      source: {
        handler(newValue: Record<string, any> | null) {
          if (newValue) {
            this.pages = range(1, newValue.last_page + 1);
          }
        },
        deep: true,
      },
    },
  });
  </script>
  