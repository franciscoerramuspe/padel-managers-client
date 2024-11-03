import { motion } from 'framer-motion';
import Image from 'next/image';

interface OnboardingSlideProps {
  title: string;
  subtitle: string;
  imagePath: string;
  isActive: boolean;
  titleColor?: string;
  highlightWord?: string;
}

export function OnboardingSlide({ 
  title, 
  subtitle, 
  imagePath, 
  isActive,
  titleColor = "blue",
  highlightWord
}: OnboardingSlideProps) {
  const words = title.split(' ');
  const highlightIndex = words.findIndex(word => word === highlightWord);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 50 }}
      exit={{ opacity: 0, x: -50 }}
      className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-3 text-white">
          {words.map((word, index) => (
            <span key={index} className={`${
              index === highlightIndex ? 'text-white font-extrabold' : 'text-white/90'
            } inline-block mx-1`}>
              {word}
            </span>
          ))}
        </h2>
        <p className="text-white/80 text-lg">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative w-72 h-72"
      >
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-contain drop-shadow-xl"
        />
      </motion.div>
    </motion.div>
  );
}