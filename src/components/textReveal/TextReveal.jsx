






























// "use client";
// import React, { useRef, useState, useEffect } from "react";
// import "./TextReveal.css";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const TextReveal = () => {
//   const [letterRef, setLetterRef] = useArrayRef();
//   function useArrayRef() {
//     const letterRef = useRef([]);
//     letterRef.current = [];
//     return [letterRef, (ref) => ref && letterRef.current.push(ref)];
//   }

//   const triggerRef=useRef(null)
//   gsap.registerPlugin(ScrollTrigger)

//   useEffect(() => {
//     const reveal = gsap.to(letterRef.current, {
//       scrollTrigger: {
//         trigger: triggerRef.current,
//         scrub: true,
//         strat: "top center",
//         end: "bottom 80%",
//       },
//       color: "#2A2A2A",
//       duration: 5,
//       stagger: 1,
//     });
//     return () => {
//       reveal.kill();
//     };
//   }, []);

//   const text = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
//   asperiores illo fugit nesciunt unde! Cumque esse impedit minima, quam
//   alias voluptates quisquam quae? Fuga repellat sint doloremque iure
//   adipisci dignissimos.`;
//   return (
//     <>
//       <div className="reveal h-[100vh] " ref={triggerRef}>
//         <div className="h-[100%]" >
//           {text.split("").map((letter, index) => (
//             <span className="text-reveal" ref={setLetterRef} key={index}>
//               {letter}
//             </span>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TextReveal;
