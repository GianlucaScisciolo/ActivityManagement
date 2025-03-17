  // // Gestione degli eventi della tastiera per bloccare frecce e backspace
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     // Blocca Alt+Freccia Sinistra (Indietro) e Alt+Freccia Destra (Avanti)
  //     if ((e.altKey && e.key === "ArrowLeft") || (e.altKey && e.key === "ArrowRight")) {
  //       e.preventDefault();
  //     }

  //     // Blocca il tasto Backspace al di fuori di input o textarea
  //     if (e.key === "Backspace" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
  //       e.preventDefault();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   // Cleanup del listener quando il componente viene smontato
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);