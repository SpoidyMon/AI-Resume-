import { useState } from 'react'
import '../styles/Interview.scss'

const NAV_ITEMS = [
    {
        id: 'technical',
        label: 'Technical Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        )
    },
    {
        id: 'behavioral',
        label: 'Behavioral Questions',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: 'roadmap',
        label: 'Road Map',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
        )
    }
]

const STATIC_REPORT = {
    title: 'Full-Stack Software Developer / Software Engineer',
    matchScore: 88,
    technicalQuestions: [
        {
            question: 'Explain the Node.js event loop and how it handles asynchronous I/O operations.',
            intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
            answer: 'The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread.'
        },
        {
            question: 'How do you optimize a MongoDB aggregation pipeline for high-volume data?',
            intention: "To test practical experience with database performance and the candidate's claim of reducing response times by 35%.",
            answer: "Focus on using $match as early as possible to reduce the dataset, ensuring fields used in $match and $sort are indexed, and avoiding $unwind if possible as it inflates the document count. Mention the use of 'explain()' to analyze execution plans."
        },
        {
            question: 'Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?',
            intention: 'Evaluate knowledge of caching strategies and practical Redis implementation for high concurrency.',
            answer: 'Explain the cache-aside flow: check cache first, on miss query DB and update cache with a TTL. Mention use cases like session caching, API rate limiting, and frequent query caching.'
        },
        {
            question: 'What are the challenges of migrating a monolithic application to a modular service-based architecture?',
            intention: 'Assess architectural decision-making, distributed system pitfalls, and real-world migration strategies.',
            answer: 'Highlight data consistency issues across services (saga pattern vs 2PC), network latency, authentication propagation, deployment complexity, and boundary definition.'
        }
    ],
    behavioralQuestions: [
        {
            question: 'Tell me about a significant technical challenge you faced in a project.',
            intention: 'Assess problem-solving approach, diagnostic methodology, and resilience under pressure.',
            answer: 'Use the STAR method (Situation, Task, Action, Result). Highlight root-cause isolation, architectural trade-offs between speed and reliability, and measurable outcomes achieved.'
        },
        {
            question: 'Describe a situation where you had to learn a new technology quickly.',
            intention: 'Evaluate learning agility, resourcefulness, and practical implementation under deadlines.',
            answer: 'Detail your structured framework: reading official documentation, building proof-of-concept tests, stress-testing edge cases, and delivering working functionality incrementally.'
        },
        {
            question: 'How do you handle technical disagreements within an engineering team?',
            intention: 'Assess emotional intelligence, collaborative decision-making, and communication.',
            answer: 'Focus on empirical benchmark data rather than subjective opinions. Explore alternatives openly, align on shared project goals, and fully commit once a consensus is reached.'
        }
    ],
    skillGaps: [
        { skill: 'Message Queues (Kafka/RabbitMQ)', severity: 'high' },
        { skill: 'Advanced Docker & CI/CD Pipelines', severity: 'medium' },
        { skill: 'Distributed Systems Design', severity: 'medium' },
        { skill: 'Production-level Redis management', severity: 'low' }
    ],
    preparationPlan: [
        {
            day: 1,
            focus: 'Node.js Internals & Event Loop',
            tasks: [
                'Deep dive into Libuv thread pool & phase transitions (timers, poll, check, close).',
                'Trace event loop execution with microtasks (process.nextTick, Promise) vs macrotasks.'
            ]
        },
        {
            day: 2,
            focus: 'MongoDB Aggregation & Indexing',
            tasks: [
                'Analyze queries using explain("executionStats") to identify scan bottlenecks.',
                'Practice compound indexing and early $match/$project pipeline stage optimization.'
            ]
        },
        {
            day: 3,
            focus: 'Caching & Redis Architectures',
            tasks: [
                'Implement Cache-Aside pattern with automated TTL invalidation.',
                'Study cache stampede mitigation and Redis rate-limiting algorithms.'
            ]
        },
        {
            day: 4,
            focus: 'Distributed Systems & Microservices',
            tasks: [
                'Study Saga pattern for distributed transactions across independent services.',
                'Containerize multi-service application with Docker Compose and health checks.'
            ]
        },
        {
            day: 5,
            focus: 'Mock Interviews & Behavioral STAR',
            tasks: [
                'Rehearse STAR responses for past production incidents and leadership moments.',
                'Complete 45-minute timed technical mock interview.'
            ]
        }
    ]
}

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(index < 2)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const report = STATIC_REPORT

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                <nav className='interview-nav'>
                    <div className="nav-content">
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => {}}
                        className='button primary-button'
                        type='button'
                    >
                        <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                        </svg>
                        Download Resume
                    </button>
                </nav>

                <div className='interview-divider' />

                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                <aside className='interview-sidebar'>

                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>Strong match for this role</p>
                    </div>

                    <div className='sidebar-divider' />

                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview
