import { useEffect, useRef } from 'react';

export default function InteractiveSmoke() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Ajuste la taille du canvas à l'écran
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 40 + 20; // Taille initiale de la fumée
        this.speedX = Math.random() * 2 - 1; // Dérive horizontale
        this.speedY = Math.random() * -2 - 0.5; // Monte vers le haut
        this.life = 1.0; // Opacité de départ
        this.decay = Math.random() * 0.015 + 0.005; // Vitesse de disparition
        
        // On mélange des particules grises et quelques particules très légèrement vertes
        this.isGreen = Math.random() > 0.8;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += 0.8; // La fumée s'étend en montant
        this.life -= this.decay;
      }

      draw() {
        if (this.life <= 0) return;
        
        ctx.globalAlpha = Math.max(0, this.life);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        
        // Couleurs sobres : Gris très foncé/blanc cassé, ou une touche de vert
        const rgb = this.isGreen ? '34, 197, 94' : '150, 150, 150';
        
        gradient.addColorStop(0, `rgba(${rgb}, ${this.life * 0.08})`); // Centre très doux
        gradient.addColorStop(1, `rgba(${rgb}, 0)`); // Bords invisibles
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const addSmoke = (x, y) => {
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(x, y));
      }
    };

    // Gère la souris (PC) et le doigt (Cellulaire)
    const handleMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      addSmoke(x, y);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    // Boucle d'animation
    const animate = () => {
      // Fond noir/gris très foncé qui efface l'image précédente doucement pour un effet de traînée
      ctx.fillStyle = '#09090b'; // Couleur zinc-950 de Tailwind
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(index, 1);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]" 
    />
  );
}