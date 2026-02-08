// Template data for different resume types
const RESUME_TEMPLATES = {
    'dental-practice': {
        name: 'Dental Practice',
        emoji: '🦷',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin eine erfahrene Zahnarzthelferin. Ich arbeite gern mit Menschen. Ich bin freundlich und hilfsbereit.',
            en: 'I am an experienced dental assistant. I enjoy working with people. I am friendly and helpful.'
        },
        experience: [
            {
                title_de: 'Zahnarzthelferin',
                title_en: 'Dental Assistant',
                date: '2020 - 2023',
                description_de: 'Arbeit in Zahnarztpraxis. Patienten helfen. Termine machen.',
                description_en: 'Work in dental practice. Help patients. Make appointments.'
            }
        ],
        skills: {
            de: ['Patienten helfen', 'Termine machen', 'Instrumente vorbereiten', 'Freundlich sein'],
            en: ['Help patients', 'Make appointments', 'Prepare instruments', 'Be friendly']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - A2', 'Englisch - B1'],
            en: ['Ukrainian - Native', 'German - A2', 'English - B1']
        },
        hobbies: {
            de: ['Lesen', 'Sport', 'Kochen'],
            en: ['Reading', 'Sports', 'Cooking']
        }
    },
    
    'nanny-childcare': {
        name: 'Nanny/Childcare',
        emoji: '👶',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin eine liebevolle Nanny. Ich arbeite gern mit Kindern. Ich bin geduldig und verantwortungsvoll.',
            en: 'I am a caring nanny. I enjoy working with children. I am patient and responsible.'
        },
        experience: [
            {
                title_de: 'Nanny',
                title_en: 'Nanny',
                date: '2020 - 2023',
                description_de: 'Kinder betreuen. Mit Kindern spielen. Essen machen.',
                description_en: 'Take care of children. Play with children. Prepare meals.'
            }
        ],
        skills: {
            de: ['Kinder betreuen', 'Mit Kindern spielen', 'Essen kochen', 'Hausaufgaben helfen'],
            en: ['Childcare', 'Play with children', 'Cook meals', 'Help with homework']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - A2', 'Englisch - B1'],
            en: ['Ukrainian - Native', 'German - A2', 'English - B1']
        },
        hobbies: {
            de: ['Mit Kindern spielen', 'Basteln', 'Musik'],
            en: ['Playing with children', 'Crafts', 'Music']
        }
    },
    
    'cleaning-hotel': {
        name: 'Cleaning/Hotel',
        emoji: '🧹',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin eine fleißige Reinigungskraft. Ich arbeite sauber und schnell. Ich bin zuverlässig.',
            en: 'I am a hardworking cleaner. I work clean and fast. I am reliable.'
        },
        experience: [
            {
                title_de: 'Reinigungskraft',
                title_en: 'Cleaner',
                date: '2020 - 2023',
                description_de: 'Zimmer putzen. Staubsaugen. Fenster putzen.',
                description_en: 'Clean rooms. Vacuum. Clean windows.'
            }
        ],
        skills: {
            de: ['Sauber arbeiten', 'Schnell arbeiten', 'Zimmer putzen', 'Fenster putzen'],
            en: ['Work clean', 'Work fast', 'Clean rooms', 'Clean windows']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - A2', 'Englisch - B1'],
            en: ['Ukrainian - Native', 'German - A2', 'English - B1']
        },
        hobbies: {
            de: ['Ordnung', 'Sauberkeit', 'Kochen'],
            en: ['Order', 'Cleanliness', 'Cooking']
        }
    },
    
    'warehouse-packing': {
        name: 'Warehouse/Packing/Post',
        emoji: '📦',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin eine fleißige Arbeiterin. Ich arbeite schnell und genau. Ich bin zuverlässig.',
            en: 'I am a hardworking employee. I work fast and accurately. I am reliable.'
        },
        experience: [
            {
                title_de: 'Lager-Mitarbeiterin',
                title_en: 'Warehouse Worker',
                date: '2020 - 2023',
                description_de: 'Waren packen. Pakete vorbereiten. Arbeiten nach Liste.',
                description_en: 'Pack goods. Prepare packages. Work according to list.'
            }
        ],
        skills: {
            de: ['Schnell arbeiten', 'Genau arbeiten', 'Waren packen', 'Arbeiten nach Liste'],
            en: ['Work fast', 'Work accurately', 'Pack goods', 'Work by list']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - A2', 'Englisch - B1'],
            en: ['Ukrainian - Native', 'German - A2', 'English - B1']
        },
        hobbies: {
            de: ['Sport', 'Lesen', 'Musik'],
            en: ['Sports', 'Reading', 'Music']
        }
    },
    
    'software-engineer': {
        name: 'Software Engineer',
        emoji: '💻',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin ein erfahrener Software-Ingenieur mit Expertise in Full-Stack-Entwicklung.',
            en: 'I am an experienced software engineer with expertise in full-stack development.'
        },
        experience: [
            {
                title_de: 'Software-Ingenieur',
                title_en: 'Software Engineer',
                date: '2020 - 2023',
                description_de: 'Full-Stack-Entwicklung. Web-Anwendungen erstellen. Code-Review.',
                description_en: 'Full-stack development. Build web applications. Code review.'
            }
        ],
        skills: {
            de: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git'],
            en: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - B2', 'Englisch - C1'],
            en: ['Ukrainian - Native', 'German - B2', 'English - C1']
        },
        hobbies: {
            de: ['Open Source', 'Technische Bücher', 'Programmieren'],
            en: ['Open Source', 'Technical Books', 'Programming']
        }
    },
    
    'dsp-engineer': {
        name: 'DSP Engineer',
        emoji: '🎛️',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin ein DSP-Ingenieur mit Expertise in Signalverarbeitung und Embedded Systems.',
            en: 'I am a DSP engineer with expertise in signal processing and embedded systems.'
        },
        experience: [
            {
                title_de: 'DSP-Ingenieur',
                title_en: 'DSP Engineer',
                date: '2020 - 2023',
                description_de: 'Digitale Signalverarbeitung. Algorithmen entwickeln. Embedded C/C++.',
                description_en: 'Digital signal processing. Develop algorithms. Embedded C/C++.'
            }
        ],
        skills: {
            de: ['MATLAB', 'C/C++', 'Python', 'Signalverarbeitung', 'FFT', 'Filter-Design'],
            en: ['MATLAB', 'C/C++', 'Python', 'Signal Processing', 'FFT', 'Filter Design']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - B2', 'Englisch - C1'],
            en: ['Ukrainian - Native', 'German - B2', 'English - C1']
        },
        hobbies: {
            de: ['Elektronik', 'Audio-Verarbeitung', 'Mathematik'],
            en: ['Electronics', 'Audio Processing', 'Mathematics']
        }
    },
    
    'uav-engineer': {
        name: 'UAV Engineer',
        emoji: '🚁',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin ein UAV-Ingenieur mit Expertise in Drohnen-Entwicklung und autonomen Systemen.',
            en: 'I am a UAV engineer with expertise in drone development and autonomous systems.'
        },
        experience: [
            {
                title_de: 'UAV-Ingenieur',
                title_en: 'UAV Engineer',
                date: '2020 - 2023',
                description_de: 'Drohnen entwickeln. Flugsteuerung programmieren. Autonome Navigation.',
                description_en: 'Develop drones. Program flight control. Autonomous navigation.'
            }
        ],
        skills: {
            de: ['C/C++', 'Python', 'ROS', 'Pixhawk', 'ArduPilot', 'Computer Vision'],
            en: ['C/C++', 'Python', 'ROS', 'Pixhawk', 'ArduPilot', 'Computer Vision']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - B2', 'Englisch - C1'],
            en: ['Ukrainian - Native', 'German - B2', 'English - C1']
        },
        hobbies: {
            de: ['Drohnen-Flug', 'Robotik', 'Luftfahrt'],
            en: ['Drone Flying', 'Robotics', 'Aviation']
        }
    },
    
    'hotel-supervisor': {
        name: 'Hotel Room Supervisor',
        emoji: '🏨',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin eine erfahrene Hotel-Aufseherin. Ich leite ein Team. Ich bin verantwortungsvoll.',
            en: 'I am an experienced hotel supervisor. I lead a team. I am responsible.'
        },
        experience: [
            {
                title_de: 'Hotel-Aufseherin',
                title_en: 'Hotel Supervisor',
                date: '2020 - 2023',
                description_de: 'Team leiten. Qualität kontrollieren. Mit Gästen sprechen.',
                description_en: 'Lead team. Control quality. Speak with guests.'
            }
        ],
        skills: {
            de: ['Team leiten', 'Qualität kontrollieren', 'Planen', 'Freundlich sein'],
            en: ['Lead team', 'Quality control', 'Planning', 'Be friendly']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - B1', 'Englisch - B2'],
            en: ['Ukrainian - Native', 'German - B1', 'English - B2']
        },
        hobbies: {
            de: ['Gastfreundschaft', 'Organisation', 'Reisen'],
            en: ['Hospitality', 'Organization', 'Traveling']
        }
    },
    
    'massage-master': {
        name: 'Massage Master',
        emoji: '💆',
        contact: {
            name: 'Your Name',
            phone: '+49 123 456789',
            email: 'your.email@example.com',
            address: 'Your City, Germany'
        },
        profile: {
            de: 'Ich bin eine erfahrene Massage-Therapeutin. Ich arbeite professionell und achtsam.',
            en: 'I am an experienced massage therapist. I work professionally and mindfully.'
        },
        experience: [
            {
                title_de: 'Massage-Therapeutin',
                title_en: 'Massage Therapist',
                date: '2020 - 2023',
                description_de: 'Verschiedene Massagen. Kunden beraten. Entspannung geben.',
                description_en: 'Various massages. Advise clients. Provide relaxation.'
            }
        ],
        skills: {
            de: ['Klassische Massage', 'Sport-Massage', 'Thai-Massage', 'Kunden beraten'],
            en: ['Classic Massage', 'Sports Massage', 'Thai Massage', 'Client Consulting']
        },
        languages: {
            de: ['Ukrainisch - Muttersprache', 'Deutsch - B1', 'Englisch - B1'],
            en: ['Ukrainian - Native', 'German - B1', 'English - B1']
        },
        hobbies: {
            de: ['Yoga', 'Meditation', 'Wellness'],
            en: ['Yoga', 'Meditation', 'Wellness']
        }
    }
};

// Get template data by ID
function getTemplateData(templateId) {
    return RESUME_TEMPLATES[templateId] || RESUME_TEMPLATES['cleaning-hotel'];
}

// Get all available templates
function getAllTemplates() {
    return Object.keys(RESUME_TEMPLATES).map(id => ({
        id: id,
        name: RESUME_TEMPLATES[id].name,
        emoji: RESUME_TEMPLATES[id].emoji
    }));
}
