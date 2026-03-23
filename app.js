// ============================================================
// EQUIVALENT DOSES - Clinical Dose Converter
// By PharmD Abdulaziz Alshareef
// ============================================================

// — DRUG DATABASE —
var DB = {
“Hypertension”: { classes: {
“ARBs”: { ref:“Losartan”, unit:“mg”, note:“Losartan 50 \u2248 Valsartan 80 \u2248 Telmisartan 40 \u2248 Irbesartan 150 \u2248 Candesartan 8 \u2248 Olmesartan 20 \u2248 Azilsartan 40.”, drugs: {
“Losartan”:{s:[25,50,100],f:1},“Valsartan”:{s:[40,80,160,320],f:1.6},“Telmisartan”:{s:[20,40,80],f:0.8},“Irbesartan”:{s:[75,150,300],f:3},“Candesartan”:{s:[4,8,16,32],f:0.16},“Olmesartan”:{s:[10,20,40],f:0.4},“Azilsartan”:{s:[20,40,80],f:0.8},“Eprosartan”:{s:[400,600],f:12}
}},
“ACE Inhibitors”: { ref:“Enalapril”, unit:“mg”, note:“Enalapril 10 \u2248 Lisinopril 10 \u2248 Ramipril 5 \u2248 Perindopril 4 \u2248 Captopril 50.”, drugs: {
“Enalapril”:{s:[2.5,5,10,20],f:1},“Lisinopril”:{s:[2.5,5,10,20,40],f:1},“Ramipril”:{s:[1.25,2.5,5,10],f:0.5},“Perindopril”:{s:[2,4,8],f:0.4},“Captopril”:{s:[12.5,25,50,100],f:5},“Quinapril”:{s:[5,10,20,40],f:1},“Benazepril”:{s:[5,10,20,40],f:1},“Fosinopril”:{s:[10,20],f:1},“Trandolapril”:{s:[1,2,4],f:0.2}
}},
“CCBs \u2014 Dihydropyridine”: { ref:“Amlodipine”, unit:“mg”, note:“Amlodipine 5 \u2248 Nifedipine MR 30 \u2248 Felodipine 5 \u2248 Lercanidipine 10.”, drugs: {
“Amlodipine”:{s:[2.5,5,10],f:1},“Nifedipine MR”:{s:[20,30,60],f:6},“Felodipine”:{s:[2.5,5,10],f:1},“Lercanidipine”:{s:[10,20],f:2},“Lacidipine”:{s:[2,4,6],f:0.8},“Nisoldipine”:{s:[10,17,20,30,40],f:3.4},“Isradipine”:{s:[2.5,5],f:0.5}
}},
“CCBs \u2014 Non-Dihydropyridine”: { ref:“Diltiazem SR”, unit:“mg”, note:“Within-class comparison only.”, drugs: {
“Diltiazem SR”:{s:[90,120,180,240,360],f:1},“Verapamil SR”:{s:[120,180,240,360],f:1}
}},
“Beta Blockers”: { ref:“Bisoprolol”, unit:“mg”, note:“Bisoprolol 5 \u2248 Atenolol 50 \u2248 Metoprolol 100 \u2248 Carvedilol 25 \u2248 Nebivolol 5 \u2248 Propranolol 80.”, drugs: {
“Bisoprolol”:{s:[1.25,2.5,5,10],f:1},“Atenolol”:{s:[25,50,100],f:10},“Metoprolol”:{s:[25,50,100,200],f:20},“Carvedilol”:{s:[3.125,6.25,12.5,25],f:5},“Nebivolol”:{s:[1.25,2.5,5,10],f:1},“Propranolol”:{s:[10,20,40,80,160],f:16},“Labetalol”:{s:[100,200,300],f:40},“Acebutolol”:{s:[200,400],f:40}
}},
“Thiazide & Thiazide-Like”: { ref:“Hydrochlorothiazide”, unit:“mg”, note:“HCTZ 25 \u2248 Chlorthalidone 12.5 \u2248 Indapamide 1.25.”, drugs: {
“Hydrochlorothiazide”:{s:[12.5,25,50],f:1},“Chlorthalidone”:{s:[12.5,25,50],f:0.5},“Indapamide”:{s:[1.25,2.5],f:0.05},“Metolazone”:{s:[2.5,5,10],f:0.2}
}},
“Loop Diuretics”: { ref:“Furosemide”, unit:“mg”, note:“Furosemide 40 \u2248 Bumetanide 1 \u2248 Torasemide 20.”, drugs: {
“Furosemide”:{s:[20,40,80,250,500],f:1},“Bumetanide”:{s:[0.5,1,2,5],f:0.025},“Torasemide”:{s:[5,10,20,100],f:0.5}
}},
“MRAs / K+-Sparing”: { ref:“Spironolactone”, unit:“mg”, note:“Spironolactone 25 \u2248 Eplerenone 50.”, drugs: {
“Spironolactone”:{s:[12.5,25,50,100],f:1},“Eplerenone”:{s:[25,50],f:2}
}}
}},
“Pain Management”: { classes: {
“Opioid Analgesics (Oral)”: { ref:“Morphine (oral)”, unit:“mg”, note:“CDC MME: Morphine 30 \u2248 Oxycodone 20 \u2248 Hydromorphone 6 \u2248 Codeine 200 \u2248 Tramadol 300.”, drugs: {
“Morphine (oral)”:{s:[10,15,30,60,100],f:1},“Oxycodone”:{s:[5,10,15,20,40],f:0.667},“Hydromorphone”:{s:[2,4,8],f:0.2},“Tramadol”:{s:[50,100,150,200],f:10},“Codeine”:{s:[15,30,60],f:6.67},“Tapentadol”:{s:[50,75,100],f:2.5},“Meperidine (Pethidine)”:{s:[50,100],f:10}
}},
“NSAIDs”: { ref:“Ibuprofen”, unit:“mg”, note:“Ibuprofen 400 \u2248 Naproxen 250 \u2248 Diclofenac 50 \u2248 Meloxicam 7.5 \u2248 Celecoxib 200.”, drugs: {
“Ibuprofen”:{s:[200,400,600,800],f:1},“Naproxen”:{s:[250,375,500],f:0.625},“Diclofenac”:{s:[25,50,75,100],f:0.125},“Celecoxib”:{s:[100,200,400],f:0.5},“Meloxicam”:{s:[7.5,15],f:0.01875},“Indomethacin”:{s:[25,50,75],f:0.0625},“Piroxicam”:{s:[10,20],f:0.025},“Ketoprofen”:{s:[50,75,100,200],f:0.25},“Etoricoxib”:{s:[30,60,90,120],f:0.15},“Mefenamic Acid”:{s:[250,500],f:0.625},“Flurbiprofen”:{s:[50,100],f:0.125}
}},
“Triptans (Migraine)”: { ref:“Sumatriptan”, unit:“mg”, note:“Sumatriptan 50 \u2248 Rizatriptan 10 \u2248 Zolmitriptan 2.5 \u2248 Eletriptan 40.”, drugs: {
“Sumatriptan”:{s:[25,50,100],f:1},“Rizatriptan”:{s:[5,10],f:0.2},“Zolmitriptan”:{s:[2.5,5],f:0.05},“Eletriptan”:{s:[20,40,80],f:0.8},“Naratriptan”:{s:[1,2.5],f:0.05},“Almotriptan”:{s:[6.25,12.5],f:0.25},“Frovatriptan”:{s:[2.5],f:0.05}
}},
“Paracetamol / Acetaminophen”: { ref:“Paracetamol”, unit:“mg”, note:“Same molecule, different regional names.”, drugs: {
“Paracetamol”:{s:[325,500,650,1000],f:1},“Acetaminophen”:{s:[325,500,650,1000],f:1}
}}
}},
“Asthma / COPD”: { classes: {
“Inhaled Corticosteroids (ICS)”: { ref:“Beclometasone”, unit:“mcg/day”, note:“GINA 2024: BDP 200 \u2248 Budesonide 200 \u2248 Fluticasone propionate 100 \u2248 Ciclesonide 80 \u2248 Mometasone 100.”, drugs: {
“Beclometasone”:{s:[100,200,400,800],f:1},“Budesonide”:{s:[100,200,400,800],f:1},“Fluticasone Propionate”:{s:[50,100,125,250,500],f:0.5},“Fluticasone Furoate”:{s:[50,100,200],f:0.5},“Ciclesonide”:{s:[80,160,320],f:0.4},“Mometasone Furoate”:{s:[100,200,400],f:0.5}
}},
“LABA”: { ref:“Salmeterol”, unit:“mcg”, note:“Salmeterol 50 \u2248 Formoterol 12 \u2248 Indacaterol 150.”, drugs: {
“Salmeterol”:{s:[25,50],f:1},“Formoterol”:{s:[6,12,24],f:0.24},“Indacaterol”:{s:[75,150,300],f:3},“Olodaterol”:{s:[2.5,5],f:0.1},“Vilanterol”:{s:[22,25],f:0.5}
}},
“LAMA”: { ref:“Tiotropium (HandiHaler)”, unit:“mcg”, note:“Tiotropium 18 HH \u2248 Glycopyrronium 50 \u2248 Umeclidinium 62.5.”, drugs: {
“Tiotropium (HandiHaler)”:{s:[18],f:1},“Tiotropium (Respimat)”:{s:[2.5,5],f:0.278},“Glycopyrronium”:{s:[50],f:2.78},“Umeclidinium”:{s:[62.5],f:3.47},“Aclidinium”:{s:[322,400],f:17.9}
}},
“SABA”: { ref:“Salbutamol (Albuterol)”, unit:“mcg/puff”, note:“Salbutamol 100 \u2248 Terbutaline 250 \u2248 Levalbuterol 45.”, drugs: {
“Salbutamol (Albuterol)”:{s:[100,200],f:1},“Levalbuterol”:{s:[45,90],f:0.45},“Terbutaline”:{s:[250,500],f:2.5}
}},
“Leukotriene Modifiers”: { ref:“Montelukast”, unit:“mg”, note:“Montelukast 10mg OD \u2248 Zafirlukast 20mg BID.”, drugs: {
“Montelukast”:{s:[4,5,10],f:1},“Zafirlukast”:{s:[10,20],f:2}
}}
}},
“Dyslipidaemia”: { classes: {
“Statins”: { ref:“Atorvastatin”, unit:“mg”, note:“Atorvastatin 10 \u2248 Rosuvastatin 5 \u2248 Simvastatin 20 \u2248 Pravastatin 40 \u2248 Fluvastatin 80 \u2248 Pitavastatin 2 \u2248 Lovastatin 20.”, drugs: {
“Atorvastatin”:{s:[10,20,40,80],f:1},“Rosuvastatin”:{s:[5,10,20,40],f:0.5},“Simvastatin”:{s:[10,20,40,80],f:2},“Pravastatin”:{s:[10,20,40,80],f:4},“Fluvastatin”:{s:[20,40,80],f:8},“Pitavastatin”:{s:[1,2,4],f:0.2},“Lovastatin”:{s:[10,20,40],f:2}
}},
“Fibrates”: { ref:“Fenofibrate”, unit:“mg”, note:“Fenofibrate 160 \u2248 Bezafibrate 400 \u2248 Gemfibrozil 1200.”, drugs: {
“Fenofibrate”:{s:[48,145,160,200],f:1},“Bezafibrate”:{s:[200,400],f:2.5},“Gemfibrozil”:{s:[300,600,1200],f:7.5}
}}
}},
“Depression / Anxiety”: { classes: {
“SSRIs”: { ref:“Fluoxetine”, unit:“mg”, note:“Fluoxetine 20 \u2248 Sertraline 50 \u2248 Paroxetine 20 \u2248 Citalopram 20 \u2248 Escitalopram 10 \u2248 Fluvoxamine 100.”, drugs: {
“Fluoxetine”:{s:[10,20,40,60],f:1},“Sertraline”:{s:[25,50,100,200],f:2.5},“Paroxetine”:{s:[10,20,30,40],f:1},“Citalopram”:{s:[10,20,40],f:1},“Escitalopram”:{s:[5,10,15,20],f:0.5},“Fluvoxamine”:{s:[50,100,150,200],f:5}
}},
“SNRIs”: { ref:“Venlafaxine”, unit:“mg”, note:“Venlafaxine 150 \u2248 Duloxetine 60 \u2248 Desvenlafaxine 50.”, drugs: {
“Venlafaxine”:{s:[37.5,75,150,225],f:1},“Duloxetine”:{s:[20,30,60,120],f:0.4},“Desvenlafaxine”:{s:[25,50,100],f:0.333},“Milnacipran”:{s:[12.5,25,50,100],f:0.667}
}},
“TCAs”: { ref:“Amitriptyline”, unit:“mg”, note:“Amitriptyline 75 \u2248 Nortriptyline 50 \u2248 Imipramine 75 \u2248 Clomipramine 75.”, drugs: {
“Amitriptyline”:{s:[10,25,50,75,100,150],f:1},“Nortriptyline”:{s:[10,25,50,75],f:0.667},“Imipramine”:{s:[10,25,50,75,100,150],f:1},“Clomipramine”:{s:[10,25,50,75],f:1},“Doxepin”:{s:[10,25,50,75,100,150],f:1},“Desipramine”:{s:[25,50,75,100,150],f:1}
}},
“Benzodiazepines”: { ref:“Diazepam”, unit:“mg”, note:“Ashton Manual: Diazepam 5 \u2248 Lorazepam 1 \u2248 Alprazolam 0.5 \u2248 Clonazepam 0.5 \u2248 Oxazepam 15 \u2248 Chlordiazepoxide 25 \u2248 Temazepam 10.”, drugs: {
“Diazepam”:{s:[2,5,10],f:1},“Lorazepam”:{s:[0.5,1,2,4],f:0.2},“Alprazolam”:{s:[0.25,0.5,1,2],f:0.1},“Clonazepam”:{s:[0.25,0.5,1,2],f:0.1},“Oxazepam”:{s:[10,15,30],f:3},“Chlordiazepoxide”:{s:[5,10,25],f:5},“Temazepam”:{s:[7.5,10,15,20,30],f:2},“Bromazepam”:{s:[1.5,3,6],f:0.6},“Clobazam”:{s:[5,10,20],f:2},“Nitrazepam”:{s:[5,10],f:1}
}},
“Atypical Antidepressants”: { ref:“Mirtazapine”, unit:“mg”, note:“Different mechanisms. Approximate therapeutic equivalence.”, drugs: {
“Mirtazapine”:{s:[7.5,15,30,45],f:1},“Bupropion”:{s:[75,100,150,300],f:10},“Trazodone”:{s:[50,100,150,300],f:10},“Agomelatine”:{s:[25,50],f:1.67},“Vortioxetine”:{s:[5,10,15,20],f:0.667}
}}
}},
“Diabetes”: { classes: {
“Sulfonylureas”: { ref:“Gliclazide”, unit:“mg”, note:“Gliclazide 80 \u2248 Glimepiride 4 \u2248 Glibenclamide 5 \u2248 Glipizide 5.”, drugs: {
“Gliclazide”:{s:[40,60,80,160],f:1},“Gliclazide MR”:{s:[30,60,90,120],f:0.375},“Glimepiride”:{s:[1,2,3,4,6],f:0.05},“Glibenclamide”:{s:[2.5,5],f:0.0625},“Glipizide”:{s:[2.5,5,10],f:0.0625}
}},
“DPP-4 Inhibitors (Gliptins)”: { ref:“Sitagliptin”, unit:“mg”, note:“Sitagliptin 100 \u2248 Vildagliptin 50 BID \u2248 Saxagliptin 5 \u2248 Linagliptin 5 \u2248 Alogliptin 25.”, drugs: {
“Sitagliptin”:{s:[25,50,100],f:1},“Vildagliptin”:{s:[50],f:0.5},“Saxagliptin”:{s:[2.5,5],f:0.05},“Linagliptin”:{s:[5],f:0.05},“Alogliptin”:{s:[6.25,12.5,25],f:0.25}
}},
“SGLT2 Inhibitors”: { ref:“Empagliflozin”, unit:“mg”, note:“Empagliflozin 10 \u2248 Dapagliflozin 10 \u2248 Canagliflozin 100 \u2248 Ertugliflozin 5.”, drugs: {
“Empagliflozin”:{s:[10,25],f:1},“Dapagliflozin”:{s:[5,10],f:1},“Canagliflozin”:{s:[100,300],f:10},“Ertugliflozin”:{s:[5,15],f:0.5}
}},
“Biguanides”: { ref:“Metformin IR”, unit:“mg”, note:“Same molecule, different release profiles.”, drugs: {
“Metformin IR”:{s:[500,750,850,1000],f:1},“Metformin XR”:{s:[500,750,1000],f:1}
}},
“Thiazolidinediones”: { ref:“Pioglitazone”, unit:“mg”, note:“Rosiglitazone restricted in many regions.”, drugs: {
“Pioglitazone”:{s:[15,30,45],f:1},“Rosiglitazone”:{s:[2,4,8],f:0.267}
}}
}},
“GERD / Peptic Ulcer”: { classes: {
“PPIs”: { ref:“Omeprazole”, unit:“mg”, note:“Omeprazole 20 \u2248 Esomeprazole 20 \u2248 Lansoprazole 30 \u2248 Pantoprazole 40 \u2248 Rabeprazole 20.”, drugs: {
“Omeprazole”:{s:[10,20,40],f:1},“Esomeprazole”:{s:[20,40],f:1},“Lansoprazole”:{s:[15,30],f:1.5},“Pantoprazole”:{s:[20,40],f:2},“Rabeprazole”:{s:[10,20],f:1},“Dexlansoprazole”:{s:[30,60],f:1.5}
}},
“H2 Receptor Antagonists”: { ref:“Famotidine”, unit:“mg”, note:“Famotidine 20 \u2248 Cimetidine 400 \u2248 Nizatidine 150. Ranitidine withdrawn (2020).”, drugs: {
“Famotidine”:{s:[10,20,40],f:1},“Cimetidine”:{s:[200,400,800],f:20},“Nizatidine”:{s:[75,150,300],f:7.5}
}}
}},
“Allergy”: { classes: {
“2nd Gen Antihistamines”: { ref:“Cetirizine”, unit:“mg”, note:“Cetirizine 10 \u2248 Loratadine 10 \u2248 Fexofenadine 180 \u2248 Desloratadine 5 \u2248 Levocetirizine 5 \u2248 Bilastine 20.”, drugs: {
“Cetirizine”:{s:[5,10],f:1},“Loratadine”:{s:[10],f:1},“Fexofenadine”:{s:[60,120,180],f:18},“Desloratadine”:{s:[5],f:0.5},“Levocetirizine”:{s:[2.5,5],f:0.5},“Bilastine”:{s:[20],f:2},“Rupatadine”:{s:[10],f:1}
}},
“1st Gen Antihistamines”: { ref:“Diphenhydramine”, unit:“mg”, note:“Diphenhydramine 50 \u2248 Chlorpheniramine 4 \u2248 Hydroxyzine 25 \u2248 Promethazine 25.”, drugs: {
“Diphenhydramine”:{s:[25,50],f:1},“Chlorpheniramine”:{s:[2,4],f:0.08},“Hydroxyzine”:{s:[10,25,50],f:0.5},“Promethazine”:{s:[10,25,50],f:0.5},“Clemastine”:{s:[1,2],f:0.02},“Cyproheptadine”:{s:[4],f:0.08}
}},
“Intranasal Corticosteroids”: { ref:“Fluticasone Propionate”, unit:“mcg/day”, note:“Fluticasone 200 \u2248 Mometasone 200 \u2248 Budesonide 256.”, drugs: {
“Fluticasone Propionate”:{s:[100,200],f:1},“Mometasone Furoate”:{s:[100,200],f:1},“Budesonide”:{s:[64,128,256],f:1.28},“Triamcinolone”:{s:[110,220],f:1.1},“Beclometasone”:{s:[100,200,400],f:1},“Fluticasone Furoate”:{s:[27.5,55,110],f:0.55}
}}
}},
“Psychosis”: { classes: {
“Atypical Antipsychotics”: { ref:“Risperidone”, unit:“mg”, note:“CPZE: Risperidone 2 \u2248 Olanzapine 5 \u2248 Quetiapine 75 \u2248 Aripiprazole 7.5 \u2248 Ziprasidone 60 \u2248 Clozapine 50.”, drugs: {
“Risperidone”:{s:[0.5,1,2,3,4,6],f:1},“Olanzapine”:{s:[2.5,5,10,15,20],f:2.5},“Quetiapine”:{s:[25,50,100,200,300,400,600],f:37.5},“Aripiprazole”:{s:[2,5,10,15,20,30],f:3.75},“Ziprasidone”:{s:[20,40,60,80],f:30},“Clozapine”:{s:[25,50,100,200],f:25},“Paliperidone”:{s:[1.5,3,6,9,12],f:0.75},“Lurasidone”:{s:[20,40,60,80,120],f:20},“Brexpiprazole”:{s:[0.25,0.5,1,2,3,4],f:1},“Cariprazine”:{s:[1.5,3,4.5,6],f:1.5}
}},
“Typical Antipsychotics”: { ref:“Haloperidol”, unit:“mg”, note:“Chlorpromazine 100 \u2248 Haloperidol 2 \u2248 Fluphenazine 2 \u2248 Trifluoperazine 5.”, drugs: {
“Haloperidol”:{s:[0.5,1,2,5,10,20],f:1},“Chlorpromazine”:{s:[25,50,100,200],f:50},“Fluphenazine”:{s:[1,2.5,5,10],f:1},“Trifluoperazine”:{s:[1,2,5,10],f:2.5},“Perphenazine”:{s:[2,4,8,16],f:4},“Zuclopenthixol”:{s:[2,10,25,40],f:10},“Sulpiride”:{s:[50,100,200,400],f:100}
}}
}},
“Corticosteroid Therapy”: { classes: {
“Systemic Glucocorticoids”: { ref:“Prednisolone”, unit:“mg”, note:“Prednisolone 5 \u2248 Prednisone 5 \u2248 Methylprednisolone 4 \u2248 Hydrocortisone 20 \u2248 Dexamethasone 0.75 \u2248 Betamethasone 0.6.”, drugs: {
“Prednisolone”:{s:[1,2.5,5,10,20,25,50],f:1},“Prednisone”:{s:[1,2.5,5,10,20,50],f:1},“Methylprednisolone”:{s:[2,4,8,16,32],f:0.8},“Hydrocortisone”:{s:[5,10,20],f:4},“Cortisone”:{s:[5,25],f:5},“Dexamethasone”:{s:[0.5,0.75,1,1.5,2,4,6,8],f:0.15},“Betamethasone”:{s:[0.5,1,2,4],f:0.12},“Triamcinolone”:{s:[1,2,4,8],f:0.8},“Deflazacort”:{s:[6,30],f:1.2}
}}
}},
“Nausea / Vomiting”: { classes: {
“5-HT3 Antagonists”: { ref:“Ondansetron”, unit:“mg”, note:“Ondansetron 8 \u2248 Granisetron 1 \u2248 Palonosetron 0.25.”, drugs: {
“Ondansetron”:{s:[4,8,16,24],f:1},“Granisetron”:{s:[1,2],f:0.125},“Palonosetron”:{s:[0.25,0.5],f:0.03125},“Dolasetron”:{s:[50,100],f:12.5},“Tropisetron”:{s:[5],f:0.625}
}},
“Dopamine Antagonists”: { ref:“Metoclopramide”, unit:“mg”, note:“Metoclopramide 10 \u2248 Domperidone 10.”, drugs: {
“Metoclopramide”:{s:[5,10],f:1},“Domperidone”:{s:[10,20],f:1},“Prochlorperazine”:{s:[3,5,10,25],f:0.5}
}}
}},
“Urology (BPH)”: { classes: {
“Alpha-1 Blockers”: { ref:“Tamsulosin”, unit:“mg”, note:“Tamsulosin 0.4 \u2248 Alfuzosin 10 \u2248 Doxazosin 4 \u2248 Terazosin 5 \u2248 Silodosin 8.”, drugs: {
“Tamsulosin”:{s:[0.4],f:1},“Alfuzosin”:{s:[2.5,10],f:25},“Doxazosin”:{s:[1,2,4,8],f:10},“Terazosin”:{s:[1,2,5,10],f:12.5},“Silodosin”:{s:[4,8],f:20}
}},
“5-Alpha Reductase Inhibitors”: { ref:“Finasteride”, unit:“mg”, note:“Finasteride 5mg \u2248 Dutasteride 0.5mg.”, drugs: {
“Finasteride”:{s:[1,5],f:1},“Dutasteride”:{s:[0.5],f:0.1}
}}
}},
“Anticoagulation”: { classes: {
“DOACs”: { ref:“Apixaban”, unit:“mg”, note:“NOT mg-equivalent. AF doses: Apixaban 5 BID \u2248 Rivaroxaban 20 OD \u2248 Edoxaban 60 OD \u2248 Dabigatran 150 BID.”, drugs: {
“Apixaban”:{s:[2.5,5],f:1},“Rivaroxaban”:{s:[10,15,20],f:4},“Edoxaban”:{s:[15,30,60],f:12},“Dabigatran”:{s:[75,110,150],f:30}
}}
}},
“Epilepsy”: { classes: {
“Older AEDs”: { ref:“Carbamazepine”, unit:“mg”, note:“Very approximate. CBZ 400 \u2248 OXC 600 \u2248 PHT 200 \u2248 VPA 500.”, drugs: {
“Carbamazepine”:{s:[100,200,400],f:1},“Oxcarbazepine”:{s:[150,300,600],f:1.5},“Phenytoin”:{s:[25,50,100,200,300],f:0.5},“Valproate (VPA)”:{s:[200,250,500,1000],f:1.25},“Phenobarbital”:{s:[15,30,60,100],f:0.25}
}},
“Newer AEDs”: { ref:“Levetiracetam”, unit:“mg”, note:“LEV 1000 \u2248 LTG 100 \u2248 TPM 100 \u2248 LCM 200.”, drugs: {
“Levetiracetam”:{s:[250,500,750,1000],f:1},“Lamotrigine”:{s:[25,50,100,200],f:0.1},“Topiramate”:{s:[25,50,100,200],f:0.1},“Lacosamide”:{s:[50,100,150,200],f:0.2},“Brivaracetam”:{s:[10,25,50,75,100],f:0.05},“Pregabalin”:{s:[25,50,75,100,150,200,300],f:0.15},“Gabapentin”:{s:[100,300,400,600,800],f:0.6}
}}
}},
“Thyroid Disorders”: { classes: {
“Thyroid Replacement”: { ref:“Levothyroxine (T4)”, unit:“mcg”, note:“Levothyroxine 100mcg \u2248 Liothyronine 20mcg.”, drugs: {
“Levothyroxine (T4)”:{s:[25,50,75,88,100,112,125,137,150,175,200],f:1},“Liothyronine (T3)”:{s:[5,10,20,25,50],f:0.2}
}},
“Antithyroid Drugs”: { ref:“Carbimazole”, unit:“mg”, note:“Carbimazole 10 \u2248 Methimazole 10 \u2248 PTU 100.”, drugs: {
“Carbimazole”:{s:[5,10,20],f:1},“Methimazole”:{s:[5,10,20],f:1},“Propylthiouracil”:{s:[50,100],f:10}
}}
}},
“Osteoporosis”: { classes: {
“Bisphosphonates”: { ref:“Alendronate”, unit:“mg”, note:“Weekly: Alendronate 70 \u2248 Risedronate 35. Monthly: Ibandronate 150.”, drugs: {
“Alendronate”:{s:[5,10,35,70],f:1},“Risedronate”:{s:[5,35,150],f:0.5},“Ibandronate”:{s:[2.5,150],f:2.14},“Zoledronic Acid”:{s:[4,5],f:0.0714}
}}
}}
};

