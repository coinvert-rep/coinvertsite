import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// 1. Remplace par tes vraies infos Supabase (trouvables dans Project Settings > API)
const supabaseUrl = 'https://kppiallycqkvrqixgpoc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwcGlhbGx5Y3FrdnJxaXhncG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMTU5ODksImV4cCI6MjA5OTg5MTk4OX0.jUqOgvwV3EM14kucGbusDUqhd6H-Dcz68dQay2XtT04';

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Lecture du fichier inventaire.json...');
  
  // 2. On lit le fichier JSON
  const rawData = fs.readFileSync('inventaire.json');
  const produits = JSON.parse(rawData);

  console.log(`Prêt à importer ${produits.length} produits dans Supabase !`);

  // 3. On envoie tout à Supabase
  const { data, error } = await supabase
    .from('produits')
    .insert(produits);

  if (error) {
    console.error('Erreur lors de l\'importation :', error.message);
  } else {
    console.log('Succès ! Tous les produits sont dans ta base de données 🎉');
  }
}

seedDatabase();