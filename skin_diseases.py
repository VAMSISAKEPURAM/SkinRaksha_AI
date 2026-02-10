skin_diseases = {

    'Acne': {
        'danger_level': 'Not danger',
        'severity': 'Mild to Moderate',
        'urgency': 'Non-urgent medical attention if persistent',
        'ai_explanation': 'The AI identified clogged pores, inflamed follicles, and surface lesions consistent with Acne.',
        'risk_explanation': 'Acne is not life-threatening but may cause scarring and psychological distress if untreated.',
        'stages': 'Early: whiteheads and blackheads; Moderate: inflamed pimples; Severe: cysts and nodules with scarring risk.',
        'organic_medicine': 'Aloe vera for inflammation, tea tree oil (diluted), proper skin hygiene, balanced low-sugar diet.',
        'chemical_medicine': 'Topical retinoids, benzoyl peroxide, topical or oral antibiotics under dermatologist guidance.',
        'care_plan': 'Clean face twice daily, avoid picking lesions, follow prescribed treatment consistently.',
        'follow_up': 'Track improvement over weeks and upload follow-up images if condition worsens.',
        'education': 'Acne is a common skin condition caused by blocked hair follicles and excess oil production.',
        'prevention': 'Regular cleansing, non-comedogenic products, stress management.',
        'privacy_note': 'Uploaded images are processed securely and not stored.'
    },

    'Actinic Keratosis': {
        'danger_level': 'Danger',
        'severity': 'Moderate to Severe',
        'urgency': 'Prompt dermatologist consultation recommended',
        'ai_explanation': 'The AI detected rough, scaly lesions commonly associated with sun-damaged skin.',
        'risk_explanation': 'Actinic Keratosis may progress to squamous cell carcinoma if untreated.',
        'stages': 'Early: rough scaly patch; Progressive: thickened lesion; Advanced: cancerous transformation risk.',
        'organic_medicine': 'Antioxidant-rich diet, green tea extract, sun protection measures.',
        'chemical_medicine': 'Cryotherapy, topical 5-fluorouracil, imiquimod, photodynamic therapy.',
        'care_plan': 'Avoid sun exposure, use sunscreen daily, attend regular skin checks.',
        'follow_up': 'Monitor lesion changes and seek follow-up evaluation.',
        'education': 'A precancerous condition caused by long-term sun exposure.',
        'prevention': 'Sun protection, protective clothing, regular skin exams.',
        'privacy_note': 'Images are analyzed securely and not retained.'
    },

    'Basal Cell Carcinoma': {
        'danger_level': 'Danger',
        'severity': 'Severe',
        'urgency': 'Immediate medical attention recommended',
        'ai_explanation': 'The AI identified pearly lesions and abnormal growth patterns consistent with basal cell carcinoma.',
        'risk_explanation': 'This cancer grows slowly but can cause significant local tissue damage.',
        'stages': 'Early: small shiny lesion; Intermediate: tissue invasion; Advanced: deeper structural damage.',
        'organic_medicine': 'Supportive care only; organic remedies cannot cure cancer.',
        'chemical_medicine': 'Surgical excision, Mohs surgery, radiation therapy in select cases.',
        'care_plan': 'Seek dermatologist care immediately and follow treatment plan.',
        'follow_up': 'Regular post-treatment monitoring for recurrence.',
        'education': 'A common form of skin cancer caused by prolonged UV exposure.',
        'prevention': 'Sun protection and early lesion evaluation.',
        'privacy_note': 'No images are stored or shared.'
    },

    'Chickenpox': {
        'danger_level': 'Semi-danger',
        'severity': 'Moderate',
        'urgency': 'Medical attention if complications arise',
        'ai_explanation': 'The AI recognized widespread vesicular rashes typical of Chickenpox.',
        'risk_explanation': 'Generally mild in children but may cause serious complications in adults.',
        'stages': 'Initial fever; Active blister stage; Healing with scab formation.',
        'organic_medicine': 'Oatmeal baths, neem baths, hydration, rest.',
        'chemical_medicine': 'Antihistamines, antivirals like acyclovir in severe cases.',
        'care_plan': 'Isolate until recovery, avoid scratching lesions.',
        'follow_up': 'Seek care if fever persists or breathing difficulty occurs.',
        'education': 'A contagious viral infection caused by varicella-zoster virus.',
        'prevention': 'Vaccination and hygiene.',
        'privacy_note': 'All data processed securely.'
    },

    'Dermato Fibroma': {
        'danger_level': 'Not danger',
        'severity': 'Mild',
        'urgency': 'No urgent care required',
        'ai_explanation': 'The AI detected a stable benign nodule with characteristic firmness.',
        'risk_explanation': 'Dermatofibroma is harmless and non-cancerous.',
        'stages': 'Stable benign lesion with no progression.',
        'organic_medicine': 'No treatment required.',
        'chemical_medicine': 'Surgical removal only if symptomatic or cosmetic concern.',
        'care_plan': 'Observe for changes.',
        'follow_up': 'Consult dermatologist if growth or pain occurs.',
        'education': 'A common benign skin growth.',
        'prevention': 'No prevention necessary.',
        'privacy_note': 'Images are not stored.'
    },

    'Dyshidrotic Eczema': {
        'danger_level': 'Semi-danger',
        'severity': 'Moderate',
        'urgency': 'Dermatologist consultation if recurrent',
        'ai_explanation': 'The AI identified small fluid-filled blisters on palms and soles.',
        'risk_explanation': 'Chronic eczema may cause discomfort and skin thickening.',
        'stages': 'Acute blistering; Recurrent flares; Chronic skin thickening.',
        'organic_medicine': 'Cold compress, coconut oil, oatmeal soaks.',
        'chemical_medicine': 'Topical corticosteroids, calcineurin inhibitors.',
        'care_plan': 'Avoid triggers, moisturize regularly.',
        'follow_up': 'Track flare frequency.',
        'education': 'A type of eczema affecting hands and feet.',
        'prevention': 'Stress management and allergen avoidance.',
        'privacy_note': 'Secure processing ensured.'
    },

    'Melanoma': {
        'danger_level': 'Danger',
        'severity': 'Severe',
        'urgency': 'Immediate medical attention required',
        'ai_explanation': 'The AI detected irregular borders, uneven pigmentation, and asymmetry associated with Melanoma.',
        'risk_explanation': 'Melanoma can spread rapidly and become life-threatening if untreated.',
        'stages': 'Stage 1: localized; Stage 2: deeper invasion; Stage 3: lymph node spread; Stage 4: distant metastasis.',
        'organic_medicine': 'Supportive care only; not a cure.',
        'chemical_medicine': 'Surgical excision, immunotherapy, targeted therapy, radiation therapy.',
        'care_plan': 'Immediate dermatologist consultation; strict sun avoidance.',
        'follow_up': 'Post-treatment monitoring and follow-up imaging.',
        'education': 'A serious form of skin cancer originating from pigment cells.',
        'prevention': 'Sun protection and regular skin self-exams.',
        'privacy_note': 'Images are processed securely and not stored.'
    },

    'Nail Fungus': {
        'danger_level': 'Semi-danger',
        'severity': 'Mild to Moderate',
        'urgency': 'Medical care if persistent',
        'ai_explanation': 'The AI identified discoloration and thickened nail structures.',
        'risk_explanation': 'Untreated infections may cause pain and secondary infection.',
        'stages': 'Early discoloration; Progressive thickening; Nail deformity.',
        'organic_medicine': 'Tea tree oil, vinegar soaks, foot hygiene.',
        'chemical_medicine': 'Topical or oral antifungals.',
        'care_plan': 'Keep nails clean and dry.',
        'follow_up': 'Track nail appearance over time.',
        'education': 'A fungal infection of nails.',
        'prevention': 'Foot hygiene and breathable footwear.',
        'privacy_note': 'Secure image handling.'
    },

    'Nevus': {
        'danger_level': 'Not danger',
        'severity': 'Mild',
        'urgency': 'Routine monitoring',
        'ai_explanation': 'The AI identified a stable pigmented mole.',
        'risk_explanation': 'Most nevi are benign but require monitoring.',
        'stages': 'Stable mole; rare malignant change.',
        'organic_medicine': 'No treatment required.',
        'chemical_medicine': 'Removal if suspicious changes occur.',
        'care_plan': 'Monitor size, color, and shape.',
        'follow_up': 'Dermatology check if changes noted.',
        'education': 'A common pigmented skin lesion.',
        'prevention': 'Sun protection.',
        'privacy_note': 'No image storage.'
    },

    'Normal Skin': {
        'danger_level': 'Not danger',
        'severity': 'None',
        'urgency': 'No action required',
        'ai_explanation': 'The AI detected normal skin texture and pigmentation.',
        'risk_explanation': 'No disease detected.',
        'stages': 'Healthy skin condition.',
        'organic_medicine': 'Balanced diet, hydration.',
        'chemical_medicine': 'None required.',
        'care_plan': 'Maintain skin hygiene.',
        'follow_up': 'Routine self-care.',
        'education': 'Normal healthy skin.',
        'prevention': 'Sun protection and skincare.',
        'privacy_note': 'Images are not retained.'
    },

    'Pigmented Benign Keratosis': {
        'danger_level': 'Not danger',
        'severity': 'Mild',
        'urgency': 'No urgent care required',
        'ai_explanation': 'The AI identified benign pigmented growth patterns.',
        'risk_explanation': 'Harmless growth with no cancer risk.',
        'stages': 'Stable benign lesion.',
        'organic_medicine': 'No treatment needed.',
        'chemical_medicine': 'Removal if cosmetic concern.',
        'care_plan': 'Observe changes.',
        'follow_up': 'Consult if lesion changes.',
        'education': 'A benign skin growth.',
        'prevention': 'None specific.',
        'privacy_note': 'Secure processing.'
    },

    'Ringworm': {
        'danger_level': 'Not danger',
        'severity': 'Mild to Moderate',
        'urgency': 'Medical attention if spreading',
        'ai_explanation': 'The AI detected circular rashes with central clearing.',
        'risk_explanation': 'Contagious but easily treatable.',
        'stages': 'Initial rash; spreading lesions; resolution with treatment.',
        'organic_medicine': 'Turmeric paste, garlic extract.',
        'chemical_medicine': 'Topical antifungal creams.',
        'care_plan': 'Keep area dry and clean.',
        'follow_up': 'Monitor spread.',
        'education': 'A fungal skin infection.',
        'prevention': 'Hygiene and avoiding shared items.',
        'privacy_note': 'No data retention.'
    },

    'Seborrheic Keratosis': {
        'danger_level': 'Not danger',
        'severity': 'Mild',
        'urgency': 'No urgent care required',
        'ai_explanation': 'The AI identified waxy, stuck-on appearing lesions.',
        'risk_explanation': 'Benign and non-cancerous.',
        'stages': 'Stable benign growth.',
        'organic_medicine': 'No treatment needed.',
        'chemical_medicine': 'Cryotherapy or removal if required.',
        'care_plan': 'Routine monitoring.',
        'follow_up': 'Consult if changes occur.',
        'education': 'A common benign skin growth.',
        'prevention': 'None required.',
        'privacy_note': 'Secure image handling.'
    },

    'Squamous Cell Carcinoma': {
        'danger_level': 'Danger',
        'severity': 'Severe',
        'urgency': 'Immediate medical attention recommended',
        'ai_explanation': 'The AI identified scaly lesions with invasive characteristics.',
        'risk_explanation': 'Can metastasize if untreated.',
        'stages': 'Early localized lesion; invasive growth; metastasis risk.',
        'organic_medicine': 'Supportive care only.',
        'chemical_medicine': 'Surgical excision, radiation therapy, chemotherapy.',
        'care_plan': 'Immediate dermatologist consultation.',
        'follow_up': 'Post-treatment monitoring.',
        'education': 'A common skin cancer linked to sun exposure.',
        'prevention': 'Sun protection.',
        'privacy_note': 'Images are not stored.'
    },

    'Vascular Lesion': {
        'danger_level': 'Semi-danger',
        'severity': 'Mild to Moderate',
        'urgency': 'Medical consultation if enlarging',
        'ai_explanation': 'The AI detected abnormal blood vessel patterns.',
        'risk_explanation': 'Usually benign but may bleed or enlarge.',
        'stages': 'Stable or slowly enlarging lesion.',
        'organic_medicine': 'Aloe vera for skin soothing.',
        'chemical_medicine': 'Laser therapy, sclerotherapy.',
        'care_plan': 'Avoid trauma to area.',
        'follow_up': 'Monitor size and color.',
        'education': 'A lesion involving blood vessels.',
        'prevention': 'Protect skin from injury.',
        'privacy_note': 'Secure processing ensured.'
    }

}
