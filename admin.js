document.addEventListener('DOMContentLoaded', function() {
    // Check admin auth
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.isAdmin) {
        window.location.href = 'index.html';
        return;
    }
    
    // Load companies data
    displayCompanies();
    displaySkills();
    
    // Add skill form handler
    document.getElementById('addSkillForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const skillData = {
            name: document.getElementById('skillName').value,
            category: document.getElementById('skillCategory').value,
            resources: document.getElementById('skillResources').value.split('\n').filter(r => r.trim())
        };
        
        if (!skillData.name || !skillData.category || skillData.resources.length === 0) {
            alert('Please fill all fields');
            return;
        }
        
        const skills = JSON.parse(localStorage.getItem('skills')) || [];
        skills.push(skillData);
        localStorage.setItem('skills', JSON.stringify(skills));
        
        alert('Skill added successfully!');
        this.reset();
        displaySkills();
    });
});

function displayCompanies() {
    const companies = JSON.parse(localStorage.getItem('companies')) || [];
    const tbody = document.querySelector('#companiesTable tbody');
    tbody.innerHTML = '';
    
    companies.forEach((company, index) => {
        const row = document.createElement('tr');
        row.style.animation = 'fadeIn 0.3s ease-out';
        
        row.innerHTML = `
            <td>${company.name}</td>
            <td>${company.email}</td>
            <td>${company.location}</td>
            <td>${company.positions.length}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteCompany(${index})">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function displaySkills() {
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    const tbody = document.querySelector('#skillsTable tbody');
    tbody.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const row = document.createElement('tr');
        row.style.animation = 'fadeIn 0.3s ease-out';
        
        row.innerHTML = `
            <td>${skill.name}</td>
            <td>${skill.category}</td>
            <td>${skill.resources.length}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteSkill(${index})">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Global functions for delete buttons
window.deleteCompany = function(index) {
    if (confirm('Are you sure you want to delete this company?')) {
        const companies = JSON.parse(localStorage.getItem('companies')) || [];
        companies.splice(index, 1);
        localStorage.setItem('companies', JSON.stringify(companies));
        displayCompanies();
    }
};

window.deleteSkill = function(index) {
    if (confirm('Are you sure you want to delete this skill?')) {
        const skills = JSON.parse(localStorage.getItem('skills')) || [];
        skills.splice(index, 1);
        localStorage.setItem('skills', JSON.stringify(skills));
        displaySkills();
    }
};

// Tab navigation
document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active tab
        document.querySelector('.sidebar-nav a.active').classList.remove('active');
        this.classList.add('active');
        
        // Show corresponding section
        const section = this.getAttribute('data-section');
        document.querySelectorAll('main section').forEach(sec => {
            sec.style.display = 'none';
        });
        document.getElementById(`${section}Section`).style.display = 'block';
    });
});

// Logout function
window.logout = function() {
    logout();
};
