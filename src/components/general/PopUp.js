import "./PopUp.css";
// React
import { useRef, useEffect } from "react";
// Animation
import { motion } from "framer-motion";

export default function PopUp(props) {
  // References
  const timerId = useRef(null);

  // Hide pop-up after specified time
  useEffect(() => {
    // Set timer
    timerId.current = setTimeout(() => {
      props.setPopUpDisplay(false);
    }, 3000);
    // Clear timer on unmount
    return () => {
      clearTimeout(timerId.current);
    };
  }, [props.popUpDisplay]);

  // Override existing pop-up for new pop-ups
  useEffect(() => {
    // Clear timer in-progress
    clearTimeout(timerId.current);
    // Reset timer
    timerId.current = setTimeout(() => {
      props.setPopUpDisplay(false);
    }, 3000);
    // Clear timer on unmount
    return () => {
      clearTimeout(timerId.current);
    }
  }, [props.popUpOverride]);

  if(props.popUpDisplay) {
    return (
      <div id="popUp">
        <motion.div 
          id="popUp-message"
          className={(props.type === "error") ? "popUp-error" : "popUp-success"}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}>
          {props.message}
        </motion.div>
      </div>
    );
  }
};