// — SEARCH INDEX —
var searchIndex = [];
var diseaseKeys = Object.keys(DB);
diseaseKeys.forEach(function(disease) {
var classes = DB[disease].classes;
Object.keys(classes).forEach(function(cn) {
var cl = classes[cn];
Object.keys(cl.drugs).forEach(function(dn) {
searchIndex.push({
drug: dn, disease: disease, className: cn,
shortClass: cn.replace(/\s*(.*?)\s*/g, ‘’).trim(),
strengths: cl.drugs[dn].s, unit: cl.unit
});
});
});
});

// — STATE —
var state = { disease: null, className: null, drug: null, dose: null };

// — DOM —
var contentEl = document.getElementById(‘content’);
var breadcrumbEl = document.getElementById(‘breadcrumb’);
var searchInput = document.getElementById(‘searchInput’);
var searchResultsEl = document.getElementById(‘searchResults’);
var searchClearBtn = document.getElementById(‘searchClear’);

// — HELPERS —
function smartRound(v) {
if (v >= 100) return Math.round(v);
if (v >= 10) return Math.round(v * 10) / 10;
if (v >= 1) return Math.round(v * 100) / 100;
return Math.round(v * 1000) / 1000;
}

function findNearest(arr, target) {
var best = arr[0], bd = Math.abs(arr[0] - target);
for (var i = 1; i < arr.length; i++) {
var d = Math.abs(arr[i] - target);
if (d < bd) { best = arr[i]; bd = d; }
}
return best;
}

