document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const cameraInput = document.getElementById('camera-input');
    const previewArea = document.getElementById('preview-area');
    const imagePreview = document.getElementById('image-preview');
    const removeBtn = document.getElementById('remove-image');
    const analyzeBtn = document.getElementById('analyze-btn');
    const fileNameDisplay = document.getElementById('file-name');
    const loadingState = document.getElementById('loading-state');
    const resultsSection = document.getElementById('results-section');
    const uploadArea = document.querySelector('.upload-area');

    let currentFile = null;

    // ==========================================
    // 1. EVENT LISTENERS
    // ==========================================

    // Drag & Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', handleDrop, false);

    // File Selections (File Picker & Camera)
    fileInput.addEventListener('change', function () { handleFiles(this.files); });
    cameraInput.addEventListener('change', function () { handleFiles(this.files); });

    // Buttons
    removeBtn.addEventListener('click', resetInterface);
    analyzeBtn.addEventListener('click', uploadAndAnalyze);

    // ==========================================
    // 2. FILE HANDLING
    // ==========================================

    function handleDrop(e) {
        const dt = e.dataTransfer;
        handleFiles(dt.files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (validateFile(file)) {
                currentFile = file;
                showPreview(file);
            }
        }
    }

    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('Invalid file format. Please upload JPG or PNG images.');
            return false;
        }
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('File is too large. Maximum size is 10MB.');
            return false;
        }
        return true;
    }

    function showPreview(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            imagePreview.src = reader.result;
            fileNameDisplay.textContent = file.name;

            // Switch view
            uploadArea.classList.add('hidden');
            previewArea.classList.remove('hidden');
            resultsSection.classList.add('hidden'); // Hide previous results if any
        };
    }

    function resetInterface() {
        currentFile = null;
        fileInput.value = '';
        cameraInput.value = '';
        imagePreview.src = '';

        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        resultsSection.classList.add('hidden');
        loadingState.classList.add('hidden');

        // Reset Button
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('hidden');
        analyzeBtn.style.display = 'inline-flex';
        analyzeBtn.innerHTML = '<i class="fa-solid fa-microscope"></i> Run Analysis';
    }

    // ==========================================
    // 3. API & ANALYSIS
    // ==========================================

    async function uploadAndAnalyze() {
        if (!currentFile) return;

        // UI State: Loading
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
                    <button class="nav-btn hidden" id="finish-btn" onclick="document.getElementById('remove-image').click()">New Scan</button>
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
        const finishBtn = document.getElementById('finish-btn');

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