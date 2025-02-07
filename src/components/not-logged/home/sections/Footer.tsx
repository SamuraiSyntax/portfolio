"use client";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Copyright et texte */}
        <div className="text-sm text-muted-foreground">
          <p>© 2024 Rogier Bernard. Tous droits réservés.</p>
          <p>Développeur Full Stack WordPress & Next.js</p>
        </div>
      </div>
    </footer>
  );
}
