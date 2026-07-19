import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Contact() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Visitor Count (Unique per user via localStorage)
    const hasVisited = localStorage.getItem("hasVisited");
    const counterUrl = hasVisited
      ? "https://api.counterapi.dev/v1/visheshjha-portfolio/visits"
      : "https://api.counterapi.dev/v1/visheshjha-portfolio/visits/up";

    fetch(counterUrl)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.count === "number") {
          setVisitorCount(data.count);
          localStorage.setItem("visitorCount", data.count.toString());
          if (!hasVisited) localStorage.setItem("hasVisited", "true");
        }
      })
      .catch((err) => {
        console.error("Counter API failed, falling back to local storage:", err);
        // Fallback if adblocker blocks counterapi
        const cachedCount = localStorage.getItem("visitorCount");
        if (cachedCount) {
          setVisitorCount(parseInt(cachedCount, 10));
        } else {
          setVisitorCount(11); // Fallback base number if completely blocked on first visit
        }
      });

    const fallbackToIP = () => {
      fetch("https://ipinfo.io/json")
        .then((res) => res.json())
        .then((data) => {
          if (data.region && data.country) {
            try {
              const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
              const countryName = regionNames.of(data.country);
              setLocation(`${data.region}, ${countryName || data.country}`);
            } catch (e) {
              setLocation(`${data.region}, ${data.country}`);
            }
          }
        })
        .catch(console.error);
    };

    // Fetch Geolocation using HTML5 Geolocation API for exact location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((res) => res.json())
            .then((data) => {
              const state = data.principalSubdivision;
              const country = data.countryName;
              if (state && country) {
                setLocation(`${state}, ${country}`);
              } else {
                fallbackToIP();
              }
            })
            .catch((err) => {
              console.error("Reverse geocode failed:", err);
              fallbackToIP();
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          fallbackToIP();
        },
        { timeout: 5000 } // 5 second timeout if user ignores prompt
      );
    } else {
      fallbackToIP();
    }
  }, []);

  const visitorStatsUI = (
    <div className="flex flex-col text-[#666666] font-sans text-sm md:text-base font-normal tracking-normal normal-case mb-4 md:mb-6">
      {visitorCount !== null && (
        <span className="mb-2 md:mb-4">{visitorCount.toLocaleString()} visitors so far</span>
      )}
      {location && (
        <span>You're visiting from {location}</span>
      )}
    </div>
  );

  return (
    <section className="relative w-full min-h-screen bg-[#FAFAFA] text-[#0a0a0a] p-6 md:p-12 font-sans overflow-hidden flex flex-col">
      <div className="flex flex-col md:grid md:grid-cols-12 flex-1 w-full gap-8 md:gap-0">
        
        {/* Left Column: CONTACT text & Copyright */}
        <div className="md:col-span-8 flex flex-col justify-between md:justify-start relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center justify-start relative z-10 -ml-[1vw] md:ml-0"
          >
            <div className="flex items-center">
              <span className="font-poster text-[22vw] md:text-[20vw] lg:text-[18vw] leading-none uppercase tracking-tighter">C</span>
              
              {/* Cursive O overlapping C and N */}
              <span className="font-playfair italic font-light text-[30vw] md:text-[28vw] lg:text-[24vw] leading-none transform -rotate-6 -ml-[3vw] md:-ml-[2vw] -mr-[2vw] md:-mr-[2vw] z-10 relative">O</span>
              
              <span className="font-poster text-[22vw] md:text-[20vw] lg:text-[18vw] leading-none uppercase tracking-tighter">NTACT</span>
            </div>
          </motion.div>

          <div className="hidden md:flex flex-col absolute bottom-0 left-0 pb-2">
            {visitorStatsUI}
            <div className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
              &copy;VISHESH
            </div>
          </div>
        </div>

        {/* Right Column: Socials, Designer */}
        <div className="md:col-span-4 flex flex-col justify-end md:justify-start relative md:pl-12 lg:pl-16 flex-1">
          
          {/* Main section: Get In Touch */}
          <div className="flex flex-col text-[10px] md:text-xs font-bold tracking-widest uppercase mb-16 md:mb-0">
            <span className="mb-6">GET IN TOUCH:</span>
            
            <div className="flex flex-col gap-1 mb-8">
              <span>EMAIL:</span>
              <a href="mailto:visheshjha456@gmail.com" className="lowercase">
                visheshjha456@gmail.com
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <a href="https://www.linkedin.com/in/visheshjha11/" target="_blank" rel="noreferrer">LINKEDIN</a>
              <a href="https://github.com/Visheshjha11" target="_blank" rel="noreferrer">GITHUB</a>
              <a href="https://yt.cool/IGIVBF" target="_blank" rel="noreferrer">YOUTUBE</a>
              <a href="https://substack.com/@visheshjha11" target="_blank" rel="noreferrer">SUBSTACK</a>
            </div>
          </div>

          {/* Designer & Mobile Copyright & Mobile Stats */}
          <div className="mt-auto md:absolute md:bottom-0 md:left-12 lg:left-16 pb-2 w-full">
            <div className="md:hidden">
              {visitorStatsUI}
            </div>
            <div className="flex justify-between md:justify-start text-[10px] md:text-xs font-bold tracking-widest uppercase">
              <span className="md:hidden">&copy;VISHESH JHA</span>
              <span>THINK.BUILD.SHIP</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
