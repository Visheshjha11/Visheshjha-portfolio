import React from "react";

export const prepxRole = [
  "Lead Full Stack Developer",
  "Product Designer",
  "System Architect"
];

export const prepxTimeline = "2024 - Present";

export const prepxPlatform = "Web Application";

export const prepxLiveWebsite = "https://prepx.vercel.app";

export const prepxSections = [
  {
    title: "Overview",
    content: (
      <>
        <p className="mb-6">Most online examination platforms focus on one thing—conducting tests. Very few help students actually prepare for them.</p>
        <p className="mb-6">Traditional systems are static, difficult to personalize, and rarely provide meaningful insights after an exam is completed. Students often spend hours switching between learning resources, quiz websites, flashcards, mock tests, and progress trackers just to prepare for a single examination.</p>
        <p className="mb-6">PrepX was built to change that.</p>
        <p className="mb-6">Rather than creating another examination portal, I designed an AI-powered preparation ecosystem where learning, revision, assessment, analytics, and accessibility work together in one unified experience.</p>
        <p className="mb-6">The objective wasn't simply helping students take exams.</p>
        <p>It was helping them become better learners.</p>
      </>
    )
  },
  {
    title: "The Problem",
    content: (
      <>
        <p className="mb-6">Preparing for competitive exams isn't just about solving questions. Students constantly struggle with:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Finding quality practice material</li>
          <li>Creating revision schedules</li>
          <li>Understanding weak topics</li>
          <li>Tracking long-term progress</li>
          <li>Receiving personalized feedback</li>
          <li>Accessing learning tools that accommodate different learning abilities</li>
        </ul>
        <p className="mb-6">Existing examination platforms usually end once the test is submitted. Students receive a score. Very little guidance follows.</p>
        <p>The learning journey stops exactly when it should begin.</p>
      </>
    )
  },
  {
    title: "Vision",
    content: (
      <>
        <p className="mb-6">PrepX was designed around one simple belief: Every student learns differently.</p>
        <p className="mb-6">Instead of providing identical quizzes to everyone, the platform should continuously adapt based on a learner's strengths, weaknesses, and progress.</p>
        <p className="mb-6">AI should personalize preparation instead of simply grading answers.</p>
        <p>Every assessment should make the next one smarter.</p>
      </>
    )
  },
  {
    title: "Product Goals",
    content: (
      <>
        <p className="mb-6">The project focused on five major objectives.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Intelligent Learning:</strong> Use AI to personalize preparation rather than deliver static content.</li>
          <li><strong>Assessment First:</strong> Create an examination experience that feels professional, secure, and distraction-free.</li>
          <li><strong>Actionable Analytics:</strong> Transform raw scores into meaningful learning insights.</li>
          <li><strong>Accessibility:</strong> Ensure students with different learning needs receive an equal learning experience.</li>
          <li><strong>Scalability:</strong> Design an architecture capable of supporting institutions, educators, and thousands of simultaneous learners.</li>
        </ul>
      </>
    )
  },
  {
    title: "Research & Discovery",
    content: (
      <>
        <p className="mb-6">Through discussions with students and educators, several recurring pain points became obvious.</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Generic Practice:</strong> Every learner received the same questions regardless of skill level.</li>
          <li><strong>Poor Feedback:</strong> Most platforms displayed only marks without explaining why performance changed.</li>
          <li><strong>Fragmented Preparation:</strong> Revision notes, flashcards, quizzes, and mock tests existed on separate platforms.</li>
          <li><strong>Accessibility Gaps:</strong> Many examination systems ignored learners requiring dyslexia-friendly fonts, read-aloud support, or improved readability.</li>
        </ul>
        <p>These insights became the foundation for PrepX's design philosophy.</p>
      </>
    )
  },
  {
    title: "Design Philosophy",
    content: (
      <>
        <p className="mb-6">Most examination software is built around administration. PrepX was designed around learning.</p>
        <p className="mb-6">Every feature answers one question: <em>Does this help students improve after today's assessment?</em></p>
        <p>Instead of focusing exclusively on test delivery, the platform combines preparation, evaluation, revision, and continuous improvement into one connected workflow.</p>
      </>
    )
  },
  {
    title: "Core Experience",
    content: (
      <>
        <p className="mb-6">Rather than becoming another question bank, PrepX was designed as a complete preparation ecosystem.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">AI Quiz Generation</h3>
        <p className="mb-6">Students can generate practice quizzes dynamically based on subjects, topics, and difficulty levels. Each assessment feels unique while remaining aligned with learning objectives.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Smart Mock Tests</h3>
        <p className="mb-6">Full-length examinations simulate real testing environments with timers, navigation controls, and performance tracking.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Adaptive Difficulty</h3>
        <p className="mb-6">As students improve, the platform gradually adjusts question complexity to maintain an optimal learning curve. Instead of becoming easier or harder randomly, assessments evolve alongside the learner.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Flashcards & Revision</h3>
        <p className="mb-6">Important concepts can be converted into flashcards for spaced repetition, making revision faster and significantly more effective.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Lessons & Learning Resources</h3>
        <p className="mb-6">Preparation extends beyond testing. Students can access structured learning content before attempting assessments, allowing theory and practice to exist within one platform.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Performance Analytics</h3>
        <p className="mb-6">Instead of displaying only percentages, PrepX visualizes topic mastery, weak concepts, improvement trends, accuracy, learning consistency, and historical performance.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Gamification</h3>
        <p>Preparing for examinations can become repetitive. PrepX introduces motivation through achievement badges, leaderboards, progress milestones, learning streaks, and performance rewards. The objective isn't competition; it's sustained engagement.</p>
      </>
    )
  },
  {
    title: "Accessibility & Examination Experience",
    content: (
      <>
        <p className="mb-6">Accessibility was treated as a core feature rather than an afterthought. The platform includes support for text-to-speech, read-aloud functionality, dyslexia-friendly typography, improved readability, and distraction-free interfaces.</p>
        <p className="mb-6">Every learner deserves equal access to quality education.</p>
        <p className="mb-6">The examination interface was designed to feel familiar, focused, and professional. Students can:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>attempt secure online examinations</li>
          <li>monitor remaining time</li>
          <li>navigate between questions</li>
          <li>review marked answers</li>
          <li>submit confidently</li>
        </ul>
        <p>The interface minimizes distractions while maintaining a smooth experience across devices.</p>
      </>
    )
  },
  {
    title: "System Architecture & AI Integration",
    content: (
      <>
        <p className="mb-6">PrepX follows a modular architecture where independent services manage authentication, examinations, AI generation, analytics, and user management.</p>
        <p className="mb-6">Key architectural principles include modular backend services, REST APIs, secure authentication, scalable database design, reusable frontend components, and responsive user interfaces. This separation allows new modules to be added without disrupting existing functionality.</p>
        <p className="mb-6">Artificial Intelligence powers multiple aspects of the platform. Rather than replacing educators, AI acts as an academic assistant. It helps by:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>generating quizzes</li>
          <li>creating revision questions</li>
          <li>adjusting difficulty</li>
          <li>recommending learning paths</li>
          <li>identifying weak topics</li>
          <li>producing personalized feedback</li>
        </ul>
        <p>The platform continuously transforms assessment data into meaningful learning recommendations.</p>
      </>
    )
  },
  {
    title: "Technical Challenges",
    content: (
      <>
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Personalizing Learning</h3>
        <p className="mb-6">Creating adaptive assessments required balancing difficulty progression while ensuring every student remained challenged without becoming discouraged. Designing this progression became one of the most rewarding engineering problems.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Analytics</h3>
        <p className="mb-6">Raw examination scores have limited educational value. Building dashboards that explain performance trends, learning consistency, and topic mastery required thinking beyond traditional examination software.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Accessibility</h3>
        <p className="mb-6">Supporting learners with different abilities influenced typography, spacing, interaction design, and reading experiences across the platform. Accessibility decisions affected nearly every screen.</p>
        
        <h3 className="text-xl font-bold mb-4 text-[#0a0a0a]/90">Large Question Libraries</h3>
        <p>The system was designed to support growing question banks without impacting performance or maintainability. Reusable data structures and modular APIs simplified future expansion.</p>
      </>
    )
  },
  {
    title: "Engineering Decisions",
    content: (
      <>
        <p className="mb-6">Several important technical decisions shaped PrepX:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Modular frontend architecture</li>
          <li>Component-driven UI</li>
          <li>Secure authentication</li>
          <li>AI-powered assessment generation</li>
          <li>Scalable examination workflows</li>
          <li>Analytics-first dashboard design</li>
          <li>Accessibility integrated into core experiences</li>
        </ul>
        <p>These choices ensure the platform can evolve from an academic project into a production-ready educational product.</p>
      </>
    )
  }
];
