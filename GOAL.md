# improve.

## Product goal

Build a focused, mobile-first study companion for Kerala Plus One improvement exam students. Resources are currently scattered across YouTube, education websites, textbooks, and question-paper archives. `improve.` should bring the best paths together and help a student decide what to study next.

The product should feel calm, practical, and encouraging, not like an advertising-heavy course marketplace.

## Audience

- Kerala Plus One students preparing for improvement examinations.
- Students who may use Malayalam, English, or both.
- Students who need a clear plan, not just more links.

## Trusted starting resources

Use these as linked resource sources and attribution references. Do not copy or republish protected content without permission.

- Xylem: all-round video teaching and revision.
- Eduport: all-round video teaching and revision.
- Exam Winner: all-round video teaching and revision.
- HSSLive: chapter summaries, textbooks, and previous-year questions.
- HSSReporter: previous-year question papers and exam resources.

Every external resource should retain its original URL, creator/source name, resource type, chapter, language, and last-reviewed date.

## Prototype scope

The first prototype is a polished student dashboard with representative data. It currently demonstrates:

- Exam countdown.
- A daily focus lesson and progress indicator.
- Subject filters and chapter progress.
- Revision resource cards.
- Chapter-aware AI tutor entry point.
- Responsive desktop and mobile layout.

The next implementation slices should prioritize real chapter data, question papers, and progress persistence before authentication or payments.

## Product roadmap

1. Add the official syllabus and chapter catalog for one stream/subject set.
2. Model resources as metadata plus original links.
3. Add chapter notes, key points, formulas, diagrams, and common mistakes.
4. Add marks calculator for previous marks, target marks, and chapter priorities.
5. Add quizzes and chapter performance breakdowns.
6. Add a study planner with revision and mock-test days.
7. Add a chapter-specific AI tutor using verified chapter content as retrieval context.
8. Add Malayalam/English explanations and low-bandwidth/PWA support.

## AI tutor principles

The integrated tutor must know which subject and chapter the student selected. It should answer from approved content, explain rather than simply give answers, admit uncertainty, and link to the source context when possible. It must not claim that a chapter or question is guaranteed to appear in the exam.

## Engineering principles

- Use Next.js App Router and TypeScript.
- Prefer small, readable components and data structures.
- Build mobile-first and test keyboard accessibility.
- Keep content separate from UI so a database can replace prototype data later.
- Validate educational claims and label historical trends as trends, not predictions.
- Never expose private student marks or personal information unnecessarily.
- Keep external resources attributed and easy to report or review.

## Definition of a successful MVP

A student can enter the dashboard, understand how much time remains, identify their next useful study action, open a trusted chapter resource, practice questions, and see whether their chapter-level confidence is improving.
