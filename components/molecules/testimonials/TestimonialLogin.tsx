"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function TestimonialLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated, logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
    } catch (error) {
      setError("Identifiants invalides " + error);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="text-center">
        <p className="mb-4">Vous êtes connecté</p>
        <Button onClick={() => logout()}>Se déconnecter</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        Se connecter
      </Button>
    </form>
  );
}
