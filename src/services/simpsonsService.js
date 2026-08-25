import { api } from "./api";

export const simpsonsService = {
  async getCharacters(page = 1) {
    // La API usa el parámetro ?page=X
    const response = await api.get(`/characters?page=${page}`);
    return response.data;
  },

  async getCharacterById(id) {
    const response = await api.get(`/characters/${id}`);
    return response.data;
  },
};
