const questInput = document.getElementById('new-quest');
        const addBtn = document.getElementById('add-btn');
        const questList = document.getElementById('quest-list');
        const heroContainer = document.getElementById('hero-container');
        const progressBar = document.getElementById('progress-bar');
        const expDisplay = document.getElementById('exp-display');
        const levelDisplay = document.getElementById('level-display');
        const colorBtn = document.getElementById('color-btn'); // Select the new button

        let quests = [];
        
        // Array of cool neon hex colors
        const skins = ['#66fcf1', '#39ff14', '#ff00ff', '#ffd700', '#ff073a'];
        let currentSkinIndex = 0;

        // Function to cycle through colors
        function changeSkin() {
            currentSkinIndex++;
            if (currentSkinIndex >= skins.length) currentSkinIndex = 0; // Loop back to start
            
            // This magic line updates the CSS variable globally!
            document.documentElement.style.setProperty('--accent-cyan', skins[currentSkinIndex]);
        }

        function addQuest() {
            const text = questInput.value.trim();
            if (!text) return;
            quests.push({ id: Date.now(), text: text, completed: false });
            questInput.value = ''; 
            updateDashboard(); 
        }

        function toggleQuest(id) {
            const quest = quests.find(q => q.id === id);
            if (quest) {
                quest.completed = !quest.completed;
                updateDashboard(); 
            }
        }

        function updateDashboard() {
            questList.innerHTML = '';
            let completedCount = 0;

            quests.forEach(quest => {
                if (quest.completed) completedCount++;

                const li = document.createElement('li');
                if (quest.completed) li.className = 'completed';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = quest.completed;
                checkbox.onchange = () => toggleQuest(quest.id);

                const span = document.createElement('span');
                span.textContent = quest.text;

                li.appendChild(checkbox);
                li.appendChild(span);
                questList.appendChild(li);
            });

            const total = quests.length;
            const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);
            progressBar.style.width = `${progress}%`;
            expDisplay.textContent = `${progress}%`;
            levelDisplay.textContent = completedCount;

            heroContainer.innerHTML = ''; 

            const bodyPartsOrder = ['head', 'torso', 'left-arm', 'right-arm', 'left-leg', 'right-leg', 'aura'];

            // Calculate how many parts to show based on percentage completed
            const percentDone = total === 0 ? 0 : (completedCount / total);
            // Multiply the percentage by the 7 total body parts
            const partsToShow = Math.floor(percentDone * bodyPartsOrder.length);

            for (let i = 0; i < partsToShow; i++) {
                const partDiv = document.createElement('div');
                partDiv.className = `part ${bodyPartsOrder[i]}`;
                heroContainer.appendChild(partDiv);
}

            // NEW: Show or hide the color button based on completion
            // If total quests is greater than 0 AND every quest is done...
            if (total > 0 && completedCount === total) {
                colorBtn.classList.remove('hidden');
            } else {
                colorBtn.classList.add('hidden');
            }
        }

        addBtn.addEventListener('click', addQuest);
        questInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addQuest();
        });
        
        // NEW: Event listener for the color button
        colorBtn.addEventListener('click', changeSkin);

        updateDashboard();