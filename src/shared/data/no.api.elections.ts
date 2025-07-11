import type { Election } from '../interfaces/election';
import { ref } from 'vue';

export const activeElections = ref<Election[]>([
  {
    id: 'eph001',
    title: 'Mejor Equipo de Fútbol ⚽',
    question: '¿Cuál es el mejor equipo de fútbol de la historia?',
    options: ['Real Madrid', 'Barcelona', 'Bayern Munich', 'Manchester United'],
  },
  {
    id: 'eph002',
    title: 'Sabor de Helado Favorito 🍦',
    question: 'Si solo pudieras comer un sabor de helado por el resto de tu vida, ¿cuál sería?',
    options: ['Chocolate', 'Vainilla', 'Fresa', 'Pistacho'],
  },
  {
    id: 'eph003',
    title: 'Próximo Evento de la Comunidad',
    question: '¿Qué tipo de evento te gustaría que organizáramos el próximo mes?',
    options: ['Hackathon', 'Webinar', 'Meetup Social', 'Taller de Código'],
  },
  {
    id: 'eph004',
    title: 'Nuevo Diseño de Website',
    question:
      '¿Qué dirección de diseño prefieres para la próxima actualización de nuestro sitio web?',
    options: ['Minimalista', 'Moderno y Colorido', 'Clásico y Robusto'],
  },
]);
