<template>
  <div class="ml-8 top-[48px] pr-8 fixed z-10 w-[calc(100%-240px-2rem)]">
    <h1 class="text-3xl font-bold text-text-main mb-6">Crea Tu Nueva Elección 🎉</h1>
    <p class="text-lg text-text-secondary mb-8">
      Define los detalles clave de tu votación para que otros puedan participar.
    </p>

    <div class="bg-card-bg p-8 rounded-lg shadow-xl backdrop-blur-sm border border-border">
      <form @submit.prevent="submitElection">
        <!-- Título de la Elección -->
        <div class="mb-6">
          <label for="electionTitle" class="block text-text-main text-sm font-medium mb-2">
            Título de la Elección
          </label>
          <input
            type="text"
            id="electionTitle"
            v-model="election.title"
            placeholder="Ej: ¿Mejor color para el nuevo logo?"
            class="w-full p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start"
            required
          />
        </div>

        <!-- Pregunta Principal -->
        <div class="mb-6">
          <label for="electionDescription" class="block text-text-main text-sm font-medium mb-2">
            Descripción
          </label>
          <textarea
            id="electionDescription"
            v-model="election.description"
            rows="3"
            placeholder="Ej: ¿Cuál de las siguientes opciones representa mejor nuestra visión?"
            class="w-full p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start"
            required
          ></textarea>
        </div>

        <!-- Opciones de Votación -->
        <div class="mb-6">
          <label class="block text-text-main text-sm font-medium mb-3">
            Opciones para la Votación
          </label>
          <div
            v-for="(option, index) in election.options"
            :key="index"
            class="flex gap-3 mb-3 items-center"
          >
            <input
              type="text"
              v-model="election.options[index]"
              :placeholder="`Opción ${index + 1}`"
              class="flex-grow p-3 rounded-md bg-bg-main-alt text-text-main border border-border focus:outline-none focus:ring-2 focus:ring-accent-start"
              required
            />
            <button
              v-if="election.options.length > 2"
              @click="removeOption(index)"
              type="button"
              class="text-text-secondary hover:text-red-500 transition-colors duration-200 p-2"
              title="Eliminar opción"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          <button
            @click="addOption"
            type="button"
            class="flex items-center gap-2 text-accent-start hover:text-fuchsia-500 transition-colors duration-200 mt-2 px-3 py-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Agregar Opción
          </button>
        </div>

        <!-- Botón de Creación -->
        <div class="mt-8">
          <button
            type="submit"
            class="w-full bg-accent-start hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
          >
            Crear Elección
          </button>
        </div>
      </form>
    </div>

    <!-- Custom Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-card-bg p-8 rounded-lg shadow-2xl border border-border max-w-md w-full text-center animate-zoom-in"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 class="text-2xl font-bold text-text-main mb-3">¡Elección Creada con Éxito!</h2>
        <p class="text-text-secondary mb-6">
          Tu nueva elección "{{ createdElectionTitle }}" está lista para ser votada.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink
            :to="`/dashboard/vote/${createdElectionId}`"
            @click="closeModal"
            class="bg-accent-start hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex-grow"
          >
            Ver Elección
          </RouterLink>
          <button
            @click="createNewElection"
            class="bg-gray-700 hover:bg-gray-600 text-text-main font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex-grow"
          >
            Crear Otra
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { createVotingEvent } from '../services/createEvent';
import { createOption } from '../services/optionController';

const election = reactive({
  title: '',
  description: '',
  options: ['', ''], // Start with two default empty options
});

const isLoading = ref(false); // State for loading animation on button
const showSuccessModal = ref(false); // State to control modal visibility
const createdElectionId = ref(''); // To store the ID of the created election
const createdElectionTitle = ref(''); // To store the title for the modal

const addOption = () => {
  election.options.push('');
};

const removeOption = (index: number) => {
  if (election.options.length > 2) {
    election.options.splice(index, 1);
  }
};

const submitElection = async () => {
  isLoading.value = true;

  try {
    const eventPayload = {
      title: election.title,
      description: election.description,
      startTime: new Date(Date.now() - 5 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() + 19 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    };

    const createdEvent = await createVotingEvent(eventPayload);
    console.log(createdEvent);
    createdElectionId.value = createdEvent.id;
    createdElectionTitle.value = createdEvent.title;

    for (const optionLabel of election.options) {
      if (optionLabel) {
        const optionPayload = {
          eventId: createdEvent.id,
          label: optionLabel,
        };
        await createOption(optionPayload);
      }
    }

    isLoading.value = false;
    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error creating election:', error);
    isLoading.value = false;
  }
};

const closeModal = () => {
  showSuccessModal.value = false;
};

const createNewElection = () => {
  // Reset the form for a new election
  election.title = '';
  election.description = '';
  election.options = ['', ''];
  closeModal(); // Close the modal
};
</script>

<style scoped>
/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards 0.2s;
}

.animate-slide-in-left {
  animation: slideInLeft 0.7s ease-out forwards 0.4s;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-zoom-in {
  animation: zoomIn 0.3s ease-out forwards;
}

/* Staggered fade-in for form sections */
.animate-fade-in-delay-1 {
  animation: fadeIn 0.5s ease-out forwards 0.7s;
  opacity: 0; /* Start hidden */
}
.animate-fade-in-delay-2 {
  animation: fadeIn 0.5s ease-out forwards 0.8s;
  opacity: 0;
}
.animate-fade-in-delay-3 {
  animation: fadeIn 0.5s ease-out forwards 0.9s;
  opacity: 0;
}
.animate-fade-in-delay-4 {
  animation: fadeIn 0.5s ease-out forwards 1s;
  opacity: 0;
}

/* Loader spinner for button */
.loader {
  border-top-color: #3498db; /* Blue color for spinner */
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