// — EVENT DELEGATION (no inline onclick!) —
document.addEventListener(‘click’, function(e) {
var el = e.target.closest(’[data-action]’);
if (!el) {
if (!e.target.closest(’.search-wrap’)) searchResultsEl.classList.remove(‘active’);
return;
}
var action = el.getAttribute(‘data-action’);
var val = el.getAttribute(‘data-val’);

if (action === ‘disease’) { state = { disease: val, className: null, drug: null, dose: null }; render(); }
else if (action === ‘class’) { state.className = val; state.drug = null; state.dose = null; render(); }
else if (action === ‘drug’) { state.drug = val; state.dose = null; render(); }
else if (action === ‘dose’) { state.dose = parseFloat(val); render(); }
else if (action === ‘home’) { state = { disease: null, className: null, drug: null, dose: null }; render(); }
else if (action === ‘goDisease’) { state.className = null; state.drug = null; state.dose = null; render(); }
else if (action === ‘goClass’) { state.drug = null; state.dose = null; render(); }
else if (action === ‘goDrug’) { state.dose = null; render(); }
else if (action === ‘toggleRef’) { toggleRef(); }
else if (action === ‘search-jump’) {
state = { disease: el.getAttribute(‘data-disease’), className: el.getAttribute(‘data-class’), drug: el.getAttribute(‘data-drug’), dose: null };
searchResultsEl.classList.remove(‘active’);
searchInput.value = ‘’;
searchClearBtn.classList.remove(‘show’);
render();
}
else if (action === ‘clear-search’) {
searchInput.value = ‘’;
searchClearBtn.classList.remove(‘show’);
searchResultsEl.classList.remove(‘active’);
searchInput.focus();
}
});

