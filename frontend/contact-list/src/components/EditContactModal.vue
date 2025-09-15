<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Editar Contato</h3>
      <form @submit.prevent="submitEdit">
        <input v-model="contactData.name" placeholder="Nome" required />
        <input v-model="contactData.phone" placeholder="Telefone" required />
        <input v-model="contactData.email" placeholder="Email" required />
        <div class="buttons">
          <button type="submit">Salvar</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ contact: Object })
const emits = defineEmits(['close', 'refresh'])

const contactData = ref({ ...props.contact })

watch(
  () => props.contact,
  (newVal) => {
    contactData.value = { ...newVal }
  }
)

const submitEdit = async () => {
  await axios.put(`/contacts/${contactData.value.id}`, contactData.value)
  emits('refresh')
  emits('close')
}
</script>

<style>
h3 {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 6px;
  width: 500px;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: small;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

button {
  width: 80px;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 12px;
}

button[type="submit"] {
  background: #4b6cb7;
  color: white;
}

button[type="submit"]:hover {
  background: #3b5998;
}

button[type="button"] {
  background: #aaa;
  color: white;
}

button[type="button"]:hover {
  background: #888;
}
</style>
