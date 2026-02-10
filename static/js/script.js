
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. VARIABLES & SELECTORS
    // ==========================================
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const cameraInput = document.getElementById('camera-input');
    const previewArea = document.getElementById('preview-area');
    const imagePreview = document.getElementById('image-preview');
    const fileNameDisplay = document.getElementById('file-name');
    const removeBtn = document.getElementById('remove-image');
    const analyzeBtn = document.getElementById('analyze-btn');
    const loadingState = document.getElementById('loading-state');
    const resultsSection = document.getElementById('results-section');
    const uploadCard = document.getElementById('upload-card');

    let currentFile = null;

    // ==========================================
    // 2. EVENT LISTENERS
    // ==========================================

    // Trigger file input
    dropZone.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
            fileInput.click();
        }
    });

    // Drag & Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // File Input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });

    cameraInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFile(e.target.files[0]);
    });

    // Remove Image
    removeBtn.addEventListener('click', resetInterface);

    // Analyze Button
    analyzeBtn.addEventListener('click', analyzeImage);


    // ==========================================
    // 3. FUNCTIONS
    // ==========================================

    function handleFile(file) {
        // Validate type
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (JPG, PNG).');
            return;
        }

        currentFile = file;
        fileNameDisplay.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            showPreviewState();
        };
        reader.readAsDataURL(file);
    }

    function showPreviewState() {
        dropZone.classList.add('hidden');
        previewArea.classList.remove('hidden');
        loadingState.classList.add('hidden');
        resultsSection.classList.add('hidden');
        resultsSection.innerHTML = ''; // Clear previous results

        // Reset Analyze Button
        // Reset Analyze Button
        analyzeBtn.disabled = false;
        analyzeBtn.style.display = 'inline-flex'; // Force display
        analyzeBtn.innerHTML = '<i class="fa-solid fa-microscope"></i> Run Analysis';
    }

    function resetInterface() {
        currentFile = null;
        fileInput.value = '';
        cameraInput.value = '';
        imagePreview.src = '';

        dropZone.classList.remove('hidden');
        previewArea.classList.add('hidden');
        loadingState.classList.add('hidden');
        resultsSection.classList.add('hidden');
    }

    async function analyzeImage() {
        if (!currentFile) return;

        // UI State: Loading
        // NOTE: We hide the preview area temporarily to show loading, 
        // OR we can keep it and show loading below. 
        // Based on "upload-card" structure, loading-state is a sibling.
        // Let's hide previewArea to show loadingState as they likely occupy the same space.
        previewArea.classList.add('hidden');
        loadingState.classList.remove('hidden');

        const formData = new FormData();
        formData.append('file', currentFile);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Analysis failed');

            const data = await response.json();
            renderResults(data);

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during analysis. Please try again.');
            // Revert state
            loadingState.classList.add('hidden');
            previewArea.classList.remove('hidden');
        }
    }

    // ==========================================
    // 4. RENDERING RESULTS (CAROUSEL SLIDES)
    // ==========================================

    let currentSlideIndex = 0;

    function renderResults(data) {
        loadingState.classList.add('hidden');

        // CRITICAL FIX: Ensure the image preview appears again!
        previewArea.classList.remove('hidden');

        // Disable analyze button or change text to indicate completion
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<i class="fa-solid fa-check"></i> Analyzed';

        // Show Results Section
        resultsSection.classList.remove('hidden');

        // Determine Risk Colors
        let riskClass = 'risk-low';
        let riskIcon = 'fa-shield-check';
        const dangerLevel = (data.danger_level || '').toLowerCase();

        if (dangerLevel.includes('danger') && !dangerLevel.includes('not')) {
            riskClass = 'risk-high';
            riskIcon = 'fa-triangle-exclamation';
        } else if (dangerLevel.includes('semi')) {
            riskClass = 'risk-mid';
            riskIcon = 'fa-exclamation-circle';
        }

        // Generate Slides HTML
        const html = `
            <div class="result-slider-container">
                
                <!-- Slide 1: DIAGNOSIS OVERVIEW -->
                <div class="result-slide active-slide" data-index="0">
                    <div class="slide-header">
                        <span class="step-badge">Report 1/5</span>
                        <h3>Diagnosis Overview</h3>
                    </div>
                    <div class="slide-content centered">
                        <div class="diagnosis-ring ${riskClass}">
                            <i class="fa-solid ${riskIcon}"></i>
                        </div>
                        <h2 class="disease-title-lg">${data.disease}</h2>
                        
                        <div class="metric-grid">
                            <div class="metric-box">
                                <label>Confidence</label>
                                <strong>${data.confidence}%</strong>
                            </div>
                            <div class="metric-box">
                                <label>Severity</label>
                                <strong>${data.severity || 'Unknown'}</strong>
                            </div>
                        </div>

                        <div class="urgency-box">
                            <i class="fa-solid fa-bell"></i>
                            <p>${data.urgency || 'Monitor closely'}</p>
                        </div>
                    </div>
                </div>

                <!-- Slide 2: AI ANALYSIS -->
                <div class="result-slide" data-index="1">
                     <div class="slide-header">
                        <span class="step-badge">Report 2/5</span>
                        <h3>Clinical Analysis</h3>
                    </div>
                    <div class="slide-content">
                        <div class="info-group">
                            <h4><i class="fa-solid fa-microchip"></i> AI Pattern detection</h4>
                            <p>${data.ai_explanation || 'Pattern match found.'}</p>
                        </div>
                        <div class="info-group">
                            <h4><i class="fa-solid fa-notes-medical"></i> Risk Assessment</h4>
                            <p>${data.risk_explanation || 'Standard risk profile.'}</p>
                        </div>
                        <div class="info-group">
                            <h4><i class="fa-solid fa-arrow-trend-up"></i> Progression Stages</h4>
                            <ul class="stage-list">
                                ${(data.stages || '').split(';').map(s => `<li>${s.trim()}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Slide 3: TREATMENT OPTIONS -->
                <div class="result-slide" data-index="2">
                     <div class="slide-header">
                        <span class="step-badge">Report 3/5</span>
                        <h3>Treatment Protocol</h3>
                    </div>
                    <div class="slide-content split-view">
                        <div class="treatment-half organic">
                            <h4><i class="fa-solid fa-leaf"></i> Organic Care</h4>
                            <p>${data.organic_medicine}</p>
                            <small>Supportive care only</small>
                        </div>
                        <div class="treatment-half chemical">
                            <h4><i class="fa-solid fa-prescription-bottle"></i> Medical Options</h4>
                            <p>${data.chemical_medicine}</p>
                            <small>Consult a doctor</small>
                        </div>
                    </div>
                </div>

                <!-- Slide 4: CARE PLAN -->
                <div class="result-slide" data-index="3">
                     <div class="slide-header">
                        <span class="step-badge">Report 4/5</span>
                        <h3>Action Plan</h3>
                    </div>
                    <div class="slide-content">
                        <div class="action-card">
                            <h4><i class="fa-solid fa-clipboard-check"></i> Immediate Steps</h4>
                            <p>${data.care_plan}</p>
                        </div>
                        <div class="action-card">
                            <h4><i class="fa-solid fa-calendar-days"></i> Follow-up</h4>
                            <p>${data.follow_up}</p>
                        </div>
                    </div>
                </div>

                <!-- Slide 5: EDUCATION -->
                <div class="result-slide" data-index="4">
                     <div class="slide-header">
                        <span class="step-badge">Report 5/5</span>
                        <h3>Education & Privacy</h3>
                    </div>
                    <div class="slide-content">
                        <h4>About this Condition</h4>
                        <p>${data.education}</p>
                        
                        <div class="prevention-tip">
                            <strong><i class="fa-solid fa-shield-halved"></i> Prevention:</strong>
                            ${data.prevention}
                        </div>

                        <div class="privacy-notice">
                            <i class="fa-solid fa-lock"></i> ${data.privacy_note}
                        </div>
                    </div>
                </div>

                <!-- Navigation Controls -->
                <div class="slider-controls">
                    <button class="nav-btn" id="prev-slide" disabled>Back</button>
                    <div class="slide-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <button class="nav-btn primary" id="next-slide">Next</button>
                    <button class="nav-btn hidden mobile-finish" id="finish-btn-slide" onclick="document.getElementById('remove-image').click()">New Scan</button>
                </div>
            </div>
        `;

        resultsSection.innerHTML = html;
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Initialize Carousel Logic
        initCarousel();
    }

    function initCarousel() {
        const slides = document.querySelectorAll('.result-slide');
        const dots = document.querySelectorAll('.dot');
        const nextBtn = document.getElementById('next-slide');
        const prevBtn = document.getElementById('prev-slide');
        const finishBtn = document.getElementById('finish-btn-slide');

        currentSlideIndex = 0;

        function updateSlide(index) {
            slides.forEach(s => s.classList.remove('active-slide'));
            dots.forEach(d => d.classList.remove('active'));

            slides[index].classList.add('active-slide');
            dots[index].classList.add('active');

            // Button State
            prevBtn.disabled = index === 0;

            if (index === slides.length - 1) {
                nextBtn.classList.add('hidden');
                finishBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                finishBtn.classList.add('hidden');
            }
        }

        nextBtn.addEventListener('click', () => {
            if (currentSlideIndex < slides.length - 1) {
                currentSlideIndex++;
                updateSlide(currentSlideIndex);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                updateSlide(currentSlideIndex);
            }
        });
    }

});
