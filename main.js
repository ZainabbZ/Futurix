// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Load demo data if not exists
    if (!localStorage.getItem('companies')) {
        const demoCompanies = [
            {
                name: "Tech Innovators Inc.",
                email: "hr@techinnovators.com",
                location: "San Francisco, CA",
                positions: [
                    {
                        title: "Human-AI Collaboration Specialist",
                        traits: ["Adaptability", "Critical Thinking", "Collaboration"]
                    },
                    {
                        title: "Digital Transformation Lead",
                        traits: ["Leadership", "Strategic Thinking", "Technical Aptitude"]
                    }
                ]
            },
            {
                name: "Future Systems Ltd.",
                email: "careers@futuresystems.com",
                location: "New York, NY",
                positions: [
                    {
                        title: "Digital Transformation Consultant",
                        traits: ["Digital Literacy", "Complex Problem Solving", "Leadership"]
                    }
                ]
            }
        ];
        localStorage.setItem('companies', JSON.stringify(demoCompanies));
    }
    
    // Load skills if not already present
    if (!localStorage.getItem('skills')) {
        const skills = [
            { 
                name: "Critical Thinking", 
                category: "Cognitive",
                resources: [
                    "https://www.coursera.org/learn/critical-thinking",
                    "https://www.mindtools.com/pages/article/newCT_02.htm"
                ] 
            },
            { 
                name: "Emotional Intelligence", 
                category: "Interpersonal",
                resources: [
                    "https://www.udemy.com/course/emotional-intelligence-mastery/",
                    "https://www.mindtools.com/pages/article/ei-quiz.htm"
                ] 
            },
            { 
                name: "Complex Problem Solving", 
                category: "Cognitive",
                resources: [
                    "https://www.coursera.org/learn/model-thinking",
                    "https://www.mindtools.com/pages/article/newTMC_72.htm"
                ] 
            },
            { 
                name: "Creativity", 
                category: "Cognitive",
                resources: [
                    "https://www.udemy.com/course/creativity-and-problem-solving/",
                    "https://www.ted.com/topics/creativity"
                ] 
            },
            { 
                name: "Leadership", 
                category: "Interpersonal",
                resources: [
                    "https://www.coursera.org/learn/leadership",
                    "https://www.mindtools.com/pages/article/newLDR_41.htm"
                ] 
            },
            { 
                name: "Data Analysis", 
                category: "Technical",
                resources: [
                    "https://www.khanacademy.org/math/statistics-probability",
                    "https://www.datacamp.com/courses/free-introduction-to-data-science"
                ] 
            },
            { 
                name: "Digital Literacy", 
                category: "Technical",
                resources: [
                    "https://learndigital.withgoogle.com/digitalskills",
                    "https://www.microsoft.com/en-us/digital-skills"
                ] 
            },
            { 
                name: "Adaptability", 
                category: "Interpersonal",
                resources: [
                    "https://www.linkedin.com/learning/developing-adaptability-as-a-manager",
                    "https://hbr.org/2020/07/how-to-be-adaptable-in-times-of-crisis"
                ] 
            },
            { 
                name: "Collaboration", 
                category: "Interpersonal",
                resources: [
                    "https://www.coursera.org/learn/teamwork-skills-effective",
                    "https://www.mindtools.com/pages/article/good-team-member.htm"
                ] 
            },
            { 
                name: "Continuous Learning", 
                category: "Cognitive",
                resources: [
                    "https://www.ted.com/playlists/307/the_joy_of_learning",
                    "https://www.coursera.org/learn/learning-how-to-learn"
                ] 
            }
        ];
        localStorage.setItem('skills', JSON.stringify(skills));
    }
});
