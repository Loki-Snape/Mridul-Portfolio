import axios from 'axios';

// Base URL from Vite environment variable, with fallback
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
});

export async function getProjects() {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getSkills() {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

export async function getCertifications() {
  try {
    const response = await api.get('/certifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
}

export async function getExperience() {
  try {
    const response = await api.get('/experience');
    return response.data;
  } catch (error) {
    console.error('Error fetching experience:', error);
    return [];
  }
}

export async function getStats() {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}
