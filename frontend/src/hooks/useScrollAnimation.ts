import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = (options = { threshold: 0.1, once: true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, options);

  return { ref, isInView };
};
