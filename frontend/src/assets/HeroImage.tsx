import * as Heroes from './Heroes'; 

const HeroImage = ({ heroName }: { heroName: string }) => {
  const HeroImage = Heroes[heroName as keyof typeof Heroes]; 

  if (!HeroImage) {
    return null 
  }

  return (
    <img src={HeroImage} alt={heroName} />
  );
};

export default HeroImage