searchClearBtn.setAttribute(‘data-action’, ‘clear-search’);

// — RENDER —
function render() {
updateBreadcrumb();
if (state.dose !== null) renderResults();
else if (state.drug) renderDoses();
else if (state.className) renderDrugs();
else if (state.disease) renderClasses();
else renderHome();
window.scrollTo({ top: 0, behavior: ‘smooth’ });
}

function renderHome() {
var h = ‘<div class="home-intro fade-in"><h2>Select a Therapeutic Area</h2><p>Find equivalent doses across drugs within the same class</p></div>’;
h += ‘<div class="step-label"><span class="step-num">1</span> Therapeutic Area</div>’;
h += ‘<div class="cards-grid fade-in">’;
diseaseKeys.forEach(function(d) {
var cc = Object.keys(DB[d].classes).length;
var dc = 0;
Object.keys(DB[d].classes).forEach(function(c) { dc += Object.keys(DB[d].classes[c].drugs).length; });
h += ‘<div class="card" data-action="disease" data-val="' + d + '"><div class="card-title">’ + d + ‘</div><div class="card-sub">’ + cc + ’ class’ + (cc > 1 ? ‘es’ : ‘’) + ’ · ’ + dc + ’ drugs</div></div>’;
});
h += ‘</div>’;
h += ‘<div class="footer-refs" style="margin-top:32px"><h4>📚 Reference Sources</h4><ul>’;
h += ‘<li><strong>British National Formulary (BNF 86)</strong> — NICE, UK</li>’;
h += ‘<li><strong>Lexicomp® 2024</strong> — Wolters Kluwer</li>’;
h += ‘<li><strong>Micromedex® Solutions</strong> — Merative</li>’;
h += ‘<li><strong>UpToDate®</strong> — Wolters Kluwer</li>’;
h += ‘<li><strong>GINA 2024</strong> — ICS dose equivalence</li>’;
h += ‘<li><strong>CDC Opioid MME Tables</strong></li>’;
h += ‘<li><strong>Ashton Manual</strong> — Benzodiazepine equivalence</li>’;
h += “<li><strong>Stahl’s Essential Psychopharmacology</strong> — CPZE</li>”;
h += ‘<li><strong>WHO ATC/DDD Index 2024</strong></li>’;
h += ‘<li><strong>Saudi National Formulary (SNF)</strong> — SFDA</li>’;
h += ‘</ul><div class="ref-note">⚠ All dose equivalences are approximate. Individual patient factors may require adjustment. This tool does not replace clinical judgment.</div></div>’;
contentEl.innerHTML = h;
}

