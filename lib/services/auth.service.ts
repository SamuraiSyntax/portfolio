export class AuthService {
  private static token = "";
  private static readonly API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  static async login(username: string, password: string): Promise<string> {
    try {
      const response = await fetch(`${this.API_URL}/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(`Échec de l'authentification: ${response.statusText}`);
      }

      const data = await response.json();
      this.token = data.token;
      return this.token;
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      throw error;
    }
  }

  static getToken(): string {
    return this.token;
  }

  static clearToken(): void {
    this.token = "";
  }

  static isAuthenticated(): boolean {
    return Boolean(this.token);
  }
}
