import { ref } from 'vue';

export default {
  setup() {
    const text = ref('blubb 123');
    const user = ref('123');

    const changeMessage = () => {
      user.value = 'New Message!';
    };

    return {
      text,
      user,
      changeMessage,
    };
  },
  template: `
    <div>
      {{ text }}
      <button @click="changeMessage">Change Message</button>
      <h1>{{ user }}</h1>
    </div>
  `,
};