function renderClasses() {
var h = ‘<div class="step-label fade-in"><span class="step-num">2</span> Drug Class</div><div class="cards-grid fade-in">’;
Object.keys(DB[state.disease].classes).forEach(function(c) {
var dc = Object.keys(DB[state.disease].classes[c].drugs).length;
var short = c.replace(/\s*(.*?)\s*/g, ’ ’).trim();
h += ‘<div class="card" data-action="class" data-val="' + c + '"><div class="card-title">’ + short + ‘</div><div class="card-sub">’ + dc + ’ drugs · ref: ’ + DB[state.disease].classes[c].ref + ‘</div></div>’;
});
h += ‘</div>’;
contentEl.innerHTML = h;
}

function renderDrugs() {
var cls = DB[state.disease].classes[state.className];
var h = ‘<div class="step-label fade-in"><span class="step-num">3</span> Select Drug</div><div class="cards-grid fade-in">’;
Object.keys(cls.drugs).forEach(function(d) {
var info = cls.drugs[d];
var isRef = (d === cls.ref);
h += ‘<div class="card" data-action="drug" data-val="' + d + '"><div class="card-title">’ + d + (isRef ? ’ <span class="eq-ref">REF</span>’ : ‘’) + ‘</div><div class="card-sub">’ + info.s.map(function(sv) { return sv + ’ ’ + cls.unit; }).join(’, ’) + ‘</div></div>’;
});
h += ‘</div>’;
contentEl.innerHTML = h;
}

