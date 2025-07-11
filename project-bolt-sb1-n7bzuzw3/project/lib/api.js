const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
  constructor() {
    this.token = null;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  logout() {
    this.setToken(null);
  }

  // Content methods
  async getWishes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/wishes?${queryString}`);
  }

  async createWish(wishData) {
    return this.request('/wishes', {
      method: 'POST',
      body: JSON.stringify(wishData),
    });
  }

  async getQuotes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/quotes?${queryString}`);
  }

  async createQuote(quoteData) {
    return this.request('/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
  }

  async getShayari(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/shayari?${queryString}`);
  }

  async createShayari(shayariData) {
    return this.request('/shayari', {
      method: 'POST',
      body: JSON.stringify(shayariData),
    });
  }

  async getPuzzles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/puzzles?${queryString}`);
  }

  async createPuzzle(puzzleData) {
    return this.request('/puzzles', {
      method: 'POST',
      body: JSON.stringify(puzzleData),
    });
  }

  async getCards(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/cards?${queryString}`);
  }

  async createCard(cardData) {
    return this.request('/cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async seedDatabase() {
    return this.request('/seed', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;