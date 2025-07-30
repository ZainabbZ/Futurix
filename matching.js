document.addEventListener('DOMContentLoaded', function() {
    // Retrieve results from sessionStorage
    const riskPercentage = sessionStorage.getItem('riskPercentage') || 0;
    const recommendations = JSON.parse(sessionStorage.getItem('recommendations')) || { 
        skills: [], 
        companies: [] 
    };
    
    // Display user info
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData) {
        document.getElementById('userInfo').innerHTML = `
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Current Role:</strong> ${userData.currentJob}</p>
        `;
    }
    
    // Display risk percentage
    document.getElementById('riskPercentage').textContent = riskPercentage;
    
    // Position risk indicator on meter
    const riskIndicator = document.getElementById('riskIndicator');
    riskIndicator.style.left = `${riskPercentage}%`;
    
    // Add risk level text
    let riskLevel = '';
    let riskColor = '';
    if (riskPercentage >= 70) {
        riskLevel = 'High Risk';
        riskColor = 'var(--danger)';
    } else if (riskPercentage >= 40) {
        riskLevel = 'Moderate Risk';
        riskColor = 'var(--warning)';
    } else {
        riskLevel = 'Low Risk';
        riskColor = 'var(--success)';
    }
    
    document.getElementById('riskLevel').textContent = riskLevel;
    document.getElementById('riskLevel').style.color = riskColor;
    
    // Display recommended skills
    const skillsContainer = document.getElementById('skillRecommendations');
    if (recommendations.skills.length > 0) {
        recommendations.skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.style.animation = 'fadeIn 0.5s ease-out';
            
            let resourcesHTML = skill.resources.map(resource => 
                `<a href="${resource}" class="resource-link" target="_blank">${resource}</a>`
            ).join('<br>');
            
            skillCard.innerHTML = `
                <h4>${skill.name}</h4>
                <p><strong>Category:</strong> ${skill.category || 'General'}</p>
                <p><strong>Resources:</strong></p>
                <div>${resourcesHTML}</div>
            `;
            
            skillsContainer.appendChild(skillCard);
        });
    } else {
        skillsContainer.innerHTML = '<p>No skill recommendations available.</p>';
    }
    
    // Display company matches
    const companiesContainer = document.getElementById('companyMatches');
    if (recommendations.companies.length > 0) {
        recommendations.companies.forEach(company => {
            const companyCard = document.createElement('div');
            companyCard.className = 'company-card';
            companyCard.style.animation = 'fadeIn 0.5s ease-out';
            
            companyCard.innerHTML = `
                <h4>${company.company}</h4>
                <p><strong>Position:</strong> ${company.position}</p>
                <p><strong>Location:</strong> ${company.location}</p>
                <p><strong>Matching Traits:</strong> ${company.traits.join(', ')}</p>
                <p><strong>Contact:</strong> <a href="mailto:${company.email}">${company.email}</a></p>
            `;
            
            companiesContainer.appendChild(companyCard);
        });
    } else {
        companiesContainer.innerHTML = '<p>No company matches found based on your profile. Try expanding your skill set.</p>';
    }
});