function renderDoses() {
var cls = DB[state.disease].classes[state.className];
var drug = cls.drugs[state.drug];
var h = ’<div class="step-label fade-in"><span class="step-num">4</span> Select Dose — ’ + state.drug + ‘</div><div class="dose-options fade-in">’;
drug.s.forEach(function(sv) {
h += ‘<div class="dose-pill" data-action="dose" data-val="' + sv + '">’ + sv + ’ ’ + cls.unit + ‘</div>’;
});
h += ‘</div>’;
contentEl.innerHTML = h;
}

function renderResults() {
var cls = DB[state.disease].classes[state.className];
var selDrug = cls.drugs[state.drug];
var refDose = state.dose / selDrug.f;

var h = ‘<div class="results-section"><div class="result-header"><h3>’ + state.drug + ’ ’ + state.dose + ’ ’ + cls.unit + ‘</h3><div class="result-header-sub">’ + state.className + ’ · ’ + state.disease + ‘</div></div>’;
h += ‘<div class="eq-table">’;
Object.keys(cls.drugs).forEach(function(name) {
var info = cls.drugs[name];
var eq = refDose * info.f;
var d = smartRound(eq);
var n = findNearest(info.s, eq);
var isSel = (name === state.drug);
var isRef = (name === cls.ref);
h += ‘<div class="eq-row' + (isSel ? ' is-sel' : '') + '"><div><span class="eq-drug">’ + name + ‘</span>’ + (isRef ? ‘<span class="eq-ref">REF</span>’ : ‘’) + (n !== d ? ’<div class="eq-nearest">Nearest: ’ + n + ’ ’ + cls.unit + ‘</div>’ : ‘’) + ‘</div><div class="eq-dose">’ + d + ’ ’ + cls.unit + ‘</div></div>’;
});
h += ‘</div>’;
if (cls.note) h += ’<div class="note-box">\u2139\uFE0F ’ + cls.note + ‘</div>’;
h += ‘<div class="disclaimer"><strong>\u26A0 Disclaimer:</strong> Approximate equivalence only. Always verify with BNF, Lexicomp, or Micromedex.</div>’;
h += ‘<div class="ref-toggle" data-action="toggleRef" id="refToggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>Show Reference Sources</div>’;
h += ‘<div class="ref-box" id="refBox"><strong>Sources:</strong><br>• BNF 86 • Lexicomp® 2024 • Micromedex® • UpToDate®<br>• GINA 2024 • CDC MME • Ashton Manual • WHO ATC/DDD<br><br><em>Always exercise clinical judgment.</em></div>’;
h += ‘</div>’;
contentEl.innerHTML = h;
}

