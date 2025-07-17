<template>
  <h1>h</h1>
</template>

<script setup lang="ts">
import { getParticipantsByVotingEventId } from '../services/participantController';

const props = defineProps<{ id: string }>();
console.log(getParticipantsByVotingEventId(props.id));
</script>
