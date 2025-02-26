
import { motion, useSpring, useScroll } from "framer-motion"

export const ScrollLinked = ({ children }) => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })
    
    return (
        <>
            <motion.div
                className="top-[50px] sm:top-[60px]"
                style={{
                    scaleX,
                    position: "fixed",
                    left: 0,
                    right: 0,
                    height: "10px",
                    transformOrigin: "0%",
                    backgroundColor: "#2f4858",
                    zIndex: 50
                }}
            />
            {children}
        </>
    )
}