// — BREADCRUMB —
function updateBreadcrumb() {
var h = ‘<span class="bc-item" data-action="home">Home</span>’;
if (state.disease) {
h += ‘<span class="bc-sep">›</span>’;
if (state.className) h += ‘<span class="bc-item" data-action="goDisease">’ + state.disease + ‘</span>’;
else h += ‘<span class="bc-cur">’ + state.disease + ‘</span>’;
}
if (state.className) {
var short = state.className.replace(/\s*(.*?)\s*/g, ’ ’).trim();
h += ‘<span class="bc-sep">›</span>’;
if (state.drug) h += ‘<span class="bc-item" data-action="goClass">’ + short + ‘</span>’;
else h += ‘<span class="bc-cur">’ + short + ‘</span>’;
}
if (state.drug) {
h += ‘<span class="bc-sep">›</span>’;
if (state.dose !== null) {
h += ‘<span class="bc-item" data-action="goDrug">’ + state.drug + ‘</span>’;
h += ‘<span class="bc-sep">›</span><span class="bc-cur">’ + state.dose + ’ ’ + DB[state.disease].classes[state.className].unit + ‘</span>’;
} else {
h += ‘<span class="bc-cur">’ + state.drug + ‘</span>’;
}
}
breadcrumbEl.innerHTML = h;
}

