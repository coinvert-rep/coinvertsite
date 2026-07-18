import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Remplace par tes vraies clés Supabase
const supabaseUrl = 'https://kppiallycqkvrqixgpoc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwcGlhbGx5Y3FrdnJxaXhncG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMTU5ODksImV4cCI6MjA5OTg5MTk4OX0.jUqOgvwV3EM14kucGbusDUqhd6H-Dcz68dQay2XtT04'; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('🧹 Étape 1 : Nettoyage des anciennes données (adieu les 409 produits)...');
  
  // Le filtre .not('id', 'is', null) permet de cibler et supprimer absolument toutes les lignes
  const { error: deleteError } = await supabase
    .from('produits')
    .delete()
    .not('id', 'is', null);

  if (deleteError) {
    return console.error('❌ Erreur lors du nettoyage :', deleteError.message);
  }
  console.log('✅ Table vidée avec succès !');

  console.log('📦 Étape 2 : Lecture du fichier inventaire.json...');
  const rawData = fs.readFileSync('inventaire.json');
  const produits = JSON.parse(rawData);

  console.log(`🚀 Étape 3 : Importation des ${produits.length} produits uniques...`);
  const { error: insertError } = await supabase
    .from('produits')
    .insert(produits);

  if (insertError) {
    console.error('❌ Erreur lors de l\'importation :', insertError.message);
  } else {
    console.log('🎉 Succès total ! Ta base de données est propre et prête pour ton site.');
  }
}

seedDatabase();