import React from 'react';
import * as Heroes from './HeroesAnimated';  // Import everything from Heroes.tsx

const HeroImageAnimated = ({ heroName }: { heroName: string }) => {
    // Construct the key to dynamically access the correct hero from the Heroes object
    const heroKey = `npc_dota_hero_${heroName}`;
  
    const HeroAsset = Heroes[heroKey as keyof typeof Heroes];  // Dynamically access the hero's asset
  
    if (!HeroAsset) {
      return null;  // Fallback if the hero asset doesn't exist
    }
  
    return (
      <video autoPlay loop muted>
        <source src={HeroAsset} type="video/webm" />
      </video>
    );
  };
  
  export default HeroImageAnimated;