// — TOGGLE REF —
function toggleRef() {
var t = document.getElementById(‘refToggle’);
var b = document.getElementById(‘refBox’);
if (!t || !b) return;
t.classList.toggle(‘open’);
b.classList.toggle(‘vis’);
var isOpen = t.classList.contains(‘open’);
t.innerHTML = ‘<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>’ + (isOpen ? ‘Hide’ : ‘Show’) + ’ Reference Sources’;
}

// — SEARCH —
var shl = -1;
searchInput.addEventListener(‘input’, function() {
var q = this.value.trim().toLowerCase();
searchClearBtn.classList.toggle(‘show’, q.length > 0);
shl = -1;
if (q.length < 2) { searchResultsEl.classList.remove(‘active’); return; }
var matches = searchIndex.filter(function(it) { return it.drug.toLowerCase().indexOf(q) !== -1; }).slice(0, 10);
if (!matches.length) { searchResultsEl.classList.remove(‘active’); return; }
var h = ‘’;
matches.forEach(function(m) {
var hl = m.drug;
var idx = hl.toLowerCase().indexOf(q);
if (idx !== -1) hl = hl.slice(0, idx) + ‘<strong style="color:var(--accent)">’ + hl.slice(idx, idx + q.length) + ‘</strong>’ + hl.slice(idx + q.length);
h += ‘<div class="sr-item" data-action="search-jump" data-disease="' + m.disease + '" data-class="' + m.className + '" data-drug="' + m.drug + '">’;
h += ‘<div class="sr-drug">’ + hl + ‘</div>’;
h += ‘<div class="sr-meta">’ + m.disease + ’ → ’ + m.shortClass + ‘</div>’;
h += ‘<div class="sr-str">’ + m.strengths.map(function(sv) { return sv + ’ ’ + m.unit; }).join(’ · ’) + ‘</div></div>’;
});
searchResultsEl.innerHTML = h;
searchResultsEl.classList.add(‘active’);
});

searchInput.addEventListener(‘keydown’, function(e) {
var items = searchResultsEl.querySelectorAll(’.sr-item’);
if (!items.length) return;
if (e.key === ‘ArrowDown’) { e.preventDefault(); shl = Math.min(shl + 1, items.length - 1); }
else if (e.key === ‘ArrowUp’) { e.preventDefault(); shl = Math.max(shl - 1, 0); }
else if (e.key === ‘Enter’ && shl >= 0) { e.preventDefault(); items[shl].click(); return; }
else if (e.key === ‘Escape’) { searchResultsEl.classList.remove(‘active’); searchInput.blur(); return; }
for (var i = 0; i < items.length; i++) {
items[i].classList.toggle(‘hl’, i === shl);
}
});

// — INIT —
render();
