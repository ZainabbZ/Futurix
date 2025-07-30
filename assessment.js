document.getElementById('assessmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading animation
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loader"></span> Analyzing...';
    submitBtn.disabled = true;

    // Get all answers
    const answers = {};
    let allAnswered = true;
    
    for (let i = 1; i <= 10; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption) {
            answers[`q${i}`] = parseInt(selectedOption.value);
        } else {
            allAnswered = false;
            break;
        }
    }

    if (!allAnswered) {
        alert('Please answer all questions before submitting.');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        return;
    }

    // Simulate processing delay (remove in production)
    setTimeout(() => {
        // Calculate risk score (sum of all answers)
        const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
        
        // Calculate risk percentage (0-100%)
        const maxPossibleScore = 4 * 10;
        const riskPercentage = Math.round((totalScore / maxPossibleScore) * 100);
        
        // Generate recommendations
        const recommendations = generateRecommendations(totalScore, answers);
        
        // Store results
        sessionStorage.setItem('riskPercentage', riskPercentage);
        sessionStorage.setItem('recommendations', JSON.stringify(recommendations));
        
        // Redirect to results page
        window.location.href = 'user-results.html';
    }, 1500);
});

function generateRecommendations(score, answers) {
    // Get skills and companies from localStorage
    const allSkills = JSON.parse(localStorage.getItem('skills')) || [];
    const allCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    
    // Determine which skills to recommend based on answers
    let recommendedSkills = [];
    
    // Rule-based recommendation engine
    if (answers.q1 >= 3) { // High routine tasks
        recommendedSkills.push(
            findSkillByName(allSkills, "Creativity"),
            findSkillByName(allSkills, "Complex Problem Solving")
        );
    }
    
    if (answers.q4 >= 3) { // Low emotional intelligence needed
        recommendedSkills.push(
            findSkillByName(allSkills, "Emotional Intelligence"),
            findSkillByName(allSkills, "Active Listening")
        );
    }
    
    if (answers.q7 >= 3) { // Infrequent learning
        recommendedSkills.push(
            findSkillByName(allSkills, "Continuous Learning"),
            findSkillByName(allSkills, "Adaptability")
        );
    }
    
    // Add some general recommendations based on score
    if (score >= 30) { // High risk
        recommendedSkills.push(
            findSkillByName(allSkills, "Digital Literacy"),
            findSkillByName(allSkills, "Data Analysis")
        );
    } else {
        recommendedSkills.push(
            findSkillByName(allSkills, "Leadership"),
            findSkillByName(allSkills, "Strategic Thinking")
        );
    }
    
    // Remove duplicates and undefined values
    recommendedSkills = recommendedSkills.filter((skill, index, self) => 
        skill && index === self.findIndex((s) => s.name === skill.name)
    ).slice(0, 5); // Limit to 5 skills
    
    // Match companies based on recommended skills
    const matchedCompanies = [];
    const skillNames = recommendedSkills.map(skill => skill.name);
    
    allCompanies.forEach(company => {
        company.positions.forEach(position => {
            const matchingTraits = position.traits.filter(trait => 
                skillNames.includes(trait)
            );
            if (matchingTraits.length >= 2) {
                matchedCompanies.push({
                    company: company.name,
                    position: position.title,
                    traits: matchingTraits,
                    email: company.email,
                    location: company.location
                });
            }
        });
    });
    
    // Limit to 3 unique companies
    const uniqueCompanies = [];
    const companyNames = new Set();
    for (const company of matchedCompanies) {
        if (!companyNames.has(company.company)) {
            uniqueCompanies.push(company);
            companyNames.add(company.company);
            if (uniqueCompanies.length >= 3) break;
        }
    }
    
    return {
        skills: recommendedSkills,
        companies: uniqueCompanies
    };
}

function findSkillByName(skills, name) {
    return skills.find(skill => skill.name === name);
}

// Question navigation
document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.question-card');
    const progressBar = document.getElementById('progressBar');
    const currentQuestionDisplay = document.getElementById('currentQuestion');
    
    // Hide all questions except first
    questions.forEach((q, index) => {
        if (index !== 0) q.style.display = 'none';
    });
    
    // Update progress as user answers
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const currentVisibleIndex = Array.from(questions).findIndex(q => 
                q.style.display !== 'none'
            );
            
            if (currentVisibleIndex < questions.length - 1) {
                questions[currentVisibleIndex].style.display = 'none';
                questions[currentVisibleIndex + 1].style.display = 'block';
                
                // Update progress
                const progressPercent = ((currentVisibleIndex + 1) / questions.length) * 100;
                progressBar.style.width = `${progressPercent}%`;
                currentQuestionDisplay.textContent = currentVisibleIndex + 2;
            }
        });
    });
});
